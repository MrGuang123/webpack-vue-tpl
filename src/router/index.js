import Vue from 'vue'
import Router from 'vue-router'

import Test from '../components/test'
const Home = () => import(/* webpackChunkName:"home" */ '@views/home.vue')
const Detail = () => import(/* webpackChunkName:"Detail" */ '@views/detail.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ]
})
