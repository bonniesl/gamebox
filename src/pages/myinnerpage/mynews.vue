<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">我的消息盒子</div>
		</div>
		<div class="null_page" v-if="lists.length==0">
			<img :src="nullImg" />
			<p>暂无消息记录~</p>
		</div>
		 <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
			<div :key="index" v-for="(item,index) in lists" @click="slideCon(item,index)">
				<div class="activityLine clearfix">
					<div class="left fl">[系统] {{item.content}}</div>
					<div class="rightTime fr"> {{item.create_time}}</div>
				</div>
				<div class="aivitynewscon" v-show="item.newscShow">
					<p v-html=item.content></p>
				</div>
			</div>
			<loadmore :isLoading="busy"  v-if="lists.length>0"></loadmore> 
		</div>
		
  </div>
</template>

<script>
import {getmessageapi,getuserInfoapi} from '../../backend/api'
import loadmore from '../../components/loadmore'
import {ylTrim, ylSetStore, ylGetStore} from '../../tool/tools.js'
import {Toast} from '../../tool/toast.js'

export default {
	data(){
		return{
			messageList:[],
			lists:[],
			busy: false,
			limit:10,
			curPage:1,
			newsCur:'',
			nullImg:''
		}
	},
	methods:{
		loadMore(){
			let self = this
			  self.busy = true; 
         	 self.curPage = parseInt(self.lists.length/self.limit)+1;
			let params = {page:self.curPage};
			 getmessageapi(params).then(res=>{
				 this.$loading('加载中...', 'close'); 
              if(res.code == 1) {
				 self.messageList=res.mes;
				 if(self.messageList instanceof Array && self.messageList.length > 0){
                      self.messageList.forEach(function(val,index){ 
						  self.$set(val,'newscShow',false);
						  self.lists.push(val); 
						  
                      });
					  self.busy = false;
				  }
				  
                  if(self.messageList.length < 10) {
                      self.busy = true;
                      self.loadingMsg = '没有更多数据了';
                  }                  
              }
          }).catch(err =>{             
              console.log( err )
			  self.busy=false;
			   this.$loading('加载中...', 'close'); 
          })
		},
		slideCon(item,index){
			this.newsCur=index;
			if(this.newsCur==index){
				item.newscShow=!item.newscShow; 
				if(item.newscShow){
					$(".aivitynewscon").css({"height":"auto"});
				}else{
					$(".aivitynewscon").css({"height":"0"});
				}
				
				
			}
			// this.$refs.activc
		},
		_isLogin(cb) {
			var self = this
			getuserInfoapi({}).then(res=>{
				if (res.code == 1) {
					if(typeof cb!='undefined'){
						window.uid = res.mes.uid   
						window.username=res.mes.login_name
						cb();                     
					}
				} 
			}).catch(err=>{
				console.log(err)
			})
		}
		
	},
	watch:{
		
	},
	components: {	
			'loadmore': loadmore
	},
	created(){
		this.nullImg=urlConfig.static + '/hwiphone/dist/static/images/null.png'
		this.$loading('加载中...', 'open'); 
		// this.loadMore();
		
	}
}
</script>
