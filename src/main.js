// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs'
import store from './store/city'
// step1：引入 axios
import Axios from 'axios'
// 使用ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$qs = qs           //全局注册，使用方法为:this.qs

// step2：把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求,
// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = Axios
// step3：使每次请求都会带一个 /api 前缀
// Axios.defaults.baseURL = '/api'
// 由于项目中有两个不同的地址需要请求，所以封装的http.js 默认的url不能设置

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

