<template>
   <div class="hwpone_uccn">
	<!-- 头部 -->
		<div class="gameListhead clearfix">
			<a onclick="history.back()" class="backArrow fl"></a>
			<div class="innerTitle fl">{{txt}}</div>
		</div>

		<div class="main bindphone" v-show="prevBind">
			<form action="">
				<div class="form_group">
					<input type="text" v-model.trim="tel" :disabled="disabled"  name="phone"  placeholder="请输入手机号">
				</div>

				<div class="form_group">
					<input class="vate_code" v-model.trim="validatxt"  type="text" name="capth" placeholder="请输入图形验证码">
					<div class="code_capat" @click="getCaptcha"><img :src="valcode" /></div>
				</div>
				<div class="form_group">
					<input class="vate_code" v-model="valdatecode" type="text" name="capth" placeholder="请输入手机验证码">
					<button type="button" :disabled=counting class="code_capat valadite_btn" @click.stop="sendValidateCode" v-if="bindFalse">{{btntxt}}</button>
					<button type="button" :disabled=counting  class="code_capat valadite_btn" @click.stop="sendChangeValidateCode" v-if="bindTrue">{{btntxt}}</button>
				</div>
				<div class="form_group">
					<input class="sub_btn" type="button" value="提 交" @click="phoneBind" v-if="bindFalse" />
					<input class="sub_btn" type="button" value="下一步" @click="checkChangeSMSCode"  v-if="bindTrue" />
				</div>	
			</form>
		</div>
		<div class="main bindphone" v-show="nextBind">
			<form action="">
				<div class="form_group">
					<input type="text" v-model.trim="repassTel"  name="phone"  placeholder="请输入手机号">
				</div>
				<div class="form_group">
					<input class="vate_code" v-model.trim="validatxt1"  type="text" name="capth" placeholder="请输入图形验证码">
					<div class="code_capat" @click="getCaptcha1"><img :src="valcode1" /></div>
				</div>
				<div class="form_group">
					<input class="vate_code" v-model="repassvalidatxt" type="text" name="capth" placeholder="请输入手机验证码">
					<button type="button" class="code_capat valadite_btn" :disabled=counting1  @click.stop="sendNewValidateCodeBySms">{{btntxt1}}</button>
				</div>
				<div class="form_group">
					<input class="sub_btn" type="button" value="提 交" @click="editphone" />
				</div>
				
			</form>
		</div> 
</div>
</template>

<script>
import {ValidateCodeapi,phoneBindapi,getuserInfoapi,sendValidateCodeBySmsapi,checkauthcodeapi,checkPhoneapi,sendChangeValidateCodeBySmsapi,checkChangeSMSCodeapi,editphoneapi,sendNewValidateCodeBySmsapi} from '../../backend/api'
import {Toast} from '../../tool/toast.js'
import {validValue} from '../../tool/lite-validator.js'
import {ylTrim, ylSetStore, ylGetStore} from '../../tool/tools.js'

