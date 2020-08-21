<template>
  <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
  :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
  <el-menu class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" style="background: #298ff5;top:10px;">
    <el-menu-item class="left-action" index="/info" :route="{name:'info'}" style="height:70px">
      <img src="../../../../src/assets/img/城市搜索.png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">示范城市</span>
    </el-menu-item>
    <el-menu-item class="left-action" index="/RSI" :route="{name:'RSI'}" style="height:70px">
      <img src="../../../../src/assets/img/icon_遥感影像.png" alt="logo">
      <span slot="title"  style="color:	#FFFFFF;font-size:25px;font-weight:bold">遥感影像/监测结果识别</span>
    </el-menu-item>
    <el-menu-item class="left-action" index="/4-2" style="height:70px">
      <img>
      <span slot="title"  style="color:	#FFFFFF;font-size:25px;font-weight:bold">监管数据</span>
    </el-menu-item>
    <el-menu-item class="left-action" index="/heatmap" :route="{name:'heatmap'}" style="height:70px">
      <img src="../../../../src/assets/img/热力图.png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">热力图</span>
    </el-menu-item>
    <el-menu-item class="left-action" index="/iot" :route="{name:'iot'}" style="height:70px">
      <img src="../../../../src/assets/img/物联网 (2).png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:25px;font-weight:bold">物联网监测</span>
    </el-menu-item>
    <el-submenu class="left-action" index="1" style="height:70px">
      <template class="left-action"  slot="title">
        <img src="../../../../src/assets/img/查询 (2).png" alt="logo">
        <span  class="left-action" style="color:	#FFFFFF;font-size:25px;font-weight:bold"> 数据查询</span>
      </template>
      <el-menu-item class="left-action" index="/checkRes" :route="{name:'checkRes'}" style="color:	#FFFFFF;font-size:20px;"> 存量排查
       </el-menu-item>
      <el-menu-item class="left-action" index="/annualData" :route="{name:'annualData'}" style="color:	#FFFFFF;font-size:20px;">年度基础数据</el-menu-item>
      <el-menu-item class="left-action" index="/monitUnit" :route="{name:'monitUnit'}" style="color:	#FFFFFF;font-size:20px;">监管单位</el-menu-item>
      <el-menu-item class="left-action" index="/lawsReg" :route="{name:'lawsReg'}" style="color:	#FFFFFF;font-size:20px;">法律法规
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
.left-action{

  background: #208af5;
}

.left-action:hover{
  background-color: #409EFF;
}

.el-submenu:hover{
        background:  #409EFF;
    }

.el-submenu__title:hover{
        background-color:  #409EFF;
    }
</style>
