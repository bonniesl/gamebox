<template>
    <div>
        <form action="">
				<div class="form_group">
					<input type="text" name="username" placeholder="用户名" v-model.trim='username'>
					<label class="icon_t">
						<i class="userIcon"></i>
					</label>
					<div class="valid_info">账号为4~20位的数字、字母、下划线和中划线</div>
				</div>

				<div class="form_group">
					<input type="password" name="password" placeholder="登录密码" v-model.trim='pwd'>
					<label class="icon_t">
						<i class="userIcon userIcon2"></i>
					</label>
					<div class="valid_info">密码为6~20位的数字、字母、下划线和中划线</div>
				</div>

				<div class="form_group">
					<input class="sub_btn" @click="login" type="button" value="确定" />
					<div class="to_log">
						<a href="javascript:;" @click="regdisplay">注册账号</a>
						<a class="forget" @click="forfetPas">忘记密码？</a>
					</div>
                    <div @click="phoneLink" class="active_enter">切换至手机登录</div>
				</div>
				
			</form>
    </div>
</template>

<script>
import {apiSignin,apiSignup} from '../backend/api'
import {validValue} from '../tool/lite-validator.js'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'
export default {
    data(){
      return{
        loginchildStuts:{
            loginShowValue:true,
            regShowValue:false,
        },
        username:"",
        pwd:'',
      }
    },
    components:{

    },
    methods:{
      regdisplay(){
            this.$router.push({name: 'register'});
      },
      login(){
            if (!this._validateFrom()) return
            let params = {
                login_name:this.username,
                password:this.pwd
            };
            let self = this;
            apiSignin(params).then(res=>{
                if(res.code==2){
                    this.$toast.bottom(res.mes)
                }else if(res.code==1){   
                   if(res.mes.code == 1) {
                        let info = {
                            username:this.username,  
                            uid: res.mes.uid
                        }
                        window.username=this.username;
                        window.uid=res.mes.uid;
                        this.$toast.bottom(res.mes.mes) 
                        this.$router.push({path: '/index'}); 
                   }else{
                        this.$toast.bottom(res.mes.mes)
                   }
                }
            }).catch(err => {
                console.log(err);
            })
        },
        forfetPas(){
              this.$router.replace({path: '/forgetPass'}); 
        },
        phoneLink(){
             this.$router.push({path: '/phoneLogin'}); 
        },
        _validateFrom() {
            if (ylTrim(this.username).length <= 0) {
                this.$toast.bottom('账号不能为空！')
                return false
            }
            if (ylTrim(this.pwd).length <= 0) {
                this.$toast.bottom('密码不能为空！')
                return false
            }
           
            return true
        },
    }

}
</script>