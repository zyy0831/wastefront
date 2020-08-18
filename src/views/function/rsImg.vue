<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-form class="air" :label-position="labelPosition">
      <el-form-item label="切换遥感影像"></el-form-item>
      <el-form-item label="01">
        <el-checkbox v-model="checked1" @change="show()">tiff1</el-checkbox>
      </el-form-item>
    </el-form>
    <div id="from2">
      <el-table :data="gridData" v-show="isShow">
        <el-table-column width="150" property="date" label="日期"></el-table-column>
        <el-table-column width="100" property="name" label="类别"></el-table-column>
        <el-table-column width="300" property="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import "ol/ol.css";
  import {
    Tile as TileLayer
  } from "ol/layer";
  import {
    TileWMS
  } from "ol/source";
  import basicmap from "../map/basicMap";
  export default {
    data() {
      return {
        labelPosition: "right",
        map: null,
        wmsLayer: null,
        URL1: "http://10.100.18.67:8080/geoserver/cite/wms?service=WMS",
        checked1: false,
        isShow: false,
        gridData: [{
            date: "2016-05-02",
            name: "工程渣土",
            address: "上海市普陀区金沙江路 1518 号",
          },
          {
            date: "2016-05-04",
            name: "工程渣土",
            address: "上海市普陀区金沙江路 1519 号",
          },
          {
            date: "2016-05-01",
            name: "工程渣土",
            address: "上海市普陀区金沙江路 1520 号",
          },
          {
            date: "2016-05-03",
            name: "工程渣土",
            address: "上海市普陀区金沙江路 1521 号",
          },
        ],
      };
    },
    created(){
      this.initMap();
    },
    mounted() {
      this.getWMS();
    },
    methods: {
      initMap() {
        this.map = this.$store.state.map;
      },
      getWMS() {
        (this.wmsLayer = new TileLayer({
          visible: this.checked1,
          source: new TileWMS({
            params: {
              FORMAT: "image/png",
              VERSION: "1.1.0",
              LAYERS: "	cite:20200818",
              TILED: true,
              STYLES: "",
              transparent: true,
              opacity: 1,
            },
            url: this.URL1,
            serverType: "geoserver",
          }),
        })),
        this.map.addLayer(this.wmsLayer);
      },
      show() {
        // this.checked1 = !this.checked1;  不用写 element 自动切换
        console.log("sss")
        this.wmsLayer.setVisible(this.checked1);
        this.isShow = !this.isShow;
      },
    },

    components: {
      basicmap: basicmap,
    },
  };

</script>

<style scoped>
  #shpDiv {
    width: 100%;
    height: 100%;
  }

  .air {
    z-index: 999;
    width: 15%;
    top: 10%;
    right: 3%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
    background-color: white;
  }

  #from2 {
    z-index: 999;
    width: 15%;
    top: 30%;
    right: 3%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
  }

</style>
