<template>
  <div>  
  <div class="rechargeWrap">
			<div class="rechargeTit">支付方式</div>
	</div>	
			<div class="paymentwrap clearfix" id="paymentwrap">
				<a href="javascript:;" class="alipay fl" :class="[paymType == 44 ? 'active' : '']"  @click="changeTab(44)"><img :src="[staticUrl+'static/images/zhifubao.png']"></a>
				<a href="javascript:;" class="weChat fl" :class="[paymType == 45 ? 'active' : '']"  @click="changeTab(45)"><img :src="[staticUrl+'static/images/weixin.png']"></a>
				<a href="javascript:;" class="alipay fl"  :class="[paymType == 7 ? 'active' : '']"  @click="changeTab(7)"><img :src="[staticUrl+'static/images/okcon.png']" ></a>
				<a href="javascript:;" class="alipay fl"  :class="[paymType == 26 ? 'active' : '']"  @click="changeTab(26)"><img :src="[staticUrl+'static/images/okdou.png']"></a>
  		</div>
		<div class="paytitle">充值</div>
		<div class="rechargeWrap" style="padding-bottom: 2rem;">
			<form action="">
				<div class="chargeLine clearfix">
					账号：<input ref="inpLogin" class="loginname" type="text" v-model.trim="loginName"  :disabled="disable" />
					<div class="fr" v-show="btnOperate1" @click="changeLogName">
						<img src="https://s.h5.okwan.com/lib/svg/edit.svg" style="margin: 0px 0.2rem; width: 0.5rem; vertical-align: middle; height: 0.5rem;">
					</div>
					<div class="fr" v-show="btnOperate">
						<img  @click="sureConfirm(changeInfo.uid)" src="https://s.h5.okwan.com/lib/svg/ok.svg" style="margin: 0px 0.2rem; width: 0.32rem; vertical-align: middle; height: 0.32rem;">
						<img @click="closeB" src="https://s.h5.okwan.com/lib/svg/close.svg" style="margin: 0px 0.2rem; width: 0.32rem; vertical-align: middle; height: 0.32rem;"> 
					</div>
					<!-- <div class="changeNum fr" @click="changeLogName">切换账号</div> -->
				</div>
				<div class="chargeLine clearfix" style="height:auto" v-show='paymType==7 || paymType == 26'>
					<div class="accountNum fl" style="line-height:0.38rem"  v-show='paymType==7'>{{platformCoinName}}：</div>
					<div class="accountNum fl" style="line-height:0.38rem" v-show='paymType==26'>{{platformDouName}}：</div>
					<div class="fl clearfix" style="">
						<div class="left fl"  style="width: 5.2rem;font-size: 0.32rem;line-height:0.38rem" v-show='paymType==7'>{{account.okb}}</div>
						<div class="left fl" v-show='paymType==26' style="width: 5.2rem;font-size: 0.32rem;line-height:0.38rem">{{account.okd}}<span style="font-size: 0.3rem">（注：每1000"{{platformDouName}}"兑换1元充值）</span></div>
					</div>
				</div>
				<div class="chargeLine clearfix">
					<div class="accountNum fl">充值到：</div>
					<div class="ganmeokcon fl clearfix">
							<div class="left fl" :class="[rechargeto == 1 ? 'active' : '']"  @click="changeType(1)">游戏</div>
							<div class="right fl" v-show="paymType==44 || paymType==45" :class="[rechargeto == 2 ? 'active' : '']" @click="changeType(2)">{{platformCoinName}}</div>
					</div>
				</div>
				<div v-show="rechargeto==1">
					<div class="chargeLine clearfix">
						<div class="accountNum fl">游戏：</div>
						<div class="selectBox fr"  @click="gameSelect" >
							<div id="gamename" ref="gameName" :data-id="gameId">请选择</div>
							<span class="solt"></span>
						</div>
						
					</div>
					<div class="chargeLine clearfix">
						<div class="accountNum fl">区服：</div>
						<div class="selectBox fr" @click="serviceSelect(gameId)">
							<div id="qufu" ref="serviceName" >请选择</div>
							<span class="solt"></span>
						</div>
					</div>
					<div class="chargeLine clearfix">
						<div class="accountNum fl">角色：</div>
						<div class="selectBox fr" @click="roleSelect(gameId,serviceId)">
							<div id="role" ref="roleName">请选择</div>
							<span class="solt"></span>
						</div>
					</div>
				</div>
			</form>
			<div class="rechargePay">充值金额<span class="lit">（注:官网充值以下的金额才能赠送元宝）</span></div>
			<div class="otherAmount">
					<input v-model="amount" type="tel" @input="handInput"  placeholder="请输入其他金额">
			</div>
			<ul class="changemoney clearfix">
				<li class="mon fl" :key="index" :class="[curIdx === index ? 'active' : '']"  v-for="(item,index) in payActivityList" @click="changeMoney(index,item)">{{item.amount}}<span v-if="rechargeto==1">元</span><span v-if="rechargeto==2">{{platformCoinName}}</span></li>
			</ul>
			<div :key="index" v-for='(item,index) in payActivityList' v-show="curIdx==index">
				<div class="litTips">充值<span class="col">{{item.amount}}</span>元  返还:<span class="col">{{parseInt(item.amount*item.rebate*100)}}</span>元宝</div>
				<div class="litTips">您将获得<span class="col">{{parseInt(item.amount*item.rebate*100)+parseInt(item.amount*item.ratio)}}</span>元宝</div>
			</div>
			
			<div class="submitBtn" style="margin-top:0.3rem" @click="payOk">确认支付</div>
		</div>
		<Nav></Nav>
