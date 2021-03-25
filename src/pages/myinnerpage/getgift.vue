<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">领取礼包</div>
		</div>

		<div class="getGiftGameName clearfix">
			<div class="leftimg fl"><img :src="logo | handleUrl" alt="" /></div>
			<div class="rightWord fl">
				<h4>{{name}}</h4>
				<p>共有{{total_number}}款礼包</p>
			</div>
		</div>

		<a class="bg_submitBtn" @click="detailLink">游戏详情</a>
		<receivedialog></receivedialog>
  </div>
</template>

<script>

import {getGiftDetailapi,getgiftapi,getuserInfoapi} from '../../backend/api'
import loadmore from '../../components/loadmore'
import receivedialog from '../../components/receivedialog'
import {ylTrim, ylSetStore, ylGetStore} from '../../tool/tools.js'
import {Toast} from '../../tool/toast.js'

export default {
  data(){
    return{
		 giftDetailList:[],
		 logo:'',
		 name:'',
		 total_number:'',
		 website:'',
		 gfid:''
    }
  },
  methods:{
	  	getGiftDetail(){
			  let self = this;
			  let params = {gid: this.$route.query.gid};
			  getGiftDetailapi(params).then(res=>{
				  if(res.code == 1) {	
					  self.giftDetailList=res.mes;
					  self.name=self.giftDetailList[0].gname;
					  self.logo=self.giftDetailList[0].logo;
					  self.website=self.giftDetailList[0].website; 
					  self.total_number=self.giftDetailList[0].total_number
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
		detailLink(){
			this.$router.push({name: 'gameDetail',query:{gid:this.$route.query.gid}});
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
	components:{
		receivedialog
	},
	created() {
		this._isLogin();
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

