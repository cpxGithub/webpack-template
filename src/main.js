// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import App from './App'
import common from './util/common'
import * as filters from './filters'
import './util/rem'
import './assets/styles/common.css'

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
    common.setTitle(to.meta.title)
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
