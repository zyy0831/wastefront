<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-form class="airRight" :label-position="labelPosition">
      <el-form-item label="切换遥感影像"></el-form-item>
      <el-form-item label="01">
        <el-checkbox v-model="checked1" @change="show()">tiff1</el-checkbox>
      </el-form-item>
    </el-form>
    <el-form class="airLeft" :label-position="labelPosition" :model="form">
      <!-- <el-form-item label="名称" class="good">
        <p>{{name}}</p>
      </el-form-item>
      <el-form-item label="面积" class="good">
        <p>{{area}}</p>
      </el-form-item>-->
      <el-form-item label="地址">
        <el-input v-model="form.Address"></el-input>
      </el-form-item>
      <el-form-item label="面积">
        <el-input v-model="form.Area"></el-input>
      </el-form-item>
      <el-form-item label="个数">
        <el-input v-model="form.Id"></el-input>
      </el-form-item>
      <el-form-item label="编号">
        <el-input v-model="form.Num"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.Type"></el-input>
      </el-form-item>
      <el-form-item label="体积">
        <el-input v-model="form.Vol"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.Remake"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "ol/ol.css";
import { Tile as TileLayer } from "ol/layer";
import { TileWMS } from "ol/source";
import basicmap from "../map/basicMap";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Map, View, Feature, ol } from "ol";
import { Style, Stroke, Fill, Icon } from "ol/style";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import { circular } from "ol/geom/Polygon";
import Overlay from "ol/Overlay";
export default {
  data() {
    return {
      labelPosition: "right",
      map: null,
      layer_wms_tiff: null,
      layer_wms_shp: null,
      url_geoser: "http://10.100.18.67:8080/geoserver/cite/wms?service=WMS",
      checked1: true,
      form: {
        Address: "", //地址
        Area: "", //面积
        Id: "", //编号
        Num: "", //编号
        Remake: "", //备注
        Type: "", //类型
        Vol: "", //体积
      },
    };
  },
  mounted() {
    this.initMap();
    this.getWMS_tiff();
    this.getWMS_shp();
  },
  methods: {
    getWMS_shp() {
      (this.layer_wms_shp = new TileLayer({
        visible: this.checked1,
        source: new TileWMS({
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.0",
            LAYERS: "	cite:0820-5",
            TILED: true,
            STYLES: "",
            transparent: true,
            opacity: 1,
          },
          url: this.url_geoser,
          serverType: "geoserver",
        }),
      })),
        this.map.addLayer(this.layer_wms_shp);
    },
    initMap() {
      this.map = this.$store.state.map;
      this.map.on("click", this.mapClick);
    },
    getWMS_tiff() {
      (this.layer_wms_tiff = new TileLayer({
        visible: this.checked1,
        source: new TileWMS({
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.0",
            LAYERS: "	cite:pingdingshan-2",
            TILED: true,
            STYLES: "",
            transparent: true,
            opacity: 1,
          },
          url: this.url_geoser,
          serverType: "geoserver",
        }),
      })),
        this.map.addLayer(this.layer_wms_tiff);
    },
    show() {
      this.checked1 = !this.checked1;
      this.layer_wms_tiff.setVisible(this.checked1);
    },
    mapClick: function (evt) {
      let _that = this;
      // let feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (
      //   feature,
      //   layer
      // ) {
      //   return layer;
      // });
      // // console.log(feature);
      let viewResolution = _that.map.getView().getResolution();
      let url_wms_Shp = _that.layer_wms_shp
        .getSource()
        .getFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:4326", {
          INFO_FORMAT: "application/json",
        });
      // console.log(_that.layer_wms_tiff.get('name'))
      // console.log(url_wms_Shp);
      // console.log(_that.map.getLayers().array_)
      this.$axios({
        method: "get",
        url: url_wms_Shp,
      })
        .then((res) => {
          console.log(res.data.features[0].properties);
          this.form = res.data.features[0].properties;
          // this.name = res.data.features[0].properties.name;
          // // console.log(res.data.features[0].geometry.coordinates)
          // this.area = res.data.features[0].properties.area;
        })
        .catch((err) => {
          console.log(err);
        });
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
.airRight {
  z-index: 999;
  width: 15%;
  top: 10%;
  right: 3%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 0.9;
  background-color: white;
}
.airLeft {
  z-index: 999;
  width: 25%;
  height: 80%;
  top: 10%;
  right: 59%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 0.9;
  background-color: white;
}
</style>