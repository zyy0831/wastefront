<template>
      <el-row >
        <el-col :sm="8" :md="8" :lg="6" >
          <span style="height:80%;letter-spacing:3px; float: left;margin-left:10px; margin-top:20px;color:#fff;font-size:25px;font-weight:bold;font-family:Tahoma;font-style:normal;">建筑垃圾监测识别系统</span>
          <!-- <img src="../../../../src/assets/img/logo12.png" id="photo" alt="logo" style="width:280px;margin-top:5px;margin-bottom:0px;"> -->
        </el-col>
        <el-col :offset="18" :sm="5" :md="5" :lg="10">
          <el-dropdown trigger="hover" @command="handleCommand" style="top:20px;">
            <span style=" margin-top:10px;color:#fff;font-size:18px;">选择城市：{{selectCity}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" style="background: #0078CC;">
              <el-dropdown-item command="pdsCity" class="action" style="color:	#FFFFFF;">平顶山</el-dropdown-item>
              <el-dropdown-item command="szCity" class="action" style="color:	#FFFFFF;"> 深圳</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    height: 50px;
  }
  .el-row{
    height: 100%;
  }
  .el-col{
    height: 100%;
    width: 20%;
    position: absolute;
    float: left;
  }
 /* .titleHead{
 
/* position: absolute; */
/* margin-top: px; */

 /* } */ */
 .action:hover {
                background-color: #006cfc!important;
            }
</style>
