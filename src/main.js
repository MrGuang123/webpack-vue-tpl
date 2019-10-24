import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
console.log(process.env.NODE_ENV)
console.log(process.env.API_BASEURL)
// console.log(VERSION)
// console.log(API_BASEURL)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})