import Vue from 'vue'
import Router from 'vue-router'
// import publicComment from '../pages/publicComment'
// import showImage from '../pages/showImage'
import home from '../pages/ani'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
