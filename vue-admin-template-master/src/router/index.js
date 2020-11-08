import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '导航', icon: 'dashboard' }
    }]
  },

  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/showRecommend',
    name: 'Recommend',
    meta: { title: '首页', icon: 'example' },
    children: [
      {
        path: 'showRecommend',
        name: 'ShowRecommend',
        component: () => import('@/views/recommend/index'),
        meta: { title: '推荐列表', icon: 'table' }
      },
      {
        path: 'addRecommend',
        name: 'AddRecommend',
        component: () => import('@/views/recommend/addRecommend'),
        meta: { title: '新建推荐', icon: 'table' }
      },
      {
        path: 'addRecommend/:id',
        name: 'AddRecommend',
        component: () => import('@/views/recommend/addRecommend'),
        props: true
        // meta: { title: '新建推荐', icon: 'table' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/showCategory',
    name: 'About',
    meta: { title: '分类', icon: 'example' },
    children: [
      {
        path: 'showCategory',
        name: 'showCategory',
        component: () => import('@/views/category/index'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'addCategory',
        name: 'addCategory',
        component: () => import('@/views/category/addCategory'),
        meta: { title: '新建分类', icon: 'table' }
      },
      {
        path: 'addCategory/:id',
        name: 'addCategory',
        component: () => import('@/views/category/addCategory'),
        props: true
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/showTag',
    name: 'Tag',
    meta: { title: '标签', icon: 'example' },
    children: [
      {
        path: 'showTag',
        name: 'ShowTag',
        component: () => import('@/views/tag/index'),
        meta: { title: '标签列表', icon: 'table' }
      },
      {
        path: 'addTag',
        name: 'AddTag',
        component: () => import('@/views/tag/addTag'),
        meta: { title: '新建标签', icon: 'table' }
      },
      {
        path: 'addTag/:id',
        name: 'AddTag',
        component: () => import('@/views/tag/addTag'),
        // meta: { title: '新建标签', icon: 'table' },
        props: true
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/showArticle',
    name: 'Article',
    meta: { title: '文章', icon: 'example' },
    children: [
      {
        path: 'showArticle',
        name: 'showArticle',
        component: () => import('@/views/article/index'),
        meta: { title: '文章列表', icon: 'table' }
      },
      {
        path: 'addArticle',
        name: 'AddArticle',
        component: () => import('@/views/article/addArticle'),
        meta: { title: '新建文章', icon: 'table' }
      },
      {
        path: 'addArticle/:id',
        name: 'AddArticle',
        component: () => import('@/views/article/addArticle'),
        props: true
      }
    ]
  },
  {
    path: '/issue',
    component: Layout,
    redirect: '/issue/showIssue',
    name: 'Issue',
    meta: { title: 'issue', icon: 'example' },
    children: [
      {
        path: 'showIssue',
        name: 'showIssue',
        component: () => import('@/views/issue/index'),
        meta: { title: 'issue列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/showUser',
    name: 'User',
    meta: { title: '用户', icon: 'example' },
    children: [
      {
        path: 'showUser',
        name: 'showUser',
        component: () => import('@/views/webUser/index'),
        meta: { title: '用户列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about/showAbout',
    name: 'About',
    meta: { title: '关于', icon: 'example' },
    children: [
      {
        path: 'showAbout',
        name: 'showAbout',
        component: () => import('@/views/about/index'),
        meta: { title: '关于列表', icon: 'table' }
      },
      {
        path: 'addAbout',
        name: 'AddAbout',
        component: () => import('@/views/about/addAbout'),
        meta: { title: '新建关于', icon: 'table' }
      },
      {
        path: 'addAbout/:id',
        name: 'AddAbout',
        component: () => import('@/views/about/addAbout'),
        props: true
      }
    ]
  },
  {
    path: '/experience',
    component: Layout,
    redirect: '/experience/showExperience',
    name: 'Experience',
    meta: { title: '历程', icon: 'example' },
    children: [
      {
        path: 'showExperience',
        name: 'showExperience',
        component: () => import('@/views/experience/index'),
        meta: { title: '历程列表', icon: 'table' }
      },
      {
        path: 'addExperience',
        name: 'AddExperience',
        component: () => import('@/views/experience/addExperience'),
        meta: { title: '新建历程', icon: 'table' }
      },
      {
        path: 'addExperience/:id',
        name: 'AddExperience',
        component: () => import('@/views/experience/addExperience'),
        props: true
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/ddshiyu',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
