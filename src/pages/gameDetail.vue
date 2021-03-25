<template>
 <div class="hwpone_uccn">
	<!-- 头部 -->
	<div class="gameListhead clearfix">
		<a href="javascript:history.go(-1);" class="backArrow fl"></a>
		<div class="innerlogo fl"></div>
	</div>
	<div class="hwgame_Detail">
		<div class="game_details_top">
			<p class="pic"><img :src="detailInfo.logo" /></p>
			<p class="info">
				<span class="name">{{detailInfo.name}}</span>
				<span class="tag">游戏大小 : {{detailInfo.size}}</span>
				<span class="tag">游戏类型 : {{detailInfo.gstyle}}</span>
			</p>
			<div class="down">
				<a class="andrbtn" @click="androidown(detailInfo.pkg_url)">安卓下载</a>
				<a :href="detailInfo.ios_url">IOS下载</a>
			</div>
		</div>
		<div class="game_details_intro game_hover">
			<div class="top">
				<h2 class="title"><span class="icon04 icon"></span><span class="txt">游戏简介</span></h2>
				<p class="toggle icon"></p>
			</div>
			<div class="togg_con">
				<div class="intro" style="padding:0 0.16rem 0">
					<div class="swiper-container" style="padding:0.26rem" v-if="Object.keys(picList).length">
						<div class="swiper-wrapper">
							<div class="swiper-slide" :key="index" v-for="(picitem,index) in picList">
								<img :src="picitem" />
							</div>
						</div>
					</div>
					<div class="game-txt">
						<p>{{detailInfo.name}}</p>
						<span v-html="detailInfo.introduction"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="game_details_intro">
			<div class="top">
				<h2 class="title"><span class="icon05 icon"></span><span class="txt">{{detailInfo.name}}礼包</span></h2>
				<p class="toggle icon"></p>
			</div>
			
			<div class="togg_con">
				<div class="guide_null" v-if="giftDetailList.length==0">暂无礼包信息~</div>
				<div v-else class="getGiftBox clearfix" :key="index" v-for="(item,index) in giftDetailList">
					<div class="giftBoxLeft fl">
						<div class="giftname">{{item.name}}</div>
						<div class="giftInner">礼包内容：<span>{{item.content}}</span></div>
						<div class="giftInner oneTextOmit">使用方法：{{item.receive_way}}</div>
					</div>
					<div class="giftBoxRight fr" :class="[item.carCount==0 ? 'btndisab' : '']"   @click="getgift(item)">领取</div>
				</div>
			</div>
		</div>
		<div class="game_details_intro">
			<div class="top">
				<h2 class="title"><span class="icon06 icon"></span><span class="txt">游戏攻略</span></h2>
				<p class="toggle icon"></p>
			</div>
			<div class="togg_con">
				<div class="guide_null" v-if="lists.length==0">暂无数据~</div>
				<div v-infinite-scroll="getgameGuide" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
					<div class="intro" style="padding-bottom:0">
						<a @click="guideLink(item.id)" :key="index" v-for="(item,index) in lists"><span class="txtname">{{item.title}}</span><span class="time">{{item.create_time}}</span></a>
					</div>
					<loadmore :isLoading="busy" v-if="lists.length>0"></loadmore> 
				</div>
				
			</div>
		</div>
		<div class="game_details_intro">
			<div class="top">
				<h2 class="title"><span class="icon07 icon"></span><span class="txt">其他人还在玩</span></h2>
			</div>
			<ul class="other_game">
				<li :key="index" v-for="(recgame,index) in qualityrecom">
					<div class="pic"><img :src="recgame.logo" /></div>
					<p class="t">{{recgame.name}}</p>
					<a class="op_tar" @click="detailLink(recgame.gid)">打开</a>
				</li>
			</ul>
		</div>
	</div>
   <!--领取弹窗-->
		<div class="receive_dialog">
			<div class="common_shade" v-show="receiveDialog"></div>
			<div class="receive_con fadeout" v-show="receiveDialog">
				<div class="top">
					<h2>领取成功</h2>
					<div class="close" @click="close"></div>
				</div>
				<div class="c">
					<div class="serize_txt">序列号：<input type="text" v-model="cardNum" value="knkfnelkjflew" class="serize_inp" readonly="readonly" /></div>
					<p>使用方法：游戏内兑换领取</p>
				</div>
				<div class="closeb" @click="close">关 闭</div>
			</div>
		</div>
	<!--微信提示-->
	 <div class="browser_tip" v-if="wxShow" @click="wxShow=false">
        <img :src="picImg" />
    </div>
