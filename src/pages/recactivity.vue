<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">活动推荐</div>
		</div>
    <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <a @click="linkNewsD(itematc.url,itematc.id)" class="activityLine clearfix" :key = "index" v-for="(itematc,index) in lists" >
        <div class="left fl ">{{itematc.title}}</div>
        <div class="rightTime fr">{{itematc.start_time}}</div>
      </a>
      <loadmore :isLoading="busy"></loadmore> 
    </div>
  

		<!-- <div class="Alltips">保留近期30天内消息记录哦~</div> -->
  </div>
</template>

<script>
import {getactivityapi} from '../backend/api'
import loadmore from '../components/loadmore'
import {validValue} from '../tool/lite-validator.js'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'
export default {
  data(){
    return{
        activityList:[],
        activityId:'',
        lists:[],
        busy: false,
        limit:10,
        curPage:1
    }
  },
  methods:{
    loadMore(){
          let self = this
          self.busy=true
          self.curPage = parseInt(self.lists.length/self.limit)+1;
			    let params = {page:this.curPage};
          getactivityapi(params).then(res=>{
              if(res.code == 1) {
                self.activityList=res.mes;
				      	if(self.activityList instanceof Array && self.activityList.length > 0){
                      self.activityList.forEach(function(val,index){
                          self.lists.push(val);
                      });
                      self.busy = false;
                  }
                  if(self.activityList.length < 10) {
                      self.busy = true;
                      self.loadingMsg = '没有更多数据了';
                  }                  
              }
          }).catch(err =>{             
              console.log( err )
              self.busy=false;
          })    
    },
    linkNewsD(url,id){
        if(url){
           $(".activityLine").attr('href',url);
        }else{
           this.$router.push({name: 'newsdetail',query:{id:id}});
        } 
    }
  },
  components: {	
			'loadmore': loadmore
	},
  created() {
   // this.loadMore();
  },
}
</script>


