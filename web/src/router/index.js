import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component: () => import('../views/recommend/index')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/recommend/item',
    name: 'Item',
    component: () => import('../views/ganhuo/index.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/blog/index.vue')
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/tools/index.vue')
  },
  {
    path: '/tools/markdown',
    name: 'Markdown',
    component: () => import('../views/tools/markdown.vue')
  },
  {
    path: '/blog/articleDetail',
    name: 'ArticleDetail',
    component: () => import('../views/blog/articleDetail.vue')
  },
  {
    path: '/issue',
    name: 'Issue',
    component: () => import('../views/issue')
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('../views/course')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes
})

export default router
