// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import qs from 'qs'
import store from './store/city'
// 使用ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$http = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