</div>
</template>
<script>
	import {getgameDetailapi,getuserInfoapi,getgameGuideapi,getGiftDetailapi,getgiftapi,gethotRecGameapi} from '../backend/api'
	import Nav from '../components/nav'
	import loadmore from '../components/loadmore'
	import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'

	export default {
		data(){
				return{
					detailInfo:{},
					picList:[],
					guideList:[],
					lists:[],
					busy: false,
					limit:10,
					curPage:1,
					giftDetailList:[],
					qualityrecom:[],
					gid:'',
					logo:'',
					name:'',
					total_number:'',
					gfid:'',
					receiveDialog:false,
					receiveCard:[],
					cardNum:'',
					carCount:'',
					serviceSelAll:[],
					picImg:'',
					wxShow:false,
					type_h5_url:''
				}
			},
			components:{
				Nav,
				'loadmore': loadmore
			},
			methods:{
				getgameDetail(){
					let self = this;
					let params={gid:self.gid};
					getgameDetailapi(params).then(res=>{
						this.$loading('加载中...', 'close'); 		
						if(res.code==1){
							self.detailInfo=res.mes;
							self.picList=self.detailInfo.game_img_shot;
							self.type_h5_url=self.detailInfo.type_h5_url;
							//self.getgameGuide();
							this.getGiftDetail();
						}
					}).catch(err =>{      
						this.$loading('加载中...', 'close');        
						console.log(err)
					}) 	
				},
				getgameGuide(){
					let self = this
					self.busy = true;
					self.curPage = parseInt(self.lists.length/self.limit) + 1;
					let params = {page:this.curPage,gid:self.gid};
					getgameGuideapi(params).then(res=>{
						self.guideList=res.mes;
						if(self.guideList instanceof Array && self.guideList.length > 0){
							self.guideList.forEach(function(val,index){
								self.lists.push(val);
							});
							self.busy = false;
						}
						if(self.guideList.length <10) {
							self.busy = true;
							self.loadingMsg = '没有更多数据了';
						} 
					}).catch(err =>{             
						console.log(err)
					}) 
				},
				 gethotRecGame(){
					let self = this;
					gethotRecGameapi({}).then(res=>{
						if(res.code==1){
							this.qualityrecom = res.mes
						}
					}).catch(err => {
						console.log(err);
					})
				},
				getGiftDetail(){
			  
					let self = this;
					let params = {gid: self.gid};
					getGiftDetailapi(params).then(res=>{
						if(res.code == 1) {	
							self.giftDetailList=res.mes;
							self.name=self.giftDetailList[0].gname;
							self.logo=self.giftDetailList[0].logo;
							self.total_number=self.giftDetailList[0].total_number;  
							self.giftDetailList.forEach(function(v,k){
								for (var i in v.card_count) {
										v.carCount=v.card_count[i];	 
								}
							})	  
						}
					}).catch(err =>{   
						console.log(err)
					})
				},
				getgift(item){
					let self = this;
	 
					getuserInfoapi({}).then(res=>{
						if (res.code == 1) {
							let gfids = item.gfid.join(',');
							let params = {gfid: gfids};
							getgiftapi(params).then(res=>{
								if(res.code==1){
									self.receiveCard=res.mes;
									self.cardNum=self.receiveCard.card;
									if(item.type==1){
										self.receiveDialog=true;
										$(".receive_con").addClass("fadeInUp");
									}
								}else{
									self.receiveDialog=false;
									$(".receive_con").removeClass("fadeInUp");
									self.$toast.center(res.mes);
								}
								}).catch(err =>{ 
									console.log(err)
								})  

								if(item.carCount<=0){
									self.receiveDialog=false;
									$(".receive_con").removeClass("fadeInUp");
									self.$toast.center('礼包已领取完~');
								}


								if(item.type==2 && item.carCount>0){
									self.giftDetailList.forEach(function(v) {
										var serviceAll={text:'',value:''}; 
										for(var i in v.server_name){
											serviceAll.text=v.server_name[i];
											serviceAll.value=i;
										}
										self.serviceSelAll.push(serviceAll);
										
									})
									var picker = new Picker({
											data: [self.serviceSelAll],
											selectedIndex: [0],
											title: '专服列表'
									});

									picker.on('picker.select', function (selectedVal, selectedIndex) {
										
									});
									picker.show();
							}
						}else{
							self.$toast.center('请先登录哦~', _=>{
								self.$router.push({path: '/login'});
							})

						}
					}).catch(err=>{
						console.log(err)
					})
					
				},
				close(){
					this.receiveDialog=false;
					$(".receive_con").removeClass("fadeInUp");
				},
				detailLink(gid){
					this.gid=gid;
					this.giftDetailList=[];
					this.lists=[];
					this.$router.replace({name: 'gameDetail',query:{gid:gid}});
				},
				guideLink(id){
					this.$router.push({name: 'guideDetail',query:{id:id}});
				},
				androidown(pkg_url){

					var ua = navigator.userAgent.toLowerCase();
					var isAndroid = /android/i;
					var android_type = true;
					var android_link="";

					//判断当前页面是否在微信浏览器中打开
					var is_weixin = function() {
						if(ua.match(/MicroMessenger/i) == "micromessenger") {
							return true;
						}else{
							return false;
						}
					};
				
					android_link =pkg_url;
					if (is_weixin() && isAndroid.test(navigator.userAgent.toLowerCase())) {
						 this.wxShow=true;	 
					}else{
						$(".andrbtn").attr("href",android_link);
					}
				}
			},
			created() {
				 this.picImg=urlConfig.static + '/hwiphone/dist/static/images/down_textTip.jpg'
				 this.gid=this.$route.query.gid;
				this.getgameDetail();
				this.gethotRecGame();	
				 this.$loading('加载中...', 'open');
			},
			 watch:{
				picList(){
					this.$nextTick(()=>{
						var swiper = new Swiper('.swiper-container', {
							slidesPerView: 2.6,
							spaceBetween: 20
						});
					})
				},
				gid:function(val){
					this.gid =val;
					this.getgameDetail();
					this.getgameGuide();
				},
				giftDetailList:function(val){
					this.giftDetailList=val
				},
				type_h5_url:function(val){
					this.type_h5_url=val;
					if(this.type_h5_url){
						window.location.href=this.type_h5_url
					}
				}
				
				
			},
			filters:{
				handleUrl: function(value) {
						if(value == ''|| value == null){
							return value
						}else{
							return urlConfig.img + value;
						}   
					}
			},
			mounted() {
				this.$nextTick(()=>{
					 $(".game_details_intro").each(function() {
						 var topc = $(this).find(".top");
						 topc.click(function() {
							var t = $(this).next(".togg_con"),
								p = $(this).parent(),
								nextC =$(this).parent().siblings();
							if(p.hasClass("game_hover")){
								p.removeClass("game_hover");
							}else{
								p.addClass("game_hover");
								if(nextC.hasClass("game_hover")){
									nextC.removeClass("game_hover");
								}
							}

						 })
					 });
				})
			}

	}
</script>
