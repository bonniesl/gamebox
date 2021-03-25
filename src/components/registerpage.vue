<template>
  <div>
    <form action="post">
				<div class="form_group">
					<input type="text" name="username" placeholder="用户名" v-model.trim='username'>
					<label class="icon_t">
						<i class="userIcon"></i>
					</label>
					<div class="valid_info">账号为4~20位的数字、字母、下划线和中划线</div>
				</div>
				<div class="form_group">
					<input type="password" name="password" placeholder="登录密码" v-model.trim='password'>
					<label class="icon_t">
						<i class="userIcon userIcon2"></i>
					</label>
					<div class="valid_info">密码为6~20位的数字、字母、下划线和中划线</div>
				</div>

				<div class="form_group">
					<input type="password" name="reppassword" placeholder="重复密码" v-model.trim="reppassword">
					<label class="icon_t">
						<i class="userIcon userIcon2"></i>
					</label>
				</div>

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
                        <input class="vate_code" v-model.trim="codetxt"  type="text" name="capth" placeholder="请输入手机验证码">
                        <!-- <input type="text" name="phonepassword" placeholder="请输入验证码" v-model.trim='pwd'> -->
                        <label class="icon_t">
                            <i class="userIcon userIcon2"></i>
                        </label>
                    </div>
				    <button type="button" class="valadite_btn" :disabled="counting" @click.stop="sendValidateCod">{{btntxt}}</button>
				</div>

				<div class="form_group">
					<input class="sub_btn" type="button" value="提交" @click="signup" />
					<div class="to_log">
						<a href="javascript:;" @click="loginplay">有账号返回登录</a>
					</div>
				</div>
				
			</form>
  </div>
</template>

<script>
import { apiSignin, apiSignup, sendPhoneCodeByRegapi,ValidateCodeapi,checkauthcodeapi} from "../backend/api";
import { validValue } from "../tool/lite-validator.js";
import { ylTrim, ylSetStore, ylGetStore } from "../tool/tools.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      reppassword: "",
      phone: "",
      time: 0,
      btntxt: "获取验证码",
      validatxt: "",
      codetxt: "",
      password: "",
      valcode: "",
      counting: false,
      loginchildStuts: {
        loginShowValue: true,
        regShowValue: false
      }
    };
  },
  components: {

  },
  methods: {
    loginplay() {
      this.$router.push({ name: "login" });
    },
    signup() {
      if (!this._validateFrom()) return;
      let params = {
        login_name: this.username,
        phone: this.phone,
        code:this.codetxt,
        password: this.password,
        passconfirm: this.reppassword
      };
      let self = this;
      apiSignup(params).then(res => {
          if (res.code == 1) {
            this.$toast.bottom("注册成功!");
            this.loginchildStuts.regShowValue = false;
            this.loginchildStuts.loginShowValue = true;
            this.$emit("regShow", this.loginchildStuts);
            this.$router.push({ name: "index" });
          } else {
            this.$toast.bottom(res.mes);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sendValidateCod(){
        if (!this._validateFrom1()) return;
        let params= {authcode:this.validatxt};
        checkauthcodeapi(params).then(res=>{
            if(res.code==1){
                    let params={tel:this.phone};
                    sendPhoneCodeByRegapi(params).then(res=>{
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
    _validateFrom1() {
        if (ylTrim(this.phone).length <= 0) {
            this.$toast.bottom("手机号不能为空！");
            return false;
        }
        return true;
    },
    _validateFrom() {
      if (ylTrim(this.username).length <= 0) {
        this.$toast.bottom("账号不能为空！");
        return false;
      }
      if (ylTrim(this.password).length <= 0) {
        this.$toast.bottom("密码不能为空！");
        return false;
      }
      if (ylTrim(this.reppassword).length <= 0) {
        this.$toast.bottom("请再输入一次密码！");
        return false;
      }
      if (this.repassword != this.ppassword) {
        this.$toast.bottom("两次密码不一致！");
        return false;
      }
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
};
</script>

