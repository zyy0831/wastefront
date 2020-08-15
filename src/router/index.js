import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/system/main'
Vue.use(VueRouter);

const routes = [
  {
    // 重定向，用来指向一打开网页就跳转到哪个路由
    path: '/',
    redirect: '/main'
  },
  {
    // 首页
    path: '/main',
    name: 'main',
    component:Main,
    children:[// 开始嵌套路由，这下面的所有路由都是Main路由的子路由
      {
        path:'/', // 嵌套路由里默认是哪个网页
        redirect: '/basicmap'
      },
      {
        path:'/basicmap', // 首页的路由
        name:'basicmap',
        component: () => import('../views/map/basicMap.vue')
      },
      {
        path:'/info', // 城市信息
        name:'info',
        component: () => import('../views/function/info.vue')
      },
      {
        path:'/RSI', // 遥感影像
        name:'RSI',
        component: () => import('../views/function/rsImg.vue')
      },
    ]
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
