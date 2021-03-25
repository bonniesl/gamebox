<template>
    <div>
       <tophead></tophead>
        <form action="">
				<div class="form_group">
					<input type="text" name="phone" placeholder="请输入手机号码" v-model.trim='phone'>
					<label class="icon_t">
						<i class="phoneIco"></i>
					</label>
				</div>

                <div class="form_group phoneLoguin">
                    <div class="phoneC" style="width:3.5rem">
                        <input class="vate_code" style="width:3.5rem" v-model.trim="validatxt"  type="text" name="capth" placeholder="请输入图形验证码">
                        <label class="icon_t">
                            <i class="userIcon userIcon2"></i>
                        </label>
                    </div>
                    <div class="code_capats"  @click="getCaptcha"><img :src="valcode" /></div>
                </div>

                <div class="form_group phoneLoguin">
                    <div class="phoneC">
                        <input class="vate_code" v-model.trim="code"  type="text" name="capth" placeholder="请输入手机验证码">
                        <!-- <input type="text" name="phonepassword" placeholder="请输入验证码" v-model.trim='pwd'> -->
                        <label class="icon_t">
                            <i class="userIcon userIcon2"></i>
                        </label>
                    </div>
				    <button type="button" class="code_capat valadite_btn" :disabled="counting" @click.stop="sendValidateCod">{{btntxt}}</button>
				</div>

				<div class="form_group">
					<input class="sub_btn" @click="login" type="button" value="手机登录" />
					<div class="to_log">
						<a href="javascript:;" @click="regdisplay">注册账号</a>
						<a class="forget" @click="forfetPas">忘记密码？</a>
					</div>
                    <div @click="accountLink" class="active_enter">切换至帐号登录</div>
				</div>
				
			</form>
    </div>
</template>

<script>
import tophead from '../components/tophead'
import {apiSignin,apiSignup,ValidateCodeapi,checkauthcodeapi,sendPhoneCodeByLoginapi,loginPhoneapi} from '../backend/api'
import {validValue} from '../tool/lite-validator.js'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'
export default {
    data(){
      return{
        phone:'',
        time:0,
        btntxt:'获取验证码',
        validatxt:'',
        code:'',
        password:'',
        valcode:'',
        counting:false
      }
    },
    components:{
        tophead
    },
    methods:{
      regdisplay(){
            this.$router.push({name: 'register'});
      },
      login(){
            if (!this._validateFrom()) return
            let params = {
                phone:this.phone,
                code:this.code
            };
            let self = this;
            loginPhoneapi(params).then(res=>{
                 if (res.code == 1) {
                     this.$toast.center(res.mes.mes);
                     this.$router.push({path: '/index'});                       
                 }else{
                     this.$toast.center(res.mes)   
                 }
            }).catch(err => {
                console.log(err);
            })
        },
        sendValidateCod(){
            if (!this._validateFrom1()) return;
            let params= {authcode:this.validatxt};
            checkauthcodeapi(params).then(res=>{
                if(res.code==1){
                        let params={tel:this.phone};
                        sendPhoneCodeByLoginapi(params).then(res=>{
                        if (res.code == 1) {
                            this.$toast.center(res.mes);
                            this.counting = true;
                            this.time = 60;
                            this.timer(); 
                        } else{
                            this.$toast.center(res.mes)   
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    this.valcode = ValidateCodeapi();
                    this.$toast.center(res.mes);
                    
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getCaptcha() {
            this.valcode = ValidateCodeapi();
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
        forfetPas(){
              this.$router.replace({path: '/forgetPass'}); 
        },
        accountLink(){
              this.$router.replace({path: '/login'}); 
        },
        _validateFrom() {
            if (ylTrim(this.phone).length <= 0) {
                this.$toast.bottom('账号不能为空！')
                return false
            }
           
            return true
        },
         _validateFrom1() {
            if (ylTrim(this.phone).length <= 0) {
                this.$toast.bottom("手机号不能为空！");
                return false;
            }
            return true;
        }
    },
    created(){
         this.valcode = ValidateCodeapi();
    }

}
</script>