export default {
     data(){
        return{
			tel:'',
			valcode:'',
			valcode1:'',
			valcode2:'',
			validatxt:'',
			validatxt1:'',
			valdatecode:'',
			txt:'手机绑定',
			time:0,
			time1:'',
			btntxt:'获取验证码',
			btntxt1:'获取验证码',
			bindFalse:false,
			bindTrue:false,
			counting:false,
			counting1:false,
			disabled:false,
			prevBind:true,
			nextBind:false,
			sign:'',
			repassTel:'',
			repassvalidatxt:''

        }
    },
    methods: {
        getCaptcha() {			
            this.valcode = ValidateCodeapi();
		},
		
		getCaptcha1() {
            this.valcode1 = ValidateCodeapi();
		},
		checkPhone(){
			checkPhoneapi({}).then(res=>{
				if(res.code==1){
					this.tel=res.mes;
					this.txt='更换绑定';
					this.disabled=true;
					this.bindFalse=false;
					this.bindTrue=true;

				}else{
					this.txt='手机绑定'
					this.bindFalse=true;
					this.bindTrue=false;
				}

			}).catch(err=>{
				console.log(err)
			})
		},
		sendValidateCode(){
			 if (!this._validateFrom()) return;
			let params= {authcode:this.validatxt};
			checkauthcodeapi(params).then(res=>{
				if(res.code==1){
					let params={tel:this.tel}
					sendValidateCodeBySmsapi(params).then(res=>{
						if(res.code==1){
							this.$toast.center(res.mes)
							this.counting = true;
							this.time = 60;
							this.timer(); 
						}else{
							this.$toast.center(res.mes)
						}
					}).catch(err=>{
						console.log(err)
					})
				}else{	
					this.valcode=ValidateCodeapi();		
					this.$toast.center(res.mes);	
									
				}
			}).catch(err=>{
				console.log(err)
			})	
		},

		sendChangeValidateCode(){
			let params= {authcode:this.validatxt};
			checkauthcodeapi(params).then(res=>{
				if(res.code==1){
					let params={tel:this.tel}
					this.counting = true;
					this.time = 60;
					this.timer(); 
					sendChangeValidateCodeBySmsapi(params).then(res=>{
						if(res.code==1){	
							this.$toast.center(res.mes);
						}else{					
							this.$toast.center(res.mes);	
						}
					}).catch(err=>{
						console.log(err)
					})
					
				}else{
					this.valcode=ValidateCodeapi();		
					this.$toast.center(res.mes);						
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		phoneBind(){
			let params= {tel:this.tel,smscode:this.valdatecode};
			phoneBindapi(params).then(res=>{
				if(res.code==1){
					this.$toast.center(res.mes);
					this.$router.push({path: '/mypage'});
				}else{
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		checkChangeSMSCode(){
			
			let params= {smscode:this.valdatecode};
			checkChangeSMSCodeapi(params).then(res=>{
				if(res.code==1){
					this.valcode1=ValidateCodeapi();	
					this.nextBind=true;
					this.prevBind=false;
					this.sign=res.mes;
					this.validatxt='';
					this.time=60;
					this.btntxt='获取验证码'
				}else{
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
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
		timer1 () {
			if (this.time1 > 0) {
					this.time1--;
					this.btntxt1=this.time1+"s后重新获取";
					setTimeout(this.timer1, 1000);
			} else{
					this.time1=0;
					this.btntxt1="获取验证码";
					this.counting1=false;
			}
		},		
		sendNewValidateCodeBySms(){
			let params= {authcode:this.validatxt1};
			checkauthcodeapi(params).then(res=>{
				if(res.code==1){
					let params ={tel:this.repassTel}
					sendNewValidateCodeBySmsapi(params).then(res=>{
						if(res.code==1){
							this.counting1 = true;
							this.time1 = 60;
							this.timer1(); 
							this.$toast.center(res.mes);
						}else{
							this.$toast.center(res.mes)
							this.valcode1=ValidateCodeapi();
						}
					}).catch(err=>{
						console.log(err)
					})
				}else{
					this.valcode1=ValidateCodeapi();
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		editphone(){
			let params={sign:this.sign,tel:this.repassTel,smscode:this.repassvalidatxt}
			editphoneapi(params).then(res=>{
				if(res.code==1){
					this.$toast.center(res.mes);
					this.$router.push({path: '/mypage'});
				}else{
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
			})
		},
		 _validateFrom() {
            if (ylTrim(this.tel).length <= 0) {
                this.$toast.center('手机号不能为空！')
                return false
            }
           
            return true
        },
		 _isLogin(cb) {
          var self = this
          getuserInfoapi({}).then(res=>{
              if (res.code == 1) {
                  if(typeof cb!='undefined'){
                    window.uid = res.mes   
                    window.username=res.mes.login_name
                      cb();                     
                  }
              }else{
				 this.$router.push({path: '/login'}); 
			  }
          }).catch(err=>{
              console.log(err)
          })
      }
	},

    created(){
		 this._isLogin(_=>{
			this.checkPhone();
			// this.valcode1=ValidateCodeapi();
			 this.valcode = ValidateCodeapi();
    	})	
       
	},
	watch: {
	
    }

}
</script>