<template>
  <div id="infoCss">
    <div class="air">
      <el-collapse v-model="activeName">
        <el-collapse-item title="城市基本信息" name="1">
          <el-form ref="form" :model="form">
            <el-row>
              <el-form-item prop="year" label="上报年份" style="width: 91%;">
                <el-input placeholder v-model="form.year" style="width: 55%;" :disabled="Dis">
                  <template slot="append">年</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="peo" label="人口">
                <el-input placeholder v-model="form.peo" style="width: 50%;" :disabled="Dis">
                  <template slot="append">百万人</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="area" label="面积">
                <el-input placeholder v-model="form.area" style="width: 50%;" :disabled="Dis">
                  <template slot="append">平方公里</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="gdp" label="GDP">
                <el-input placeholder v-model="form.GDP" style="width: 50%;" :disabled="Dis">
                  <template slot="append">亿</template>
                </el-input>
              </el-form-item>
            </el-row>
             <el-row>
              <el-form-item prop="jcmj" label="建成区面积" style="width: 88%;">
                <el-input placeholder v-model="form.jcmj" style="width: 58%;" :disabled="Dis">
                  <template slot="append">平方公里</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="jzmj" label="建筑物面积" style="width: 88%;">
                <el-input placeholder v-model="form.jzmj" style="width: 58%;" :disabled="Dis">
                  <template slot="append">万平方米</template>
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="建筑垃圾核心信息" name="2">
          <el-form :model="form">
            <el-row>
              <el-form-item prop="landfillNum" label="填埋场数量">
                <el-input
                  placeholder
                  v-model="form.landfillNum"
                  style="width: 50%;"
                  :disabled="Dis"
                >
                  <template slot="append">座</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="ljcsl" label="垃圾产生量">
                <el-input
                  placeholder
                  v-model="form.ljcsl"
                  style="width: 50%;"
                  :disabled="Dis"
                >
                  <template slot="append">万方</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="ljzcl" label="垃圾总存量">
                <el-input
                  placeholder
                  v-model="form.ljzcl"
                  style="width: 50%;"
                  :disabled="Dis"
                >
                  <template slot="append">万方</template>
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
import basicmap from "../map/basicMap";
import * as cityInfoAPI from "../../api/CityInfo";
export default {
  data() {
    return {
      activeName: "1",
      Dis: true,
      form: {
        year: "",
        peo: "",
        area: "",
        GDP: "",
        jcmj: "",
        jzmj: "",
        landfillNum: "",
        ljcsl: "",
        ljzcl: "",
      },
      curCity: {
        city: "", // 参数 firstName
      },
    };
  },
  computed: {
    listenCity() {
      return this.$store.state.city;
    },
  },
  created() {
    this.getInfo(this.$store.state.city);
  },
  watch: {
    listenCity: function (old, newd) {
      // console.log('old'+old);
      this.getInfo(old);
    },
  },
  methods: {
    getInfo(city) {
      this.curCity.city = city;
      cityInfoAPI.getCityInfo(this.curCity).then((res) => {
        this.form = res.data[0];
        console.log(this.form);
      });
    },
  },
  components: {
    basicmap: basicmap,
  },
};
</script>
<style scoped>
#infoCss {
  height: 100%;
  width: 100%;
}

.air {
  z-index: 999;
  width: 18%;
  top: 12%;
  right: 3%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 0.9;
  border-style: solid;
  border-width: 5px;
  background-color: paleturquoise;
  border-color: rebeccapurple;
  font-style:oblique;
  font-weight:700;
  text-align: center;
   
}
</style>
