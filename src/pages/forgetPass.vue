<template>
   <div class="hwpone_uccn">
	<!-- 头部 -->
		<div class="gameListhead clearfix">
			<a onclick="history.back()" class="backArrow fl"></a>
			<div class="innerTitle fl">忘记密码</div>
		</div>

		<div class="main">
			<div v-if="prevshow">
				<div class="form_group">
					<input type="text" v-model="loginname" name="username" placeholder="请输入注册的账号">
					<label class="icon_t">
						<i class="userIcon"></i>
					</label>
					<div class="valid_info">账号为4~20位的数字、字母、下划线和中划线</div>
				</div>
				<div class="form_group">
					<input class="sub_btn" type="button" value="下一步" @click="checkname" />
				</div>
			</div>
			<div class="bindphone"  v-if="nextShow">
                <div class="nav_login">
                    <ul>
                        <li :class="{active:comlogin==0}" @click="changeTab(0)">手机找回</li>
					    <li :class="{active:comlogin==1}" @click="changeTab(1)">邮箱找回</li>
                    </ul>
                </div>
                   
                <div class="login-tabslide">
                    <transition name="slide-fadeleft">
                        <div class="null_page" v-if="comlogin==0 && !phone">
                            <img :src="nullImg" />
			                <p>您尚未绑定手机哦~</p>
                        </div>
                        <div class="userlogin-wap" v-if="comlogin==0 && phone"> 
                            <div class="form_group">
                                <label>手机号码</label>
                                <input type="text" v-model="phone" disabled="disabled" name="phone" placeholder="请输入手机号">
                            </div>
                            <div class="form_group">
                                <label>图形验证码</label>
                                <input class="vate_code" v-model.trim="phoneInfo.validatxt"  type="text" name="capth" placeholder="请输入图形验证码">
                                <div class="code_capat" @click="getCaptcha"><img :src="phoneInfo.valcode" /></div>
                            </div>
                            <div class="form_group">
                                <label>手机验证码</label>
                                <input class="vate_code" v-model.trim="phoneInfo.code"  type="text" name="capth" placeholder="请输入手机验证码">
                                <button type="button" class="code_capat valadite_btn" :disabled="phoneInfo.counting" @click.stop="sendValidateCod">{{phoneInfo.btntxt}}</button>
                            </div>
                            <div class="form_group">
                                <label>新密码</label>
                                <input class="text" v-model.trim="phoneInfo.password" type="password" name="password" placeholder="请输入新密码">
                            </div>
                            <input class="sub_btn" type="button" value="确认密码" @click="savePasswordByPhone" />
                        </div>
                    </transition>
                    <transition name="slide-fade">
                        <div class="null_page" v-if="comlogin==1 && !email">
                            <img :src="nullImg" />
			                <p>您尚未绑定邮箱哦~</p>
                        </div>
                         <div class="userlogin-wap" v-if="comlogin==1 && email">
                            <div class="form_group">
                                <label>邮箱账号</label>
                                <input type="text" v-model.trim="email" disabled="disabled"  name="email" placeholder="请输入邮箱账号">
                            </div>
                            <div class="form_group">
                                <label>图形验证码</label>
                                <input class="vate_code" v-model.trim="emailInfo.validatxt"  type="text" name="capth" placeholder="请输入图形验证码">
                                <div class="code_capat" @click="getCaptcha1"><img :src="emailInfo.valcode" /></div>
                            </div>
                            <div class="form_group">
                                <label>验证码</label>
                                <input class="vate_code" v-model.trim="emailInfo.code" type="text" name="capth" placeholder="请输入邮箱验证码">
                                <button type="button" :disabled="emailInfo.counting"  class="code_capat valadite_btn" @click.stop="sendValidateCodeLogin">{{emailInfo.btntxt}}</button>
                            </div>
                            <div class="form_group">
                                <label>新密码</label>
                                <input class="text" v-model.trim="emailInfo.password"  type="password" name="password" placeholder="请输入新密码">
                            </div>
                            <input class="sub_btn" type="button" value="确认密码" @click="savePasswordByEmail"  />
                        </div>
                    </transition>
                </div>
            </div>
		</div>
</div>
</template>

<script>
import {ValidateCodeapi,checkauthcodeapi,checknameapi,sendValidateCodeapi,savePasswordByPhoneapi,sendValidateCodeLoginapi,savePasswordByEmailapi} from '../backend/api'
import {Toast} from '../tool/toast.js'

