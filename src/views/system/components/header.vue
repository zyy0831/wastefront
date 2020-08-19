<template>
      <el-row >
        <el-col :sm="8" :md="8" :lg="8" >
          <img src="../../../../src/assets/img/logo12.png" alt="logo">
        </el-col>
        <el-col :offset="8" :sm="5" :md="5" :lg="5">
          <el-dropdown trigger="hover" @command="handleCommand" style="top:35px;">
            <span style="color:#fff;font-size:20px;font-weight:bold">选择城市：{{selectCity}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" style="background: #409EFF ;">
              <el-dropdown-item command="pdsCity" class="action" style="color:	#FFFFFF;">平顶山</el-dropdown-item>
              <el-dropdown-item command="szCity" class="action" style="color:	#FFFFFF;"> 深圳</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        
        <el-col :sm="3" :md="3" :lg="3" >
          <img src="../../../../src/assets/img/timg.jpg" alt="logo">
        </el-col>
      </el-row>
</template>
<script>
  export default {
    data() {
      return {
        headerImg: require('../../../../src/assets/img/locationMap.png'),
        selectCity: '深圳市',
      }
    },
    methods:{
      handleCommand(para) {
        if (para == 'pdsCity') {
          this.selectCity = '平顶山市';
          this.$store.state.mainPoint = [113.186303, 33.767782];
          // console.log(this.$store.state.mainPoint);
        } else if (para == 'szCity') {
          this.selectCity = '深圳市';
          this.$store.state.mainPoint = [114.052857, 22.545676];
        } else {
          return;
        }
      },

    }
  };

</script>
<style scoped>
  
  .image>img{
    width:100%;
    height: 88px;
  }
 
 .action:hover {
                background-color: #006cfc!important;
            }
</style>
