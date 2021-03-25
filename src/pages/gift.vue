<template>
  <div>
	  <div>
		<!-- 头部 -->
			<div class="giftCenterHead clearfix">
				<!-- <a href="javascript:history.go(-1);" class="backArrow fl"></a> -->
			</div>
			<!-- 内容 -->
			<div class="allGameListbox">
				<div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
					<div class="gameList clearfix" :key="index" v-for="(item,index) in lists">
						<div class="left fl clearfix" @click="linkGift(item.gid)">
							<div class="img fl"><img :src="item.logo | handleUrl"></div>
							<div class="headline fl">
								<div class="subtitle"><span class="t">{{item.name}}</span></div>
								<p class="des oneTextOmit">剩余数量：{{item.restcount}}</p>
							</div>
						</div>
						<div class="right fr" @click="linkGift(item.gid)">领取礼包</div>
						<!-- <router-link :to="{path:'getgift'}" class="right fr">领取礼包</router-link> -->
					</div>	
					<loadmore :isLoading="busy"  v-if="lists.length>0"></loadmore> 
				</div>	
			</div>
			<Nav></Nav>
		</div>
  </div>
</template>

<script>
import {getgiftListapi,getuserInfoapi} from '../backend/api'
import loadmore from '../components/loadmore'
import Nav from '../components/nav'
import { ylTrim, ylSetStore, ylGetStore } from "../tool/tools"

export default {
	data(){
		return{
			giftList:[],
			lists:[],
            busy: false,
            limit:10,
			curPage:1,
			pages: []
		}
	},
	methods:{
		loadMore(){
			let self = this
			//  self.busy = true;
            self.curPage = parseInt(self.lists.length/self.limit) + 1;
			let params = {page:self.curPage};

			if (this.pages.indexOf(self.curPage) !== -1)
				return;
			else 
				this.pages.push(self.curPage)


			getgiftListapi(params).then(res=>{
				this.$loading('加载中...', 'close');   
				self.giftList=res.mes;					
				if(self.giftList instanceof Array && self.giftList.length > 0){
					self.giftList.forEach(function(val,index){
						self.lists.push(val);
					});
					self.busy = false;
				}
				if(self.giftList.length <10) {
					self.busy = true;
					self.loadingMsg = '没有更多数据了';
				}     
			}).catch(err =>{             
				console.log( err )
				this.$loading('加载中...', 'close');   
				self.busy=false;
			})
		},
		linkGift(gid){
			if (!window.username) {
				this.$router.push({ path: "/login" });
				this.$toast.center('请先登录~');
			}else{
				this.$router.push({name: 'getgift',query:{gid:gid}});
			}
			
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
				}
			}).catch(err=>{
				console.log(err)
			})
		}
	},
	components:{
		Nav,
		'loadmore': loadmore
	},
	watch:{
		
	},
	created() {
		 this.$loading('加载中...', 'open');
		 this._isLogin(_=>{

   		 })	
		// this.loadMore();
	},
	filters:{
      handleUrl: function(value) {
            if(value == ''|| value == null){
                return value
            }else{
                return urlConfig.img + value;
            }   
        }
  },
  mounted() { 
   
  }
}
</script>

