<template>
  <el-container class="all">
    <!-- 顶栏容器-->
    <el-header  style="height: 88px;">
      <my-header></my-header>
    </el-header>
    <el-container style="padding: 0px;margin: 0px; height: 100%;">
      <!-- 侧边栏容器-->
      <el-aside>
        <my-leftside></my-leftside>
      </el-aside>
      <!-- 主要区域容器 -->
      <el-main>
        <!--路由渲染-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import myHeader from './components/header'
  import myLeftside from './components/leftside'
  export default {
    components: {
      myHeader: myHeader,
      myLeftside: myLeftside,
    },
    data() {
      return {}
    },
    methods: {

    }
  };

</script>
<style>
.all{
   height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
}
  .el-header {
    background: url(../../../src/assets/img/top-bg.png) center center no-repeat;
    line-height: 100%;
    padding: 0;
  }
 
  .el-aside {
    width: 320px;
    background:  #298ff5 ;
    box-shadow: 0 0 15px rgba(105, 105, 105, 0.76); 
  }
 .el-main{

   padding:0;
 }
</style>
