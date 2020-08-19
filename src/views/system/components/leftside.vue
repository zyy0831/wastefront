<template>
  <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
  :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
  <el-menu class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" style="background: #298ff5;top:10px;">
    <el-menu-item index="/info" :route="{name:'info'}" style="height:70px">
      <img src="../../../../src/assets/img/城市搜索2 (1).png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">城市信息</span>
    </el-menu-item>
    <el-menu-item index="/RSI" :route="{name:'RSI'}" style="height:70px">
      <i class="el-icon-picture"></i>
      <span slot="title"  style="color:	#FFFFFF;font-size:25px;font-weight:bold">遥感影像</span>
    </el-menu-item>
    <el-menu-item index="/shp" :route="{name:'shp'}" style="height:70px">
      <i class="el-icon-setting"></i>
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">矢量</span>
    </el-menu-item>
    <el-menu-item index="/heatmap" :route="{name:'heatmap'}" style="height:70px">
      <i class="el-icon-setting"></i>
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">热力图</span>
    </el-menu-item>
    <el-menu-item index="/iot" :route="{name:'iot'}" style="height:70px">
      <i class="el-icon-setting"></i>
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">物联网监测</span>
    </el-menu-item>
    <el-submenu class="text left-action" index="1" style="height:70px">
      <template class="text left-action" slot="title">
        <span class="text left-action" style="color:	#FFFFFF;font-size:25px;font-weight:bold"> 数据查询</span>
      </template>
      <el-menu-item class="text left-action" index="/checkRes" :route="{name:'checkRes'}"> 存量排查
       </el-menu-item>
      <el-menu-item class="text left-action" index="/annualData" :route="{name:'annualData'}">年度基础数据</el-menu-item>
      <el-menu-item class="text left-action" index="/monitUnit" :route="{name:'monitUnit'}">监管单位</el-menu-item>
      <el-menu-item class="text left-action" index="/lawsReg" :route="{name:'lawsReg'}">法律法规
      </el-menu-item>
    </el-submenu>
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
<style scoped>
.el-menu-item:hover {
  background-color: #409EFF !important;
}
.el-submenu:hover {
  background-color: #409EFF !important;
}
</style>
