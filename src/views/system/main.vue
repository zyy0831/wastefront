<template>
  <el-container class="all">
    <!-- 顶栏容器-->
    <el-header  style="height: 100px;">
      <my-header></my-header>
    </el-header>
    <!-- <el-col style="background-color:rgb(2, 2, 0);width: 100%;height:0px;"></el-col> -->
    <el-container style="padding: 0px;margin: 0px; height: 100%; ">
      <!-- 侧边栏容器-->
      <el-aside width="auto">
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
    /* background-color: #0078CC; */
    line-height: 100%;
    width:100%;
    padding: 0;
    background-image: linear-gradient(#0087CF, #006AC9);
  }

  .el-aside {
    /* width: 150px; */
    background-color: #003270;
    /* box-shadow: 0 0 15px #414855; */
   
  }
 .el-main{

   padding:0;
   width: 100%;
 }
</style>
