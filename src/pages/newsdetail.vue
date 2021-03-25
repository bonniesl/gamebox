<template>
  <div>
    <!-- 头部 -->
		<div class="gameListhead clearfix">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerlogo fl"></div>
		</div>
		<div class="newsDetailwrap">
			<div class="ntitle">{{activityDetail.title}}</div>
			<p class="newTime">活动时间:{{activityDetail.start_time}}-{{activityDetail.end_time}}</p>
			<div class="newContent">	
				<p class="dun" v-html=activityDetail.content>
					
				</p>
			</div>
		</div>
  </div>
</template>

<script>
import {getactivityDetailapi} from '../backend/api'
export default {
	data(){
    return{
        activityDetail:[],
				page:'',
				activityId:''
    }
	},
	 methods:{
		 getactivityDetail(){
			 var self = this;
			 let params = {id: this.$route.query.id};
			 getactivityDetailapi(params).then(res=>{
				   this.activityDetail=res.mes.activityInfo;
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
