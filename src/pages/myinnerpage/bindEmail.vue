<template>
   <div class="hwpone_uccn">
	<!-- 头部 -->
		<div class="gameListhead clearfix">
			<a onclick="history.back()" class="backArrow fl"></a>
			<div class="innerTitle fl">邮箱绑定</div>
		</div>

		<div class="main bindphone">
			<form action="">
				<div class="form_group">
					<input type="vate_code text" v-model.trim="email" name="eamil" placeholder="请输入邮箱">
				</div>

				<div class="form_group">
					<input class="vate_code" v-model.trim="emailcode"  type="text"  name="capth" placeholder="请输入邮件内的验证码">
					<button type="button" class="code_capat valadite_btn" :disabled="counting" @click.stop="sendValidateCode">{{btntxt}}</button>
				</div>
				<!-- <div class="form_group">
					<input class="text" type="password" name="capth" placeholder="请输入账号密码">
				</div> -->
				<div class="form_group">
					<input class="sub_btn" type="button" value="提 交" @click.stop="emailBind" />
				</div>
				
			</form>
			

		</div>
</div>
</template>

<script>
import {emailBindapi,sendValidateCodeByEmailapi,} from '../../backend/api'
import {Toast} from '../../tool/toast.js'

export default {
     data(){
        return{
			email:'',
			time:0,
			btntxt:'获取验证码',
			emailcode:'',
			counting:false
        }
    },
    methods: {
		sendValidateCode(){
			let params={email:this.email}
			
			 sendValidateCodeByEmailapi(params).then(res=>{
				  if(res.code == 1) {
					this.counting = true;
					this.time = 60;
					this.timer();
					this.$toast.center(res.mes);
				  }else{
					  this.$toast.center(res.mes)
				  }
			 }).catch(err =>{             
             	 console.log( err )
             })
		},
		timer () {
			if (this.time > 0) {
					this.time--;
					this.btntxt=this.time+"s后重新获取";
					setTimeout(this.timer, 1000);
			} else{
					this.time=0;
					this.btntxt="获取验证码";
					this.counting=false;
			}
		},
		emailBind(){
			let params={email:this.email,emailcode:this.emailcode}
			 emailBindapi(params).then(res=>{
				 if(res.code == 1) {
					  this.$toast.center(res.mes);
					  this.$router.go(-1);
				  }else{
					  this.$toast.center(res.mes)
				  }
			 }).catch(err =>{             
             	 console.log( err )
             })
		}
		
    },
    created(){
       
    }

}
</script>