import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
console.log(process.env)
console.log(VERSION)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})