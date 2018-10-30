export default[
  {
    path: '/demo',
    name: 'demo',
    meta: { title: 'demo' },
    component: () => import('views/demo/index')
  },
  {
    path: '/map',
    name: 'demoMap',
    meta: { title: 'map' },
    component: () => import('views/demo/map')
  },
  {
    path: '/test',
    name: 'test',
    meta: { title: 'test' },
    component: () => import(/* webpackChunkName: 'test' */ 'views/test')
  },
  {
    path: '/shop/list',
    name: 'shopList',
    meta: { title: 'shopList' },
    component: () => import('views/list')
  },
  {
    path: '/upload',
    name: 'upload',
    meta: { title: 'upload' },
    component: () => import('views/upload')
  }
]
