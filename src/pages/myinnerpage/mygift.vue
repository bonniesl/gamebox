<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">我的礼包</div>
		</div>
		<div class="null_page" v-if="lists.length==0">
			<img :src="nullImg" />
			<p>暂无礼包记录~</p>
		</div>
		<div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
			<div class="allGameListbox">
				<div class="gameList clearfix" :key="index" v-for="(item,index) in lists">
					<div class="left fl clearfix">
						<div class="img fl"><img :src="item.logo | handleUrl"></div>
						<div class="headline fl">
							<div class="subtitle" style="margin-bottom:0;"><span class="gift_t">{{item.giftName}}</span></div>
							<p class="time">领取时间：{{item.used_time || item.create_time}}</p>
							<div class="giftMa">礼包码：<span class="col">{{item.cardno}}</span></div>
						</div>
					</div>
					<div class="copy_btn right fr" :data-clipboard-text="item.cardno" @click="copy(item)">复制</div>
				</div>
				<loadmore :isLoading="busy" v-if="lists.length>0"></loadmore> 
				<!-- <div class="Alltips">保留近期30天内领取礼包记录哦~</div> -->
			</div>
	</div>
  </div>
</template>

<script>

import {getgiftRecordapi,getuserInfoapi} from '../../backend/api'
import loadmore from '../../components/loadmore'
import {ylTrim, ylSetStore, ylGetStore} from '../../tool/tools.js'
import {Toast} from '../../tool/toast.js'

export default {
  data(){
    return{
		 giftRecordList:[],
		 lists:[],
		 busy: false,
		 limit:10,
		 curPage:1,
		 uid:'',
		 nullImg:'' 
    }
  },
  methods:{
	 loadMore(){
		let self = this;
		self.busy = true;
		self.curPage = parseInt(self.lists.length/self.limit) + 1;
		let params = {page:this.curPage,uid:this.uid};
		getgiftRecordapi(params).then(res=>{
			this.$loading('加载中...', 'close'); 
				if(res.code == 1) {
					self.giftRecordList=res.mes;   
					if(self.giftRecordList instanceof Array && self.giftRecordList.length > 0){
                        self.giftRecordList.forEach(function(val,index){
                            self.lists.push(val);
                        });
                        self.busy = false;
                    }
                    if(self.giftRecordList.length <10) {
                        self.busy = true;
                        self.loadingMsg = '没有更多数据了';
                    }               
				}
		}).catch(err =>{             
				console.log(err)
				this.$loading('加载中...', 'close'); 
			
		})
	 },
	 copy(item){
		 let clipboard = new Clipboard('.copy_btn')
		 this.$toast.center('复制成功');
	 },
	 _isLogin(cb) {
            var self = this
            getuserInfoapi({}).then(res=>{
				
                if (res.code == 1) {
                    if(typeof cb!='undefined'){
						this.uid = res.mes.uid   
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
		'loadmore': loadmore
	},
	watch:{
		'uid':function(val){
			this.uid=val; 
		}
	},
	created() {
		this.uid=this.$route.query.uid
		this.nullImg=urlConfig.static + '/hwiphone/dist/static/images/null.png'
		this.$loading('加载中...', 'open'); 
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

