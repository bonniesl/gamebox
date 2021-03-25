<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">新闻公告</div>
		</div>
    <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <a @click="linkNewsD(itematc.id)" class="activityLine clearfix" :key = "index" v-for="(itematc,index) in lists" >
        <div class="left fl ">{{itematc.title}}</div>
        <div class="rightTime fr">{{itematc.creat_time}}</div>
      </a>
      <loadmore :isLoading="busy"></loadmore> 
    </div>
  </div>
</template>

<script>
import {getnewsIndexapi} from '../backend/api'
import loadmore from '../components/loadmore'
import {Toast} from '../tool/toast.js'
export default {
  data(){
    return{
        newsList:[],
        
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
          getnewsIndexapi(params).then(res=>{
              if(res.code == 1) {
                self.newsList=res.mes;
				    if(self.newsList instanceof Array && self.newsList.length > 0){
                      self.newsList.forEach(function(val,index){
                          self.lists.push(val);
                    });
                    self.busy = false;
                  }
                  if(self.newsList.length < 10) {
                      self.busy = true;
                      self.loadingMsg = '没有更多数据了';
                  }                  
              }
          }).catch(err =>{             
              console.log( err )
              self.busy=false;
          })    
    },
    linkNewsD(id){
       this.$router.push({name: 'newsIndexDetail',query:{id:id}});
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


