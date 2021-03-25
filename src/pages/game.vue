<template>
  <div class="hwpone_uccn">
		<!-- 头部 -->
		<div class="gameListhead clearfix">
			<!-- <a href="javascript:history.go(-1);" class="backArrow fl"></a> -->
			<div class="innerlogo fl"></div>
		</div>
		<!-- 标题 -->
		<div class="gameListTitle">我玩过的</div>
		<!-- 未登录按钮 -->
		<div class="loginGameBtnWrap" v-if="isLoginShow">
			<router-link :to="{path:'login'}" tag="div" class="loginGameBtn">请先登录</router-link>
		</div>
		<!-- 登录状态 -->
		<!--未玩儿过游戏-->
		<div class="gamePlayedtxt" v-if="paygame.length<=0 && isplayed">暂无您玩过的游戏信息哦~</div>
		<div class="gamePlayedwrap swiper-container" v-if="isplaygameShow && paygame.length>0">
			<div class="gamePlay swiper-wrapper">
				<a @click="gameLink(games.gid)" class="itemList swiper-slide" :key="index" v-for="(games,index) in paygame">
					<img :src="games.pic | handleUrl">
					<span class="oneTextOmit">{{games.gname}} </span>
				</a>
			</div>
			<div class="swiper-pagination gamePlayBtn"></div>
		</div>	
		<div class="gameListTitle ">全部游戏</div>
		
		<div class="allGameListbox">
			<div v-infinite-scroll="getgameList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
				<div class="gameList clearfix" :key="index" v-for="(items,index) in lists">
					<div class="left fl clearfix">
						<div class="img fl"><img :src="items.src | handleUrl"></div>
						<div class="headline fl">
							<div class="subtitle"><span class="t oneTextOmit">{{items.name}}</span><span class="g" @click="giftLink(items.gid)" v-if="items.isExistGift==1">礼包</span></div>
							<p class="des oneTextOmit">{{items.introduction}}</p>
						</div>
					</div>
					<div class="right fr" @click="detailLink(items.gid)">查看</div>
				</div>
				<loadmore :isLoading="busy" v-if="lists.length>0"></loadmore> 
			</div>
		</div>
		<Nav></Nav>
  </div>
</template>

<script>
import {getgamePlayedapi,getgameListapi,getuserInfoapi} from '../backend/api'
import Nav from '../components/nav'
import loadmore from '../components/loadmore'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
export default {
  data(){
		return{
					isLoginShow:false,
					isplaygameShow:true,
					isplayed:false,
					allgames:[],
					paygame:[],
					lists:[],
					busy: false,
					limit:10,
					curPage:1 
		}
	},
	components:{
		 Nav,
		'loadmore': loadmore
	},
	watch:{
		paygame(){
			this.$nextTick(()=>{
				var swiper2 = new Swiper('.gamePlayedwrap', {
					slidesPerView: 5,
					spaceBetween: 0,
					slidesPerGroup: 5,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					onInit: function(swiper) {
						if(parseInt(swiper.slides.length/5) < 1) {
							$(".swiper-pagination").remove()
						}
					}
				});
			})
		}
	},
	methods:{
		getgameList(){
			let self = this
            self.busy = true;
            self.curPage = parseInt(self.lists.length/self.limit) + 1;
			let params = {page:this.curPage};
			getgameListapi(params).then(res=>{
				this.$loading('加载中...', 'close'); 
				self.allgames=res.mes;
				if(self.allgames instanceof Array && self.allgames.length > 0){
					self.allgames.forEach(function(val,index){
						self.lists.push(val);
					});
					self.busy = false;
				}
				if(self.allgames.length <10) {
					self.busy = true;
					self.loadingMsg = '没有更多数据了';
				} 
			}).catch(err =>{    
				this.$loading('加载中...', 'close');          
				console.log(err)
			}) 
		},
		getgamePlayed(){
			var self = this;
			let params = {uid:window.uid};
			getgamePlayedapi(params).then(res=>{
				self.paygame=res.mes;
			}).catch(err =>{             
				console.log(err)
			}) 	
		},
		gameLink(gid){
			 this.$router.push({name: 'gameDetail',query:{gid:gid}});
		},
		detailLink(gid){
			 this.$router.push({name: 'gameDetail',query:{gid:gid}});
		},
		giftLink(gid){
			 this.$router.push({name: 'getgift',query:{gid:gid}});
		},
		whetherLand(){
			this.isplayed = true;
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
					 self.isLoginShow=true;
				}
            }).catch(err=>{
                console.log(err)
            })
        }
	},
	created() {
		this._isLogin(_=>{
			this.whetherLand();
            this.getgamePlayed();
		})	
		 this.$loading('加载中...', 'open');
		this.getgameList();
	},
	filters:{
      handleUrl: function(value) {
            if(value == ''|| value == null){
                return value
            }else{
                return urlConfig.img + value;
            }   
        }
  }

}
</script>
