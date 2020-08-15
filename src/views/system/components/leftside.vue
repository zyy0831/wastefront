<template>
  <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item>
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
