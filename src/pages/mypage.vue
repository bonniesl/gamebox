<template>
  <div style="padding-bottom:0.36rem;">
			
    <div class="gameListhead clearfix">
			<!-- <a href="javascript:history.go(-1);" class="backArrow fl"></a> -->
			<div class="innerlogo fl"></div>
		</div>
		<router-view></router-view>

		<router-link class="userLine clearfix" :to="{path:'mystuff'}">
			<div class="left fl"><i class="userIc bgz01"></i>个人资料</div>
			<div class="rightArrow fr"></div>
		</router-link>
		

		<a class="userLine">
			<div class="left"><i class="userIc bgz02"></i>我的账户</div>
			<div class="right">
				<div class="info">{{platformCoinName}}：{{account.kxcoin || 0}} </div>
				<div class="info">{{platformDouName}}：{{account.kxdou || 0}} </div>
			</div>
		</a>

		<router-link :to="{path:'rechargerecode'}" class="userLine clearfix">
			<div class="left fl"><i class="userIc bgz03"></i>充值记录</div>
			<div class="rightArrow fr"></div>
		</router-link>

		<router-link :to="{path:'mygift',query:{uid:uid}}" class="userLine clearfix">
			<div class="left fl"><i class="userIc bgz04"></i>我的礼包</div>
			<div class="rightArrow fr"></div>
		</router-link>

		<router-link :to="{path:'mynews'}" class="userLine clearfix">
			<div class="left fl"><i class="userIc bgz05"></i>我的消息</div>
			<div class="rightArrow fr"></div>
		</router-link>
		<router-link :to="{path:'bindPhone'}" class="userLine clearfix">
			<div class="left fl"><i class="userIc bgz06"></i>{{txt}}</div>
			<div class="rightArrow fr"></div>
		</router-link>
		<div class="userLine clearfix" @click="checkEmail">
			<div class="left fl"><i class="userIc bgz07"></i>邮箱绑定</div>
			<div class="rightArrow fr"></div>
		</div>
		<!-- <router-link :to="{path:'bindEmail'}" class="userLine clearfix">
			
		</router-link> -->
		<div class="submitBtn" @click="logOut">退出登录</div>
	<Nav></Nav>
  </div>

	
</template>

<script>
import {getaccountapi,getuserInfoapi,getlogoutapi,checkEmailapi,checkPhoneapi} from '../backend/api'
import Nav from '../components/nav'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'

export default {
	data(){
		return{
			platformCoinName,
	  		platformDouName,	
			account:[],
			txt:'手机绑定',
			uid:''
		}
	},
	components:{
		Nav
	},
	methods:{
		getaccount(){
			let params ={uid:window.uid};
			 getaccountapi(params).then(res=>{
				  if(res.code == 1) {
					  this.account=res.mes;
				  }
			 }).catch(err =>{             
              console.log( err )
            
          })
		},
		
		checkEmail(){		
			checkEmailapi({}).then(res=>{
				console.log(res)
				  if(res.code == 1) {
					  this.$toast.center(res.mes);
					  
				  }else{
					  this.$router.push({path: '/bindEmail'});
				  }
			 }).catch(err =>{             
				console.log( err )	
			})
		},
		checkPhone(){
			checkPhoneapi({}).then(res=>{
				if(res.code==1){
					this.txt='更换绑定'
				}else{
					this.txt='手机绑定'
				}

			}).catch(err=>{
				console.log(err)
			})
		},
		_isLogin(cb) {
            var self = this
            getuserInfoapi({}).then(res=>{
                if (res.code == 1) {
                    if(typeof cb!='undefined'){
						window.uid = res.mes.uid  
						window.username=res.mes.login_name
                        cb();                     
                    }
                } else{
					 this.$router.replace({path: '/login'});
				}
            }).catch(err=>{
                console.log(err)
            })
		},
		logOut(){
			getlogoutapi({}).then(res=>{
				if (res.code == 1) {
					 this.$toast.center(res.mes);
					 this.$router.replace({path: '/login'});
				}
			}).catch(err=>{
                console.log(err)
            })
		}
	},
	created() {
		this._isLogin(_=>{
			this.uid=window.uid
			this.checkPhone();
			this.getaccount();
		})	
		
	}
}
</script>

