<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerlogo fl"></div>
		</div>
		<div class="newsDetailwrap">
			<div class="ntitle">{{guideDetail.title}}</div>
			<p class="newTime">活动时间:{{guideDetail.create_time}}</p>
			<div class="newContent">	
				<p class="dun" v-html=guideDetail.content>
					
				</p>
			</div>
		</div>
  </div>
</template>

<script>
import {getgameGuideDetailapi} from '../backend/api'
export default {
	data(){
    return{
        guideDetail:[]		
    }
	},
	 methods:{
		 getactivityDetail(){
			 var self = this;
			 let params = {id: this.$route.query.id};
			 getgameGuideDetailapi(params).then(res=>{
				   this.guideDetail=res.mes;
			 }).catch(err =>{             
            console.log(err)
       })	
		 }
	},
	created() {
		this.getactivityDetail();
  }
}
</script>
