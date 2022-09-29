// https://router.vuejs.org/zh/
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入路由组件
import mock from '@/views/mock/index.vue'
// const menu = () => import('@/views/menu/index.vue')
const list = () => import('@/views/menu/list/index.vue')
const productDetail = () => import('@/views/menu/detail/index.vue')
const order = () => import('@/views/order/order.vue')
const checkout = () => import('@/views/order/checkout/index.vue')
const favor = () => import('@/views/favor/favor.vue')
NProgress.configure({ showSpinner: true })

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    redirect: '/menu',
  },
  {
    path: '/mock',
    name: 'mock',
    component: mock,
  },
  {
    path: '/menu',
    name: 'menu',
    component: list,
  },
  {
    path: '/menu/detail/:id',
    name: 'productDetail',
    component: productDetail,
    meta: {
      hideTabBar: true,
    },
  },
  {
    path: '/order/checkout',
    name: 'orderCheck',
    component: checkout,
    meta: {
      hideTabBar: true,
    },
  },
  {
    path: '/order',
    component: order,
  },
  {
    path: '/favor',
    component: favor,
  },
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 引入所有views下.vue文件
// const modules = import.meta.glob("../views/**/**.vue")

// export const routerPackag = function (routers: any) {
//   if (routers) {
//     routers.filter((itemRouter: any) => {
//       if (itemRouter.component != "Layout") {
//         router.addRoute("home", {
//           path: `${itemRouter.path}`,
//           name: itemRouter.name,
//           meta: {
//             title: itemRouter.name,
//           },
//           component:
//             modules[/* @vite-ignore */ `../views/${itemRouter.component}`],
//         })
//       }
//       if (itemRouter.children && itemRouter.children.length) {
//         routerPackag(itemRouter.children)
//       }
//       return true
//     })
//   }
// }

// const loadView = (view) => {
//   // 路由懒加载
//   return () => import(`@/${view}`)
// }

// 导出路由实例，并在 `main.ts` 挂载
export default router
