<template>
  <div style="height:100%;width:100%">
    <el-button @click="aa()">111222</el-button>
    <el-button @click="bb()">222333</el-button>
  </div>
</template>
<script>
  import * as cityInfoAPI from '../../api/index'
  export default {
    data() {
      return {
        data:{
          city: 'pds', // 参数 firstName
        }
      }

    },
    mounted() {

    },
    methods: {
      bb(){
        cityInfoAPI.getCityInfo(this.data).then(res=>{
          console.log(res)
        })
      },
      aa() {
        this.$axios.post('/cityInfo/get', this.data).then(res => {
          console.log(res)
        })
      }

    }
  }

</script>
