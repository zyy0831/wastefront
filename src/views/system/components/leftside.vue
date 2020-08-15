<template>
<!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
  :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
  <el-menu class="el-menu-vertical-demo":router="true" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/info" :route="{name:'info'}">
        <i class="el-icon-setting"></i>
        <span slot="title">城市信息</span>
      </el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
