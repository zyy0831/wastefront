import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let store=new Vuex.Store({
  state:{
    // count:1,
    mainPoint:[114.052857, 22.545676],
    map:'',
  }

})
export default store
