<template>

  <div id="infoCss" >
    <div class="button1" >
  <el-row  :gutter="0.5" >
   <el-col :span="12">
     <el-button type="info" icon="el-icon-s-flag" @click="toShowCity">城市基本信息  </el-button>
           </el-col>
          <el-col :span="12">
     <el-button type="info" icon="el-icon-s-home" @click="toshowLj">建筑垃圾核心信息</el-button>
      </el-col>
 </el-row>
</div>
    <!-- <el-button type="primary" @click="toshow()">城市信息</el-button> -->
  
    <div class="air" v-show="show" v-drag>
       
    <el-row style="background-color:#C7C8CA;margin-bottom:20px;height:50px">
        <span style="font-size:25px;background-color:#C7C8CA;width:200px;align:center;position:absolute;margin-top:10px;margin-left:-100px;">城市基本信息</span>
       </el-row>
         <el-form ref="form" :model="form" >
            <el-row>
              <el-form-item prop="year" label="上报年份" class="el-form-item_lable" style="width: 100%; ">
                <el-input placeholder v-model="form.year" style="width: 55%;" :disabled="Dis">
                  <template slot="append">年</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="peo" label="人口" class="el-form-item_lable" style="width: 108%;">
                <el-input placeholder v-model="form.peo" style="width: 51.5%;" :disabled="Dis">
                  <template slot="append">百万人</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="area" label="面积" class="el-form-item_lable" style="width: 108%;">
                <el-input placeholder v-model="form.area" style="width:51.5%;" :disabled="Dis">
                  <template slot="append">平方公里</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="gdp" label="GDP" class="el-form-item_lable"  style="width: 107%;">
                <el-input placeholder v-model="form.GDP" style="width: 51.6%;" :disabled="Dis">
                  <template slot="append">亿</template>
                </el-input>
              </el-form-item>
            </el-row>
             <el-row>
              <el-form-item prop="jcmj" label="建成区面积" class="el-form-item_lable" style="width: 95%;">
                <el-input placeholder v-model="form.jcmj" style="width: 59%;" :disabled="Dis">
                  <template slot="append">平方公里</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="jzmj" label="建筑物面积" class="el-form-item_lable" style="width: 95%;">
                <el-input placeholder v-model="form.jzmj" style="width: 59%;" :disabled="Dis">
                  <template slot="append">万平方米</template>
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
      
       
        
         
    </div>
    <div class="air1" v-show="show1" v-drag>
     
    <el-row style="background-color:#C7C8CA;margin-bottom:50px;height:50px">
        <span style="font-size:25px;background-color:#C7C8CA;width:200px;align:center;position:absolute;margin-top:10px;margin-left:-100px;">建筑垃圾核心信息</span>
       </el-row>
      <el-form :model="form">
            <el-row style="margin-bottom:15px;">
              <el-form-item prop="landfillNum" label="填埋场数量" class="el-form-item_lable">
                <el-input
                  placeholder
                  v-model="form.landfillNum"
                  style="width: 50%;border:none;"
                  :disabled="Dis"
                  class="paperview-input-text"
                >
                  <template slot="append">座</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row style="margin-bottom:15px;">
              <el-form-item prop="ljcsl" label="垃圾产生量" class="el-form-item_lable">
                <el-input
                  placeholder
                  v-model="form.ljcsl"
                  style="width: 50%;"
                  :disabled="Dis"
                  class="paperview-input-text"
                >
                  <template slot="append">万方</template>
                </el-input>
              </el-form-item>
            </el-row>
            <el-row style="margin-bottom:15px;">
              <el-form-item prop="ljzcl" label="垃圾总存量" class="el-form-item_lable">
                <el-input placeholder v-model="form.ljzcl" style="width: 50%;" :disabled="Dis" class="paperview-input-text">
                  <template slot="append">万方</template>
                </el-input>
              </el-form-item>
            </el-row>
          </el-form>
     
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
      show:false,
      show1:false,
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
    toshowLj(){
this.show1 = !this.show1;
    },
    toShowCity(){
      this.show = !this.show;
    },
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
      // 自定义指令
    directives: {
      drag(el, bindings) {
        el.onmousedown = function (e) {
          var disx = e.pageX - el.offsetLeft;
          var disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disx + 'px';
          }
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
          }
        }
      }
    },
};
</script>
<style scoped>
#infoCss {
  height: 100%;
  width: 100%;
}
.el-button--primary{
  z-index: 999;
 position: absolute;
   width: 5%;
  top: 15%;
  right: 0%;
 font-weight: 200;
 background-color: green;
}
.collapse-title{
  color: white;
  font-size: 18px;
  font-weight: 900;
  /*text-indent:10px;*/
   flex: auto; 
   order: 1;
}
/* .paperview-input-text >>> .el-input__inner{
   border: 0px;
}
.el-form-item_lable >>> .el-input__inner{
   border: none;
} */
.el-form-item_lable{
  text-indent:17px;
  font-weight: bolder;
  /* color: white; */
  /* border:none; */
  /* font-size: 20px; */

}
.air1{
  z-index: 999;
  width: 13%;
  height: 40%;
  top: 30%;
    right: 25%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 1;
  
  /* border-style: solid; */
  /* border-width: 3px; */
  background-color: paleturquoise;
  border-color: rebeccapurple;
  /* font-style:oblique; */
  font-weight:normal;
  text-align: center;

   
}
.air {
  z-index: 999;
  width: 15%;
  top: 30%;
  right: 5%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 1;
  /* border-style: solid; */
  border-width: 0px;
  background-color: paleturquoise;
  border-color: rebeccapurple;
  /* font-style:oblique; */
  font-weight:normal;
  text-align: center;
   
}
/* .el-tabs{ */
  /* background-color: greenyellow; */
  /* margin-top: 50px;
  margin-left: 60%;
  z-index: auto; */
  /* display: flex; */
   /* position:absolute;
    background-color:blue; */
    /* opacity：1； */
   /* .el-tab-pane{
     background-color: gainsboro;
   } */
   /* opacity:0.2; */
/* } */
 /* .el-tabs__item.is-active {
    color: #FFDEAD;  
  } */
.button1{
  position: absolute;
  top:10%;
  background-color: blue;
  /* border: solid; */
  left: 80%; 
  width: 17%;
  height: 40px;
  z-index: 999;
 }
 .el-button--info {
    background-color: #367EED;
  border-color:#367EED;
  /* border: size 2px; */
  width: 100%;
  
  
}
/* .el-table{
  position: absolute;
  margin-top: 50px;
  margin-left: 1100px;
  z-index: 999;
} */
</style>
