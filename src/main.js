// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../config/rem'
import store from './store'
// import allBall from 'components/ball'

import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
Vue.use(MintUI)
import Blob from './excel/Blob'
import Export2Excel from './excel/Export2Excel.js'

// import Mycomponent from 'components/myComPonents'
// Vue.use(Mycomponent)
// import MyComponent from './components/myComponent'

import {Loading,MyButton} from "./components/loading/index"
Vue.use(Loading)
Vue.use(MyButton)
import {
  getHttp,
  postHttp
}
  from './config/api'
Vue.use(MintUI)
// Vue.use(allBall)
// //全局组件
// Vue.component( 'simple-counter', {
//   template: allBall,
//   data () {
//     return {
//       counter: 0
//     }
//   }
// })

// var Profile = Vue.extend({
//   template: '<button v-on:click="show=!show">切换<h1 v-show="show">全局组件的学习</h1></button>',
//   data: function () {
//     return {
//       show: true
//     }
//   }
// })
//  Vue.component('my-component',Profile)


Vue.config.productionTip = false
Vue.prototype.$getHttp = getHttp
Vue.prototype.$postHttp = postHttp
Vue.prototype.$shopUrl = 'http://www.dayujk.cn/'
Vue.prototype.$headerImg = 'https://yjmall.oss-cn-qingdao.aliyuncs.com/'
Vue.prototype.$smallImg = '?x-oss-process=style/xx-compress'
Vue.prototype.$bigImg = '?x-oss-process=style/compress'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 引入store(Vuex框架进行传值)
  store,
  data: {
    eventHub: new Vue()
  },
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