<!--弹窗-->
<div class="surePay" v-show="isPay">
	<div class="comm_dia"></div>
	<div class="con">
		<p>确认支付吗？</p>
		 <div class="btn">
			 <a class="sure" @click="surePay">确认</a>
			 <a @click="isPay=false">取消</a>
		 </div>
	</div>
</div>
</div>
</template>

<script>
import { rechargeApiGetGameList,rechargeApiGetServerList,rechargeApiGetRoleList,rechargeChangeName,rechargeDoRecharge} from "../backend/rechargeApi"
import {getpayActivityapi,getchangeAccountapi,getuserInfoapi,getaccountapi,getVirtualCoinapi} from '../backend/api'
import Nav from "../components/nav"
import { ylTrim, ylSetStore, ylGetStore } from "../tool/tools"
import {Toast} from '../tool/toast'
import {validValue} from '../tool/lite-validator'
import gameutils from '../backend/gameutils'
import payAction from '../backend/payAction'
import backends from '../backend/backend'

export default {
  data() {
    return {
	  platformCoinName,
	  platformDouName,		
	  loginName:'',
	  newLoginName:'',
	  uid:'',
	  newUid:'',
	  changeInfo:{},
      classStateA: true,
	  classStateB: false,
	  gameSelectList:[],
	  gameSelAll:[],
	  gameId:'',
	  serviceId:'',
	  serviceList:[],
	  serviceSelAll:[],
	  roleList:[],
	  roleSelAll:[],
	  payActivityList:[],
	  curIdx:'',
	  btnOperate:false,
	  btnOperate1:true,
	  serviceName:'',
	  rechargeAmount:'',
	  iframeDialogSrc: '',
	  wxQRCodeSrc: '',
	  lock: false,
	  disable:true,
	  sy_name:'',
	  amount:'',
	  rolename:'',
	  payMt:'',
	  paymType:44,   //支付类型
	  rechargeto:'1',  //充值到游戏,1:游戏2:游戏币
	  account:{
		  okb:'',
		  okd:''		  
	  },
	  gamePicker:'',
	  servicePicker:'',
	  rolePicker:'',
	  isPay:false,
	  payDataCon:{},
	  staticUrl:''
    };
  },
  components: {
    Nav
  },
  methods: {
  	getaccount(){
		let params ={uid:this.uid};
		 getVirtualCoinapi(params).then(res=>{
			  if(res.code == 1) {	  
				  this.account.okb=res.mes.myCoin
				 this.account.okd=res.mes.myDou.kxd
			  }
		 }).catch(err =>{             
          console.log( err )
        
      })
	},
	changeLogName(){
		let self = this;
		self.btnOperate1=false;
		self.btnOperate=true;
		self.newLoginName=self.loginName;
		self.newUid=self.uid;
		self.disable=false;	
	},
	sureConfirm(uid){
		let self = this;
		if (!this._validateFrom()){
			self.disable=true;	
			self.btnOperate1=true;
			self.btnOperate=false;
			self.loginName=self.newLoginName;
			 return
		}
		self.btnOperate1=true;
		self.btnOperate=false;
		 let params={login_name:self.loginName};	
			getchangeAccountapi(params).then(res=>{
				if(res.code==1){
					self.loginName=window.username;
					$("#qufu").text('请选择');
					$("#role").text('请选择');
					self.$toast.center('账号不存在~');
					self.uid=window.uid;
					self.disable=true;			
				}else{
					self.disable=true;
					self.changeInfo=res;
					self.uid=self.changeInfo.uid;	
					self.getaccount();	
					$("#gamename").text('请选择');				
					$("#qufu").text('请选择');
					$("#role").text('请选择');
					
				}
			}).catch(err =>{

			})
			return;	
		
	},
	closeB(){
		let self = this;
		self.btnOperate1=true;
		self.btnOperate=false;
		self.loginName=self.newLoginName;
		self.uid=self.newUid;
		self.disable=true;
	},
	changeTab(num){
		this.paymType=num;
		this.getaccount();
	},
	changeType(num){
		this.rechargeto=num;
	},
	gameList(){
		let self = this;	
		 rechargeApiGetGameList(2).then(res=>{
              if(res.code == 1) {
				   self.gameSelectList=res.mes;
				   self.sy_name=self.gameSelectList.sy_name;
              }
          }).catch(err =>{             
              console.log( err )
          }) 
	},
	gameSelect(){
		let self = this;	
		if(self.loginName==''){
			self.loginName=self.newLoginName;
			self.btnOperate1=true;
			self.btnOperate=false;
			self.uid=self.newUid;
			self.disable=true;
			self.$toast.center('账号不能为空~');
			return
		}
		self.btnOperate1=true;
		self.btnOperate=false;
		self.gameSelAll=[];
		 self.gameSelectList.forEach( function(v, k) {
				if(v.is_recharge==1){
					var gameAll={text:'',value:''} 
					gameAll.text=v.name;
					gameAll.value=v.gid;
					self.gameSelAll.push(gameAll)
				}	
			})
			if(!this.gamePicker)  {
					var picker = new Picker({
							data: [self.gameSelAll],
							selectedIndex: [0],
							title: '游戏列表'
					});
						
				picker.on('picker.select', function (selectedVal, selectedIndex) {
					$("#gamename").text(self.gameSelAll[selectedIndex[0]].text);	
					self.gameId=self.gameSelAll[selectedIndex[0]].value;
					self.serviceSelAll=[];
					self.roleSelAll = [];
					//self.serviceSelect(self.gameId);
					self.getpayActivity();
					$("#qufu").text('请选择');		
					self.serviceId=0;
					$("#role").text('请选择');	
					self.rolename='';
				});
				this.gamePicker = picker;
			}else{
				this.gamePicker.scrollColumn(0, 0);
				this.gamePicker.refillColumn(0, []);
			}
		this.gamePicker.show(function(){
			self.gamePicker.refillColumn(0, self.gameSelAll);	
		});
	},
	serviceSelect(gameId){
		let self = this;
		self.serviceSelAll=[];
		self.btnOperate1=true;
		self.btnOperate=false;
		if(gameId==''){
			self.$toast.center('请选择游戏~');
			return;
		}
		if(!this.servicePicker)  {
			var picker = new Picker({
					data: [self.serviceSelAll],
					selectedIndex: [0],
					title: '区服列表'
			});				
			picker.on('picker.select', function (selectedVal, selectedIndex) {
				$("#qufu").text(self.serviceSelAll[selectedIndex[0]].text);		
				self.serviceId=self.serviceSelAll[selectedIndex[0]].value;
				self.roleSelAll = [];
				$("#role").text('请选择');	
				self.rolename='';
			});
			this.servicePicker = picker;
		}else {
			this.servicePicker.scrollColumn(0, 0);
			this.servicePicker.refillColumn(0, []);
		}
		
		rechargeApiGetServerList(gameId).then(res=>{
			if(res.code == 1) {
				self.serviceList=res.mes;
				
				 Object.keys(self.serviceList).forEach(function(v) {
					var serviceAll={text:'',value:''}; 
					serviceAll.text=self.serviceList[v].name;
					serviceAll.value=self.serviceList[v].id;
					self.serviceSelAll.push(serviceAll);
				})
				this.servicePicker.show(function(){
					self.servicePicker.refillColumn(0, self.serviceSelAll);	
				});	
            }else{
				$("#qufu").text('请选择');
				self.$toast.center('没有区服~');
				this.servicePicker.hide();		

			}
		}).catch(err =>{             
			
		}) 
	},
    roleSelect(gameId,serviceId) {
	  let self = this;
	//   console.log(self.uid)
	  let params={gid:gameId,uid:self.uid}
	  self.btnOperate1=true;
		self.btnOperate=false;
	  if(gameId==''){
		  self.$toast.center('请选择游戏~');
			return;
	   }else if(serviceId==''){
		    self.$toast.center('请选择区服~');
			return;
	   }
	  rechargeApiGetRoleList(params).then(res=>{
			if(res.code == 1) {
				if(res.mes.length<=0){
					 self.$toast.center('没有角色~');
					return;				
				}
				self.roleSelAll = [];
				self.roleList=res.mes;
				self.roleList.forEach( function(v, k) {
					if (v.serverid == self.serviceId) {
						var roleAll={text:'',value:''} 
						roleAll.text=v.role;
						roleAll.value=v.serverid;
						self.roleSelAll.push(roleAll)
					}
				})

				if(self.roleSelAll.length<=0){
					 self.$toast.center('没有角色~');
					 $("#role").text('请选择');	
					self.rolename = '';
					return;				
				}
				if(!this.rolePicker)  {
					var picker = new Picker({
						data: [self.roleSelAll],
						selectedIndex: [0],
						title: '角色列表'
					});
					
					picker.on('picker.select', function (selectedVal, selectedIndex) {	
						$("#role").text(self.roleSelAll[selectedIndex[0]].text);	
						self.rolename=self.roleSelAll[selectedIndex[0]].text;
					});
					this.rolePicker=picker
				}
				this.rolePicker.show(function(){
					self.rolePicker.refillColumn(0, self.roleSelAll);	
				});	
            }
		}).catch(err =>{             
			console.log( err )
		})  
	},
	getpayActivity(){
		 let self = this;
		  let params={gid:self.gameId}
		  getpayActivityapi(params).then(res=>{
			  self.payActivityList=res.mes;
		  }).catch(err =>{             
			console.log( err )
		})
	},
	changeMoney(index,item){
		this.curIdx = index;
		this.btnOperate1=true;
		this.btnOperate=false;
		if(item){
			this.amount=item.amount;
		}else{
			this.amount=this.rechargeAmount;
		}

	},
	handInput(e){
		this.curIdx=''
		this.amount=e.target.value.replace(/[^\d]/g,'');
	},
	_validateFrom() {
		if (ylTrim(this.loginName).length <= 0) {
			this.$toast.bottom('账号不能为空~')
			return false
		}
		if (!validValue.username(this.loginName)) {
			this.$toast.bottom('请输入4-20位数字、字母、下划线和中划线~')
			return false
		}
		return true
	},
	 close: function () {
            this.iframeDialogSrc = '';
            this.wxQRCodeSrc = '';
            this.lock = false;
        },

	paySuccess: function (payData) {
		this.iframeDialogSrc = '';
		this.wxQRCodeSrc = '';
		this.lock = false;
		// location.href = '/tn/success';
	},
	surePay(){
		let self = this;
		var payData=this.payDataCon
		this.isPay=false;
		switch (this.paymType) {
			case 45:{
				if (payData.platform == 4) {
					backends.alertEx("请使用浏览器打开,再使用微信支付");
					break;
				}
				//微信
				payAction.payWx({
					payData: payData,
					platform: payData.platform,
					suc: function (data) {
						self.paySuccess(payData)	
					},
					close: function () {
						self.close();
					},
					showIframe: function (url) {
						self.iframeDialogSrc = url;
					},
					showQrCode: function (data) {
						self.wxQRCodeSrc = data;
					}
				});
				break;
			}
			case 44:{
				//支付宝
				payAction.payAlidata({
					payData: payData,
					platform: payData.platform,
					suc: function (data) {
						self.paySuccess(payData)
					},
					close: function () {
						self.close();
					},
					showIframe: function (url) {
						console.log(url)
						self.iframeDialogSrc = url;
					},
					showQrCode: function (data) {
						//self.wxQRCodeSrc = data;
					}
				});
				break;
			}
			case 7:{

				payAction.kxbPay({
					payData: payData,
					platform: payData.platform,
					suc: function (data) {	
						self.paySuccess(payData);
						backends.alertEx("支付成功");
						self.account.okb=self.account.okb-parseInt(payData.amount);
					},
					close: function () {
						self.close();
					}
				}); 
				break;
			}
			case 26:{
				payAction.kxdPay({
					payData: payData,
					platform: payData.platform,
					suc: function (data) {
						self.paySuccess(payData);
						backends.alertEx("支付成功");
						self.account.okd=self.account.okd-parseInt(payData.amount*1000);
					},
					close: function () {
						self.close();
					}
				});
				break;
			}
		}
		
	},
	payOk(){
		let self = this;
		self.btnOperate1=true;
		self.btnOperate=false;
		// if(self.rechargeto == 1){
			if(!self.gameId && self.rechargeto == 1){
				 self.$toast.bottom('请您选择您要充值的游戏~');
			}else if(!self.serviceId && self.rechargeto == 1){
				 self.$toast.bottom('请您选择您要充值的区服~');
			}else if(!self.rolename && self.rechargeto == 1){
				self.$toast.bottom('请您选择您要充值的角色~');
			}else if(self.paymType==0){
				self.$toast.bottom('请您选择支付类型~');
			}else if(!self.amount){
				self.$toast.bottom('请您选择支付金额~');
			}else{
				let payData={
					uid:self.uid,
					login_name:self.loginName,
					platform:3,//5,
					payType:self.paymType,
					rechargeto:self.rechargeto,
					amount:self.amount,
					goodsNum:1,
					gid:self.gameId,
					serverId:self.serviceId,
					roleName:self.rolename,
					gameProductName:''
				}
				this.payDataCon=payData
				 
				this.isPay=true
				
				// rechargeDoRecharge(params).then(res=>{

				// 	console.log(res)
					
				// }).catch(err =>{             
				// 	console.log( err )
				// })
			}
		// }
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
			}else{
				 this.$router.replace({path: '/login'});
			}
		}).catch(err=>{
			console.log(err)
		})
	}
  },
  watch: {
	 'gameId':function(val){
		 this.gameId=val; 
	 },
	 'serviceId':function(val){
		 this.serviceId=val; 
	 },
	 'rolename':function(val){
		 this.rolename=val; 
	 },
	 'loginName':function(val){
		 this.loginName=val;
	 },
	 'amount':function(val){	
		 var self= this;
		 this.amount=val; 
		 this.payActivityList.forEach(function(value,index){
			 if(value.amount==val){
				 self.curIdx=index
				//$(".changemoney li").eq(index).addClass("active").siblings().removeClass("active");
			 }
		 })
	 },
	 'uid':function(val){
		this.$nextTick(()=>{
			this.uid=val; 
		}) 
	 } 
  },
  created() {
	this.staticUrl = urlConfig.static + '/hwiphone/dist/';
	this._isLogin(_=>{
		this.uid=window.uid;
		this.loginName=window.username;
		this.getaccount();
   	})	
	this.gameList();
  }
};
</script>
