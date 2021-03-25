import Vue from 'vue'
import Router from 'vue-router'
import {ylTrim, ylSetStore, ylGetStore} from '../tool/tools.js'

import index from '../pages/index'
import game from '../pages/game'
import recharge from '../pages/recharge'
import gift from '../pages/gift'
import mypage from '../pages/mypage'
import login from '../pages/login'
import register from '../pages/register'
import newsdetail from '../pages/newsdetail'
import recactivity from '../pages/recactivity'
import rechargerecode from '../pages/myinnerpage/rechargerecode'
import mygift from '../pages/myinnerpage/mygift'
import mynews from '../pages/myinnerpage/mynews'
import mystuff from '../pages/myinnerpage/mystuff'
import getgift from '../pages/myinnerpage/getgift'
import gameDetail from '../pages/gameDetail'
import guideDetail from '../pages/guideDetail'
import wxTips from '../pages/wxTips'
import bindPhone from '../pages/myinnerpage/bindPhone'
import bindEmail from '../pages/myinnerpage/bindEmail'
import forgetPass from '../pages/forgetPass'
import phoneLogin from '../pages/phoneLogin'
import newsList from '../pages/newsList'
import newsIndexDetail from '../pages/newsIndexDetail'


Vue.use(Router)

const routes =  new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  mode:'hash',
  routes: [
    { path: '/', redirect: 'index' },
    {
      path: '/index',
      name:'index',
      component:index
    },
    {
      path: '/game',
      name: 'game',
      component: game
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    {
      path: '/gift',
      name: 'gift',
      component: gift
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: mypage,
    },
    {
      path: '/login',
      name: 'login',
      component: login  
    },
    {
      path: '/register',
      name: 'register',
      component: register  
    },
    {
      path: '/rechargerecode',
      name: 'rechargerecode',
      component: rechargerecode
    },
    {
      path: '/mygift',
      name: 'mygift',
      component: mygift
    },
    {
      path: '/mystuff',
      name: 'mystuff',
      component: mystuff
    },
    {
      path: '/mynews',
      name: 'mynews',
      component: mynews
    },
    {
      path: '/getgift',
      name: 'getgift',
      component: getgift
    },
    {
      path: '/newsdetail',
      name: 'newsdetail',
      component: newsdetail
    },
    {
      path: '/recactivity',
      name: 'recactivity',
      component: recactivity
    },{
      path: '/gameDetail',
      name: 'gameDetail',
      component: gameDetail
    },{
      path: '/guideDetail',
      name: 'guideDetail',
      component: guideDetail
    },{
      path: '/wxTips',
      name: 'wxTips',
      component: wxTips
    },{
      path: '/bindPhone',
      name: 'bindPhone',
      component: bindPhone
    },{
      path: '/bindEmail',
      name: 'bindEmail',
      component: bindEmail
    },{
      path: '/forgetPass',
      name: 'forgetPass',
      component: forgetPass
    },{
      path: '/phoneLogin',
      name: 'phoneLogin',
      component: phoneLogin
    },{
      path: '/newsList',
      name: 'newsList',
      component: newsList
    },{
      path: '/newsIndexDetail',
      name: 'newsIndexDetail',
      component: newsIndexDetail
    }
    
  ]
})


export default routes;
