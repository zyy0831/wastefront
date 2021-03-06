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
      {
        path:'/facility', // 遥感影像
        name:'facility',
        component: () => import('../views/function/facility.vue')
      },
      {
        path:'/iot', // 物联网
        name:'iot',
        component: () => import('../views/function/iot.vue')
      },
      {
        path:'/checkRes', //
        name:'checkRes',
        component: () => import('../views/infoSearch/checkRes.vue')
      },
      {
        path:'/annualData', //
        name:'annualData',
        component: () => import('../views/infoSearch/annualData.vue')
      },
      {
        path:'/monitUnit', //
        name:'monitUnit',
        component: () => import('../views/infoSearch/monitUnit.vue')
      },
      {
        path:'/lawsReg', //
        name:'lawsReg',
        component: () => import('../views/infoSearch/lawsReg.vue')
      },
      {
        path:'/Buffer analysis', //
        name:'Buffer analysis',
        component: () => import('../views/spatial analysis/Buffer analysis.vue')
      },      
      {
        path:'/heatmap', //
        name:'heatmap',
        component: () => import('../views/spatial analysis/heatmap.vue')
      },
      {
        path:'/Spatial measurement', //
        name:'Spatial measurement',
        component: () => import('../views/spatial analysis/Spatial measurement.vue')
      },
      {
        path:'/three', //
        name:'three',
        component: () => import('../views/function/three.vue')
      },
      {
        path:'/guangpu', //
        name:'guangpu',
        component: () => import('../views/function/guangpu.vue')
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
