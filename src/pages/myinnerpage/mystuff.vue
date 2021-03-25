<template>
  <div>
    <div class="gameListhead clearfix non-border">
			<a href="javascript:history.go(-1);" class="backArrow fl"></a>
			<div class="innerTitle fl">我的资料</div>
		</div>
		<div class="myInformationWrap">
			<div>
					<a class="a-upload">
						<input v-if='userDevice==="android"' id='file' type="file" accept="image/*" capture="camera"  @change="readAsDataURL()">
						<input v-else-if='userDevice==="ios"' id='file' type="file" accept="image/*;"  @change="readAsDataURL()"> 
						<input v-else-if='userDevice==="other"' id='file' type="file" accept="image/*;"  @change="readAsDataURL()">  
					</a>
					<div class="myIcon"><img :src="userInfo.avatar || advanter" /></div>
					<p class="myEditHead">点击可更改头像</p>
			</div>	
		</div>

		<div class="editNameWrap">
			<div class="userName"><span>账号</span><span>{{userInfo.login_name}}</span></div>
		</div>
		<div class="editNameWrap">
			<div class="userName">
				<span>真实姓名</span>
				<span v-if="uname==''"><input type="text" placeholder="真实姓名" v-model.trim="name" /></span>
				<span v-else>{{uname}}</span>
			</div>
		</div>
		<div class="editNameWrap">
			<div class="userName">
				<span>身份证号</span>
				<span v-if="ucard==''"><input type="text" placeholder="身份证号" v-model.trim="card" /></span>
				<span v-else>{{ucard | hideMiddle}}</span>
			</div>
		</div>
		<div class="submitBtn" @click="getsaveUser()"  v-if="uname=='' || ucard==''">确认提交</div>
  </div>
</template>

<script>
import {getuserInfoapi,getsaveFaceapi,getsaveUserapi} from '../../backend/api'
import {APIHOST} from '../../backend/endpoint'
import { ylTrim, ylSetStore, ylGetStore,getUserAgentDevice} from "../../tool/tools.js"
export default {
		data(){
			return{
				  userInfo:[],  
				  uname:'',
				  ucard:'',
				  name:'',
				  card:'',
				  userDevice: '',
				  advanter:''
			}
		},
		methods:{
				getuserInfo(){
					let self = this;
					let params={};
					getuserInfoapi(params).then(res=>{		
						if(res.code==1){
							self.userInfo=res.mes;
							self.name=self.userInfo.name;
							self.card=self.userInfo.card
							self.uname=self.userInfo.name;
							self.ucard=self.userInfo.card;
						}
					}).catch(err =>{             
						console.log(err)
					}) 	
				},
				getsaveUser(){
					let params={name:this.name,card:this.card};
					getsaveUserapi(params).then(res=>{	
						if(res.code==1){
							 this.$toast.center(res.mes);
							 this.$router.push({path: '/mypage'});   
						}else{
							this.$toast.center(res.mes);
						}
					}).catch(err =>{             
						console.log(err)
					}) 	
				},
				readAsDataURL(){
					var file = document.getElementById("file").files;
					var self = this
					var fd = new FormData()
					for(var i = 0; i< file.length; i ++) {
						var reader = new FileReader();    
						reader.readAsDataURL(file[i]);  
						reader.onload=function(e){  
							// fd.append('img', file[i], 'image.png')
							// self._submit(fd)
							self._compressImg(this.result, 400, function(data){//压缩完成后执行的callback
								var blob = self._dataURItoBlob(data)

								fd.append('img', blob, 'image.png')
								self.userInfo.avatar = data
								//console.log(self.userInfo.avatar)
								self._submit(fd)
							});
						}
					}
				},
				_submit(fd) {
					var self = this
					
					// getuserInfoapi({}).then(res=>{
					// 	if(res.code==1){
					// 		 res.mes.avatar=fd;
					// 	}
					// }).catch(err =>{             
					// 	console.log(err)
					// }) 


					var xhr = new XMLHttpRequest();
					xhr.open('POST', APIHOST + '/index/user/saveFace', true);
					console.log(xhr)
					xhr.withCredentials = true;
					xhr.onreadystatechange=function(res){
						if(xhr.readyState==4&&xhr.status==200){
							
							var res = JSON.parse(xhr.responseText)
							if (res.code == 1) {
								 self.userInfo.avatar=res.mes
								 self.$toast.center('上传成功')
							} else {
								
								self.$toast.center(res.mes)
							}
						}
						self.avatarShow = false
					};
					xhr.send(fd);
				},
				_compressImg(imgData,maxHeight,onCompress){
					if(!imgData)return;
					onCompress = onCompress || function(){};

					maxHeight = maxHeight || 200;//默认最大高度200px

					var canvas = document.createElement("canvas");

					var img = new Image();
					img.onload = function(){ 
						if(img.height > maxHeight) {//按最大高度等比缩放
							img.width *= maxHeight / img.height; 
							img.height = maxHeight; 
						}
						var ctx = canvas.getContext("2d"); 
						ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏 	
						//重置canvans宽高
						canvas.width = img.width;
						canvas.height = img.height;	
						ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 

						onCompress(canvas.toDataURL("image/png"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
					};
					// 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
					img.src = imgData;
				},
				_dataURItoBlob(dataurl) {
					var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
					while(n--){
						u8arr[n] = bstr.charCodeAt(n);
					}
					return new Blob([u8arr], {type:mime});
				}
		},
		created() {
			this.getuserInfo();
			this.advanter=urlConfig.static + '/hwiphone/dist/static/images/avatar.png'
			this.userDevice = getUserAgentDevice()
			
		},
		filters:{
			handleUrl: function(value) {
					if(value == ''|| value == null){
						return value
					}else{
						return urlConfig.img + value;
					}   
				},
				 hideMiddle(val) {
                    return `${val.substring(0,3)}****${val.substring(val.length-4)}`
                }
		}
}
</script>

