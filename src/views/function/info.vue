<template>
  <div id="infoCss">
    <div class="air">
      <el-collapse v-model="activeName">
        <el-collapse-item title="城市基本信息" name="1">
          <el-form :model="cityInfoForm">
            <el-row>
              <el-form-item prop="people" label="人口">
                <el-input placeholder="" v-model="cityInfoForm.people" style="width: 50%;" :disabled="Dis">
                  <template slot="append">百万人</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="area" label="面积">
                <el-input placeholder="" v-model="cityInfoForm.area" style="width: 50%;" :disabled="Dis">
                  <template slot="append">平方公里</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="gdp" label="GDP">
                <el-input placeholder="" v-model="cityInfoForm.gdp" style="width: 50%;" :disabled="Dis">
                  <template slot="append">亿</template>
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="建筑垃圾核心信息" name="2">
          <el-form :model="cityInfoForm">
            <el-row>
              <el-form-item prop="landfillNum" label="填埋场数量">
                <el-input placeholder="" v-model="cityInfoForm.landfillNum" style="width: 50%;" :disabled="Dis">
                  <template slot="append">座</template>
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <basicmap></basicmap>
  </div>
</template>
<script>
  import basicmap from '../map/basicMap'
  export default {
    data() {
      return {
        activeName: '1',
        Dis: true,
        cityInfoForm: {
          people: '222',
          area: '222',
          gdp: '222',
          landfillNum: '222',
        }

      }
    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
<style scoped>
  #infoCss {
    height: 100%;
    width: 100%;
  }

  .air {
    z-index: 999;
    width: 15%;
    top: 10%;
    right: 3%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
  }

</style>
