<template>
  <div>
      <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">充值记录</div>
		</div>

		<div class="null_page" v-if="lists.length==0">
			<img :src="nullImg" />
			<p>暂无充值记录~</p>
		</div>
		<div class="allGameListbox" style="padding:0 0 0.36rem;margin:0;">
			 <div  v-infinite-scroll="getrecharge" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
				<div class="gameList clearfix" style="padding:0.14rem 0.26rem 0;" :key="index" v-for="(item,index) in lists">
					<div class="left fl clearfix">
						<div class="img fl"><img :src="picImg"></div>
						<div class="headline fl">
							<div class="subtitle" style="margin-bottom:0"><span class="gift_t">{{item.gname}}</span></div>
							<p class="time">充值时间：{{item.pay_time}}</p>
							<div class="giftMa">充值类型：{{item.paytype}}</div>
						</div>
					</div>
					<div class="price fr">{{item.amount}}元</div>
				</div>
				<loadmore :isLoading="busy"  v-if="lists.length>0"></loadmore> 
			 </div>
		</div>
  </div>
</template>

<script>
import {getrechargeapi} from '../../backend/api'
import loadmore from '../../components/loadmore'
export default {
	 data(){
		return{
			rechargeList:[],
			lists:[],
			busy: false,
			limit:6,
			curPage:1,
			picImg:'',
			nullImg:''
		}
	},
	components:{
		'loadmore': loadmore
	},
	methods:{
		getrecharge(){
			let self = this
            self.busy = true;
            self.curPage = parseInt(self.lists.length/self.limit) + 1;
			let params = {page:this.curPage};
			getrechargeapi(params).then(res=>{
				self.rechargeList=res.mes;
				if(self.rechargeList instanceof Array && self.rechargeList.length > 0){
					self.rechargeList.forEach(function(val,index){
						self.lists.push(val);
					});
					self.busy = false;
				}
				if(self.rechargeList.length <6) {
					self.busy = true;
					self.loadingMsg = '没有更多数据了';
				} 
			}).catch(err =>{             
				console.log(err)
			}) 
		}
	},
	created() {
		
		this.picImg=urlConfig.static + '/hwiphone/dist/static/images/img06.jpg'
		this.nullImg=urlConfig.static + '/hwiphone/dist/static/images/null.png'
	}
}
</script>

