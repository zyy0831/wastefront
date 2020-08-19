<template>
  <basicmap ref="map"></basicmap>
</template>

<script>
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Heatmap as HeatmapLayer } from "ol/layer";
import Proj from "ol/proj/Projection";
import XYZ from "ol/source/XYZ";
import { Map, View, Feature, ol } from "ol";
import { Style, Stroke, Fill } from "ol/style";
import { Polygon, Point } from "ol/geom";
import { defaults as defaultControls } from "ol/control";
import { fromLonLat } from "ol/proj";

import basicmap from "../map/basicMap";

export default {
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      this.map = this.$store.state.map;
    },

    addHeatMap() {
      let colors = ["#2200FF", "#16D9CC", "#4DEE12", "#E8D225", "#EF1616"];
      let hatmapData = [
        { name: "光明区" },
        { name: "光明区" },
        { name: "光明区" },
        { name: "光明区" },
        { name: "南山区" },
        { name: "宝安区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙岗区" },
        { name: "龙华区" },
        { name: "盐田区" },
      ];
      let codeList = {
        光明区: { center: { lng: 113.935895, lat: 22.748816 } },
        南山区: { center: { lng: 113.930476, lat: 22.533013 } },
        宝安区: { center: { lng: 113.88402, lat: 22.555259 } },
        龙岗区: { center: { lng: 114.246899, lat: 22.720968 } },
        龙华区: { center: { lng: 114.045441, lat: 22.696678 } },
        盐田区: {
          center: { lng: 114.236875, lat: 22.556499 },
        },
      };

      this.layer = new HeatmapLayer({
        source: new VectorSource(),
        blur: 30,
        radius: 15,
        gradient: colors,
      });
      this.map.addLayer(this.layer);
      this.AppendFeatures(hatmapData, colors, codeList, 50);
    },
    /**
     * 增加要素至热力图
     */
    AppendFeatures(hatmapData, colors, points, max) {
      for (var i in hatmapData) {
        if (points[hatmapData[i].name]) {
          var coords = points[hatmapData[i].name];
          this.max = max;
          var f = new Feature({
            geometry: new Point([coords.center.lng, coords.center.lat]),
          });
          this.layer.getSource().addFeature(f);
        }
      }
    },
  },
  mounted() {
    this.initMap(); //初始化地图
    this.addHeatMap(); //添加热力图数据
  },
  components: {
    basicmap: basicmap,
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
