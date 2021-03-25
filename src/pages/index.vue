<template>
    <div>
      <header>
        <div class="hwTopHeadBox clearfix">
          <div class="logo fl"></div>
					<a class="loginBtn fr" @click="loginstuts">{{logintxt}}<i class="loginIcon" :class="{loginIcon2 : isActive}"></i></a>
          <!-- <a href="" class="loginBtn fr">{{logintxt}}<i class="loginIcon"></i></a> -->
        </div>
        <div class="banner swiper-container" id="banner">
          <div class="swiper-wrapper">
            <a :key="index" v-for="(bannerimg,index) in bannerscroll" :href="bannerimg.href_h5" class="bannerImg swiper-slide"><img :src="bannerimg.src | handleUrl"></a>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </header>
  
      <div class="hwponeContent">
        <div class="title clearfix">
          <div class="tit_l fl">
            <i class="icon"></i>热门推荐
          </div>
          <router-link  :to="{path:'game'}" class="moreBtn fr"> {{moretxt}}> </router-link>
        </div>

        <div class="recomGnameList">
          <ul class="itemWrap clearfix">
            <li class="item fl" :key="index" v-for="(recgame,index) in qualityrecom"><a @click="detailLink(recgame.gid)"><img :src="recgame.logo | handleUrl"><span class="inner_tit oneTextOmit">{{recgame.name}}</span></a></li> 
          </ul>
        </div>

        <div class="title clearfix">
				<div class="tit_l fl">
					<i class="icon icon02"></i>活动推荐
				</div>
				<router-link  :to="{path:'recactivity'}" class="moreBtn fr"> {{moretxt}}> </router-link>
			</div>

      <div class="recomActivityBox clearfix" >
				<div class="leftImg fl"><a @click="activLink(leftbigimg.url,leftbigimg.id)"><img :src="leftbigimg.h5_pic | handleUrl"></a></div>
				<ul class="rightImg fr">
					<li class="itemImg" :key="index" v-for="(recactimg,index) in rightlitimg"><a @click="activLink1(recactimg.url,recactimg.id)"><img :src="recactimg.pic | handleUrl"></a></li>
				</ul>
			</div>

      <!--新闻公告-->
      <div class="newsIndex clearfix">
        <div class="title clearfix">
          <div class="tit_l fl">
            <i class="icon icon13"></i>新闻公告
          </div>
          <router-link  :to="{path:'newsList'}" class="moreBtn fr"> {{moretxt}}> </router-link>
        </div>
        <ul class="listN">
          <li :key="index" v-for="(items,index) in newsList">
            <a @click="newsLink(items.id)">
              <span class="txt">{{items.title}}</span>
              <span class="time">{{items.creat_time}}</span>
            </a>
          </li>
        </ul>
      </div>

			<div class="title clearfix">
				<div class="tit_l fl">
					<i class="icon icon03"></i>新区预告
				</div>
			</div>
      </div>
      
     <!-- 新区预告 -->
			<div class="newForecast">
				<table>
					<thead>
						<tr>
							<th width="25%">游戏</th>
							<th width="35%">区服</th>
							<th width="15%">礼包</th>
							<th width="25%">开服时间</th>
						</tr>
					</thead>
					<tbody>
						<tr :key="index" v-for="(items,index) in serverList">
							<td>{{items.gname}}</td>
							<td>{{items.name}}</td>
							<td class="gift"><a @click="giftLink(items.gid)"></a></td>
							<td>{{items.start_time}}</td>
						</tr>
					</tbody>
				</table>
			</div>
      <div class="contactUsBox clearfix">
				<div class="contactUs fl">
					<div class="contact_title">联系我们</div>
					<a href="tel:020-31600429" class="custpone">客服电话</a>
					<a :href="qqCustom" class="custpone">在线客服</a>
				</div>
				<div class="contactUs fr">
					<div class="contact_title2">自助服务</div>
					<a @click="bindPhone" class="custpone" >绑定手机</a>
				</div>
			</div>
			<Nav></Nav>
   </div>

	

</template>

<script>
import Nav from '../components/nav'
import {apiindex,getuserInfoapi} from '../backend/api'
import {validValue} from '../tool/lite-validator.js'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'
import {Toast} from '../tool/toast.js'

export default {
  data(){
    return{
        logintxt:'请先登录',
        moretxt:'查看更多',
        isActive:false,
        bannerscroll:[],
        qualityrecom:[],
        recactivity:[],
        leftbigimg:[],
        rightlitimg:[],
        serverList:[],
        newsList:[],
        qqCustom:''
    }
  },
  components:{
		Nav,
  },
  methods:{
      getindexaccount(){
          let self = this;
          apiindex({}).then(res=>{
              this.bannerscroll = res.mes.banner
              this.qualityrecom = res.mes.rec_game
              this.recactivity = res.mes.rec_activity
              this.serverList = res.mes.servers
              this.newsList=res.mes.news
              let splarray = res.mes.rec_activity,i;
      console.log( this.newsList)
              for(i in splarray){
                  if(i == 0){
                      this.leftbigimg = splarray[i]
                  }else{
                      this.rightlitimg.push(splarray[i])
                  }
              }

          }).catch(err => {
              console.log(err);
          })
      },
      activLink(url,id){
        if(url){
           $(".leftImg a").attr('href',url);
        }else{
           this.$router.push({name: 'newsdetail',query:{id:id}});
        }
      },
      activLink1(url,id){
        if(url){
           $(".itemImg a").attr('href',url);
        }else{
           this.$router.push({name: 'newsdetail',query:{id:id}});
        }
      },
      bannerLink(gid){
        this.$router.push({name: 'gameDetail',query:{gid:gid}});
      },
      newsLink(id){
         this.$router.push({name: 'newsIndexDetail',query:{id:id}});
      },
      getName(){
           this.logintxt = window.username;
           this.isActive = true
      },
      giftLink(gid){
         this.$router.push({name: 'getgift',query:{gid:gid}});
      },
      detailLink(gid){
        this.$router.push({name: 'gameDetail',query:{gid:gid}});
      },
      bindPhone(){
          var self = this
          getuserInfoapi({}).then(res=>{
              if (res.code == 1) {
                 this.$router.push({path: '/bindPhone'});                      
              }else{
                 this.$router.push({path: '/login'});    
              }
          }).catch(err=>{
              console.log(err)
          })
          
          
      },
      loginstuts(){ 
        if(!window.username){ 
            this.$router.replace({path: '/login'});
        }else{
           this.$router.replace({path: '/mypage'});
        }
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
              }
          }).catch(err=>{
              console.log(err)
          })
      }
      
  },
  watch:{
    bannerscroll(){
				this.$nextTick(()=>{
          var swiper = new Swiper('#banner', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoplay:2000,
            onInit: function(swiper) {
              if(swiper.slides.length == 1) {
                $(".swiper-pagination").remove()
              }
            }
          });
				})
			}
  },
  created() {
     this._isLogin(_=>{
		    this.getName();
    })	
    this.qqCustom=urlConfig.apiSysUrl + '/kf'
  
  },
	mounted() {
    this.getindexaccount();
    // this.$loading('加载中...', 'close');   
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
