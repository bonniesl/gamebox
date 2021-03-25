<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerlogo fl"></div>
		</div>
		<div class="newsDetailwrap">
			<div class="ntitle">{{newsDetail.title}}</div>
			<p class="newTime">活动时间:{{newsDetail.creat_time}}</p>
			<div class="newContent">	
				<p class="dun" v-html=newsDetail.content>
	
				</p>
			</div>
		</div>
  </div>
</template>

<script>
import {getnewsIndexDetailapi} from '../backend/api'
export default {
	data(){
    return{
        newsDetail:[]
    }
	},
	 methods:{
		 getnewsIndexDetail(){
			 var self = this;
			 let params = {id: this.$route.query.id};
			 getnewsIndexDetailapi(params).then(res=>{
                   this.newsDetail=res.mes;
			 }).catch(err =>{             
                console.log(err)
            })	
		 }
	},
	created() {
		this.getnewsIndexDetail();
  }
}
</script>