export default {
     data(){
        return{  
           comlogin:0,
           prevshow:true,
           nextShow:false,
           loginname:'',
           phone:'',
           email:'',
           phoneInfo:{
            time:0,
            btntxt:'获取验证码',
            validatxt:'',
            code:'',
            password:'',
            valcode:'',
            counting:false
            
           },
           emailInfo:{
            time:0,
            validatxt:'',
            btntxt:'获取验证码',
            code:'',
            password:'',
            valcode:'',
             counting:false
           },
            disabled:false,
            nullImg:'' 
           

        }
    },
    methods: {
      checkname(){
          let params = {login_name:this.loginname}
          checknameapi(params).then(res=>{
            if (res.code == 1) {
                 this.prevshow=false;
                 this.nextShow=true;
                 this.phone=res.mes.phone;
                 this.email=res.mes.email;
            } else{
                 this.$toast.center(res.mes)   
            }
        }).catch(err=>{
            console.log(err)
        })
      },
      changeTab(comlogin){
          this.comlogin=comlogin;
          if(comlogin==0){
               this.phoneInfo.valcode = ValidateCodeapi();
          }else{
               this.emailInfo.valcode = ValidateCodeapi();
          }
      },
      sendValidateCod(){
			let params= {authcode:this.phoneInfo.validatxt};
			checkauthcodeapi(params).then(res=>{
				if(res.code==1){
                      this.phoneInfo.counting = true;
                      this.phoneInfo.time = 60;
                       this.timer();
                     let params={tel:this.phone,login_name:this.loginname};
                     sendValidateCodeapi(params).then(res=>{
                        if (res.code == 1) {
                            this.$toast.center(res.mes)  
                        } else{
                            this.$toast.center(res.mes)   
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
				}else{
                     this.phoneInfo.valcode = ValidateCodeapi();
                    this.$toast.center(res.mes);
                    
				}
			}).catch(err=>{
				console.log(err)
			})
		},
        getCaptcha() {
            this.phoneInfo.valcode = ValidateCodeapi();
        },
        getCaptcha1(){
            this.emailInfo.valcode = ValidateCodeapi();
        },
        timer () {
			if (this.phoneInfo.time > 0) {
					this.phoneInfo.time--;
					this.phoneInfo.btntxt=this.phoneInfo.time+"s后重新获取";
					setTimeout(this.timer, 1000);
			} else{
					this.phoneInfo.time=0;
					this.phoneInfo.btntxt="获取验证码";
					this.phoneInfo.counting=false;
			}
        },
        timer1 () {
			if (this.emailInfo.time > 0) {
					this.emailInfo.time--;
					this.emailInfo.btntxt=this.emailInfo.time+"s后重新获取";
					setTimeout(this.timer1, 1000);
			} else{
					this.emailInfo.time=0;
					this.emailInfo.btntxt="获取验证码";
					this.emailInfo.counting=false;
			}
        },
        savePasswordByPhone(){
            let params={login_name:this.loginname,smscode: this.phoneInfo.code,password:this.phoneInfo.password}
            savePasswordByPhoneapi(params).then(res=>{
                
				if(res.code==1){
                    this.$toast.center(res.mes)
                    this.$router.push({path: '/login'});
				}else{
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
			})
        },

        sendValidateCodeLogin(){
            let params= {authcode:this.emailInfo.validatxt};
			checkauthcodeapi(params).then(res=>{
                if(res.code==1){
                     let params={email:this.email,login_name:this.loginname}
                      this.emailInfo.counting = true;
                      this.emailInfo.time = 60;
                       this.timer1();
                    sendValidateCodeLoginapi(params).then(res=>{
                        if(res.code==1){
                            this.$toast.center(res.mes)
                        }else{
                            this.$toast.center(res.mes)
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                     this.emailInfo.valcode = ValidateCodeapi();
                    this.$toast.center(res.mes);
                }
            }).catch(err=>{
				console.log(err)
			})
           
        },
        savePasswordByEmail(){
            let params={login_name:this.loginname,emailcode: this.emailInfo.code,password:this.emailInfo.password}
            savePasswordByEmailapi(params).then(res=>{
				if(res.code==1){
                    this.$toast.center(res.mes)
                    this.$router.push({path: '/login'});
				}else{
					this.$toast.center(res.mes)
				}
			}).catch(err=>{
				console.log(err)
			})
        }

    },
    
    created(){
         
          this.phoneInfo.valcode = ValidateCodeapi();
         this.emailInfo.valcode = ValidateCodeapi();
         this.nullImg=urlConfig.static + '/hwiphone/dist/static/images/null.png'
    }

}
</script>