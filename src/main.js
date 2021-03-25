// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
import 'babel-polyfill'
import router from './router'

import Toast from './tool/toast'
import { ylGetStore, ylRemoveStore } from './tool/tools'
import infiniteScroll from 'vue-infinite-scroll'

// import VueLoading from 'vue-loading-template'


Vue.use(infiniteScroll)
Vue.use(Toast)
// Vue.use(VueLoading, /** options **/)
Vue.config.productionTip = false


/* eslint-disable no-new */
window._vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
