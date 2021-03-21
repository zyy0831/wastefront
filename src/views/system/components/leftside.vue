<template>
  <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
  :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
  <div :width="isCollapse ? '150px' : '200px'">
  <div class="toggle-button" @click="toggleCollapse" style="background-color:#414855;font-size:20px;line-height:24px;color:#fff;text-align:center;letter: spacing 0.6em;cursor:pointer;">|||</div>
  <el-menu class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose" style="background: #298ff5;top:10px;" :collapse="isCollapse" >
    <el-menu-item  class="left-action" index="/info" :route="{name:'info'}" style="height:70px">
      <img src="../../../../src/assets/img/城市搜索.png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:20px;font-weight:bold">示范城市</span>
    </el-menu-item>
    
    <el-menu-item class="left-action" index="/RSI" :route="{name:'RSI'}" style="height:70px">
      <img src="../../../../src/assets/img/icon_遥感影像.png" alt="logo">
      <span slot="title"  style="color:	#FFFFFF;font-size:20px;font-weight:bold">遥感影像/监测结果识别</span>
    </el-menu-item>

    <el-menu-item class="left-action" index="/facility" :route="{name:'facility'}" style="height:70px">
     <img src="../../../../src/assets/img/监管数据补录.png"  style="height:40px " alt="logo">
      <span slot="title"  style="color:	#FFFFFF;font-size:20px;font-weight:bold">监管数据</span>
    </el-menu-item>

    <el-menu-item class="left-action" index="/iot" :route="{name:'iot'}" style="height:70px">
      <img src="../../../../src/assets/img/物联网 (2).png" alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:20px;font-weight:bold">物联网监测</span>
    </el-menu-item>

    <el-submenu class="left-action" index="1" >
      <template class="left-action"  slot="title">
        <img src="../../../../src/assets/img/查询 (2).png" alt="logo">
        <span  class="left-action" style="color:	#FFFFFF;font-size:20px;font-weight:bold"> 数据查询</span>
      </template>
           <el-menu-item class="left-action" index="/checkRes" :route="{name:'checkRes'}" style="color:	#FFFFFF;font-size:20px;"> 存量排查
       </el-menu-item>
      <el-menu-item class="left-action" index="/annualData" :route="{name:'annualData'}" style="color:	#FFFFFF;font-size:20px;">年度基础数据</el-menu-item>
      <el-menu-item class="left-action" index="/monitUnit" :route="{name:'monitUnit'}" style="color:	#FFFFFF;font-size:20px;">监管单位</el-menu-item>
      <el-menu-item class="left-action" index="/lawsReg" :route="{name:'lawsReg'}" style="color:	#FFFFFF;font-size:20px;">法律法规</el-menu-item>
    
    </el-submenu>
        <el-submenu class="left-action" index="2" >
      <template class="left-action"  slot="title">
      <img src="../../../../src/assets/img/空间分析.png"  style="height:40px " alt="logo">
        <span  class="left-action" style="color:	#FFFFFF;font-size:20px;font-weight:bold"> 空间分析</span>
      </template>
      <el-menu-item class="left-action" index="/Buffer analysis" :route="{name:'Buffer analysis'}" style="color:	#FFFFFF;font-size:20px;"> 缓冲区分析</el-menu-item>
      <el-menu-item class="left-action" index="/heatmap" :route="{name:'heatmap'}" style="color:	#FFFFFF;font-size:20px;">热力图分析</el-menu-item>
      <el-menu-item class="left-action" index="/Spatial measurement" :route="{name:'Spatial measurement'}" style="color:	#FFFFFF;font-size:20px;">空间量测</el-menu-item>
    </el-submenu>

   <el-menu-item class="left-action" index="/three" :route="{name:'three'}" style="height:70px">
   <img src="../../../../src/assets/img/三维系统.png"  style="height:40px " alt="logo">
      <span slot="title" style="color:	#FFFFFF;font-size:20px;font-weight:bold">三维系统</span>
    </el-menu-item>

   <el-menu-item class="left-action" index="/guangpu" :route="{name:'guangpu'}" style="height:70px">
      <!-- <span slot="title" style="color:	#FFFFFF;font-size:20px;font-weight:bold">光谱库</span> -->
      <img src="../../../../src/assets/img/高光谱影像.png"  style="height:40px " alt="logo">
        <span slot="title" style="color:	#FFFFFF;font-size:20px;font-weight:bold">光谱库</span>
    </el-menu-item>
    
  </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isCollapse:true,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      toggleCollapse(){
        this.isCollapse = !this.isCollapse
      },
    }
  }

</script>
<style scoped>
.left-action{

  background: #414855;
  border-right: 20px;
}

.left-action:hover{
  background-color: #414855;
}

.el-submenu:hover{
        background:  #414855;
        
    }

.el-submenu__title:hover{
        background-color:  #414855;
    }
/* .toggle-button{
  border: solid;
  width: 50px;
  margin-left: 40%;
  background-color: blue;
  /* position: absolute; */
  /* align-items: center; */
/* } */ 
</style>
