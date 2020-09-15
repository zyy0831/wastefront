<template>
  <div id="iot">
    <basicmap ref="map"></basicmap>
    <div class="ol-popup" style="width:200px">
      <h3>设施信息展示</h3>
      <el-form :model="facInfoForm" v-show="vis">
        <el-form-item label="名称">
          <span>{{facInfoForm.Name}}</span>
        </el-form-item>
        <el-form-item label="地址">
          <span>{{facInfoForm.location}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{facInfoForm.Attr}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Map, View, Feature, ol } from "ol";
import { Style, Stroke, Fill, Icon } from "ol/style";
import { Point, Polygon, MultiPolygon } from "ol/geom";
import Overlay from "ol/Overlay";

import basicmap from "../map/basicMap";
import * as facAPI from "../../api/facility";

export default {
  data() {
    return {
      map: null,
      pointLayer: null,
      featuresArr: [],
      overlay: null,
      facInfoForm: {
        Name: "",
        lat: "",
        lon: "",
        location: "",
        Attr: "",
      },
      old: "",
      vis: true,
    };
  },
  created() {},
  mounted() {
    this.initMap();
    this.getIotCoord();
    this.addPopup();
  },
  methods: {
    initMap() {
      this.map = this.$store.state.map;
    },
    getIotCoord() {
      facAPI
        .getFacInfo()
        .then((res) => {
          let Coordinates = res.data;
          JSON.stringify(Coordinates);
          this.addPoints(Coordinates); //根据坐标点批量打点
        })
        .catch((err) => console.log(err));
    },

    /**
     * 批量根据经纬度坐标打点
     */
    addPoints(coordinates) {
      console.log(coordinates);
      // 设置图层
      this.pointLayer = new VectorLayer({
        source: new VectorSource(),
      });
      // 添加图层
      this.map.addLayer(this.pointLayer);
      // 循环添加feature
      for (let i = 0; i < coordinates.length; i++) {
        // 创建feature，一个feature就是一个点坐标信息
        let feature = new Feature({
          geometry: new Point([coordinates[i].lon, coordinates[i].lat]),
        });
        feature.setStyle(this.getIcon(coordinates[i].Attr));
        this.featuresArr.push(feature);
      }
      // 批量添加feature
      this.pointLayer.getSource().addFeatures(this.featuresArr);
    },
    getIcon(type) {
      let src = "";
      type == "1"
        ? (src = require("../../assets/img/marker/facBlue.png"))
        : (src = require("../../assets/img/marker/facRed.png"));
      let styleIcon = new Style({
        // 设置图片效果
        image: new Icon({
          src: src,
          anchor: [1, 1],
          scale: 0.15,
        }),
      });
      return styleIcon;
    },
    addPopup() {
      let _that = this;

      /**
       * 添加单击响应函数来处理弹窗动作
       * display popup on click
       */
      _that.map.on("click", function (evt) {
        let coordinate = evt.coordinate;
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (
          feature,
          layer
        ) {
          return feature;
        });
        if (feature && feature.getGeometry().flatCoordinates.length < 3) {
          let coord = feature.getGeometry().flatCoordinates;
          facAPI
            .getFacOneInfo(coord)
            .then((res) => {
              _that.facInfoForm = res.data[0]; //在popup中加载当前要素的具体信息
              _that.checkType(_that.facInfoForm.Attr);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (
          feature &&
          feature.getGeometry().flatCoordinates.length > 3
        ) {
          alert("您点击的是区划边界要素，请放大地图，重新点击");
          _that.facInfoForm = {};
        } else {
          _that.overlay.setPosition(undefined); //设置popup的位置
          _that.facInfoForm = {};
        }
      });
      /**
       * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
       * change mouse cursor when over marker
       */
      _that.map.on("pointermove", function (e) {
        var pixel = _that.map.getEventPixel(e.originalEvent);
        var hit = _that.map.hasFeatureAtPixel(pixel);
        _that.map.getTargetElement().style.cursor = hit ? "pointer" : "";
      });
    },
    checkType(para) {
      console.log(para);
      switch (para) {
        case "0":
          this.facInfoForm.Attr = "填埋场";
          break;
        case "1":
          this.facInfoForm.Attr = "资源化设施";
          break;
      }
    },
  },
  components: {
    basicmap: basicmap,
  },
};
</script>
<style scoped>
#iot {
  height: 100%;
  width: 100%;
}

.ol-popup {
  position: absolute;
  top: 12%;
  right: 5%;
  z-index: 999;
  background-color: white;
  border-style: solid;
  border-width: 2px;
  border-color: #0000ff;
}
</style>
