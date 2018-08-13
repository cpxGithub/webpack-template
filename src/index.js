import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './app'

Vue.use(VueRouter)

let router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App />'
})