<template>
      <el-row style="margin: 15px 15px">
        <el-col :sm="24" :md="1" :lg="1">
          <img :src="headerImg" style="height:50px">
        </el-col>
        <el-col :sm="24" :md="5" :lg="5">
          <p class="header-container-p">建筑垃圾识别监测系统</p>
          <p class="header-container-p">System For Identifying And Monitoring Construction Waste</p>
        </el-col>
        <el-col :offset="6" :sm="24" :md="2" :lg="2">
          <el-dropdown trigger="hover" @command="handleCommand">
            <span style="color:#fff;">选择城市：{{selectCity}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="pdsCity">平顶山</el-dropdown-item>
              <el-dropdown-item command="szCity">深圳</el-dropdown-item>
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
        selectCity: null,
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
  .header-container-p {
    margin-top: 0px;
    margin-bottom: 0px;

  }
</style>
