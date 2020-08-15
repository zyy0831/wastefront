<template>
  <div id="home">
    <!--step3 这里我们就可以用引入的HomeMap组件了,大小写用破折号 -->
    <home-map></home-map>
  </div>
</template>

<script>
  // step2 首先引入局部组件
  import HomeMap from './basicMap'
  export default {
    name: 'Home',
    // step1 需要声明局部组件
    components: {
      HomeMap: HomeMap
    }
  }

</script>

<style scoped>
  #home {
    height: 100%;
    width: 100%;
  }

</style>
