<template>
      <el-row >
        <el-col :sm="8" :md="8" :lg="6" span="8">
          <!-- <span style="height:80%;letter-spacing:3px; float: left;margin-left:10px; margin-top:20px;color:#fff;font-size:25px;font-weight:bold;font-family:Tahoma;font-style:normal;">建筑垃圾监测识别系统</span> -->
          <!-- <img src="../../../../src/assets/img/logo12.png" id="photo" alt="logo" style="width:280px;margin-top:5px;margin-bottom:0px;"> -->
          <img src="../../../assets/img/title2.png" id="photo" alt="logo" >
         
        </el-col>
        <el-col span="8" offset="0" style="width:100%">
<p class="title">建筑垃圾监测识别系统</p>
 <div class="mid">
            <iframe width="600" scrolling="no" height="20" frameborder="0" allowtransparency="true"
                    src="https://i.tianqi.com?c=code&id=78&color=%23FFFFFF&icon=1&site=18"></iframe>
        </div>
        </el-col>
        <el-col span="8" :sm="5" :md="5" :lg="10" offset="1">
          <el-dropdown trigger="hover" @command="handleCommand" style="top:20px;">
            <span style=" margin-top:10px;color:#fff;font-size:18px;">示范城市选择：{{selectCity}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown" style="background: #003270;">
              <el-dropdown-item command="pdsCity" class="action" style="color:	#FFFFFF;">平顶山</el-dropdown-item>
              <el-dropdown-item command="szCity" class="action" style="color:	#FFFFFF;"> 深圳</el-dropdown-item>
               <el-dropdown-item command="sqCity" class="action" style="color:	#FFFFFF;"> 商丘</el-dropdown-item>
               <el-dropdown-item command="jnCity" class="action" style="color:	#FFFFFF;"> 济宁</el-dropdown-item>
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
        } else if(para=='sqCity') {
           this.selectCity = '商丘';
          this.$store.state.mainPoint = [115.650497, 34.437054];
        }
        else if(para =='jnCity'){
          this.selectCity='济宁市'
          this.$store.state.mainPoint=[116.587245,35.415393]
        }
        else{
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
  .photo{
    position: absolute;
    z-index: -20;
    border:0; 
  }
          .mid {
            width: 300px;
            position: fixed;
            top: 20px;
            right:200px;
            font-size:20px;
        }
.title{
  width: 100%;
  height: 20%;
  color: #fff;
  font-size: 40px;
  margin-top: 1.5%;
  letter-spacing:10px;
  text-shadow:2px 2px 4px #000000;
}
 /* .titleHead{
 
/* position: absolute; */
/* margin-top: px; */

 /* } */ */
 .action:hover {
                background-color: #006cfc!important;
            }
</style>
