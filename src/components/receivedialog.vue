<template>
    <div>
        <div class="getGiftBox clearfix" :key="index" v-for="(item,index) in giftDetailList">
			<div class="giftBoxLeft fl">
				<div class="giftname">{{item.name}}</div>
				<div class="giftInner">礼包内容：<span>{{item.content}}</span></div>
				<div class="giftInner oneTextOmit">使用方法：{{item.receive_way}}</div>
			</div>
			<div class="giftBoxRight fr" :class="[item.carCount==0 ? 'btndisab' : '']"   @click="getgift(item)">领取</div>
		</div>

		<!--领取弹窗-->
		<div class="receive_dialog">
			<div class="common_shade" v-show="receiveDialog"></div>
			<div class="receive_con fadeout" v-show="receiveDialog">
				<div class="top">
					<h2>领取成功</h2>
					<div class="close" @click="close"></div>
				</div>
				<div class="c">
					<div class="serize_txt">序列号：<input type="text" v-model="cardNum" value="knkfnelkjflew" class="serize_inp" readonly="readonly" /></div>
					<p>使用方法：游戏内兑换领取</p>
				</div>
				<div class="closeb" @click="close">关 闭</div>
			</div>
		</div>
    </div>
</template>
<script>

import {getGiftDetailapi,getgiftapi,getuserInfoapi} from '../backend/api'
import loadmore from '../components/loadmore'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'

export default {
  data(){
    return{
		 giftDetailList:[],
		 logo:'',
		 name:'',
		 total_number:'',
		 gfid:'',
		 receiveDialog:false,
		 receiveCard:[],
		 cardNum:'',
		 carCount:'',
		 serviceSelAll:[]
    }
  },
  methods:{
	  	getGiftDetail(){
			  
			  let self = this;
			  let params = {gid: self.gid};
			  getGiftDetailapi(params).then(res=>{
				  if(res.code == 1) {	
					  self.giftDetailList=res.mes;
					  self.name=self.giftDetailList[0].gname;
					  self.logo=self.giftDetailList[0].logo;
					  self.total_number=self.giftDetailList[0].total_number;  
					  self.giftDetailList.forEach(function(v,k){
						  for (var i in v.card_count) {
							 	v.carCount=v.card_count[i];	 
						  }
					  })	  
				  }
			  }).catch(err =>{   
				  console.log(err)
			  })
		},
		getgift(item){
			let self = this;
			let uInfo = ylGetStore('uInfo');
			let gfids = item.gfid.join(',');
			let params = {gfid: gfids};
			getgiftapi(params).then(res=>{
				if(res.code==1){
					self.receiveCard=res.mes;
					self.cardNum=self.receiveCard.card;
				}
			}).catch(err =>{ 
				console.log(err)
			})  
			if(item.type==1){
				if(item.carCount<=0){
					self.receiveDialog=false;
					$(".receive_con").removeClass("fadeInUp");
					self.$toast.center('礼包已领取完~');
				}else{
					self.receiveDialog=true;
					$(".receive_con").addClass("fadeInUp");
				}		
			}else{
				
				self.giftDetailList.forEach(function(v) {
					var serviceAll={text:'',value:''}; 
					for(var i in v.server_name){
						serviceAll.text=v.server_name[i];
						serviceAll.value=i;
					}
					self.serviceSelAll.push(serviceAll);
					
				})
				var picker = new Picker({
						data: [self.serviceSelAll],
						selectedIndex: [0],
						title: '专服列表'
				});

				picker.on('picker.select', function (selectedVal, selectedIndex) {
					self.receiveDialog=true;
					$(".receive_con").addClass("fadeInUp");
				});
				picker.show();
			}
		},
		close(){
			this.receiveDialog=false;
			$(".receive_con").removeClass("fadeInUp");
		},
		_isLogin(cb) {
			var self = this
			getuserInfoapi({}).then(res=>{
				if (res.code == 1) {
					if(typeof cb!='undefined'){
						window.uid = res.mes   
						window.username=res.mes.login_name
						cb();                     
					}
				}else{
					this.$router.replace({ path: "/login" });
					this.$toast.center('请先登录~');
				}
			}).catch(err=>{
				console.log(err)
			})
		}
	},
	created() {
			this._isLogin();
			 this.gid=this.$route.query.gid;
		this.getGiftDetail();
	},
	filters:{
		handleUrl: function(value) {
				if(value == ''|| value == null){
					return value
				}else{
					return urlConfig.img + value;
				}   
			}
	}
}
</script>


