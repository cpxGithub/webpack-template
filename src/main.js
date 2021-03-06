import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './router'
import App from './App'
import * as filters from './filters'
import './assets/styles/common.css'

Vue.use(ElementUI)

// webpack 动态加载（import）polyfill
require('es6-promise').polyfill()

Vue.use(VueRouter)

// 过滤器注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

// 设置title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
