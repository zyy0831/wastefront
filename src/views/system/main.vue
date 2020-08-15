<template>
  <el-container>
    <!-- 顶栏容器-->
    <el-header class="header-container" style="height:80px">
      <my-header></my-header>
    </el-header>
    <el-container>
      <!-- 侧边栏容器-->
      <el-aside width="200px">
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
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .header-container {
    line-height: 30px;
    -webkit-box-shadow: 0 1px 4px rgba(0, 18, 36, 0.08);
    box-shadow: 0 1px 4px rgba(0, 18, 36, 0.08);
    position: relative;
    vertical-align: middle;
  }

  .el-aside {
    color: #333;
  }

</style>
