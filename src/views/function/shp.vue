<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-form class="air" :label-position="labelPosition">
      <el-form-item label="切换遥感影像">
      </el-form-item>
      <el-form-item label="01">
         <el-checkbox v-model="checked1" @change="show()">tiff1</el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "ol/ol.css";
import { Tile as TileLayer } from "ol/layer";
import { TileWMS } from "ol/source";
import basicmap from "../map/basicMap";
export default {
  data() {
    return {
      labelPosition:'right',
      map: null,
      wmsLayer: null,
      URL1: "http://10.100.18.67:8080/geoserver/cite/wms?service=WMS",
      checked1: true,
    };
  },
  mounted() {
    this.initMap();
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
            LAYERS: "	cite:Export_Output",
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
      this.checked1 = !this.checked1;
      this.wmsLayer.setVisible(this.checked1);
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
</style>
