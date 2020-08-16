<template>
  <basicmap></basicmap>
</template>
<script>
  import 'ol/ol.css'
  import TileLayer from 'ol/layer/Tile'
  import VectorLayer from "ol/layer/Vector"
  import VectorSource from "ol/source/Vector"
  // import View from 'ol/View'
  // import Map from 'ol/Map'
  import {
    Map,
    View,
    Feature,
    ol
  } from "ol";
  import {
    Style,
    Stroke,
    Fill,
    Icon
  } from "ol/style";
  import {
    Point,
    Polygon,
    MultiPolygon
  } from "ol/geom";
  import {
    defaults as defaultControls,
    OverviewMap
  } from 'ol/control'
  import WMTS from 'ol/source/WMTS'
  import WMTSTileGrid from 'ol/tilegrid/WMTS'
  import {
    get as getProjection
  } from 'ol/proj'
  import {
    fromLonLat
  } from "ol/proj";
  import {
    getWidth,
    getTopLeft
  } from 'ol/extent'

  import basicmap from '../map/basicMap'
  export default {
    data() {
      return {
        map: null,
        pointLayer: null,
        featuresArr: []
      }
    },
    mounted() {
      this.map=this.$store.state.map
      let coordinates = [{
          x: "113.066812",
          y: "33.866359",
          type: "lv"
        },
        {
          x: "112.906703",
          y: "33.740325",
          type: "bule"
        },
        {
          x: "112.845336",
          y: "34.167408",
          type: "lv"
        },
        {
          x: "112.889885",
          y: "33.901538",
          type: "bule"
        },
        {
          x: "113.299061",
          y: "33.737579",
          type: "lv"
        }
      ];
      this.addPoints(coordinates); //根据坐标点批量打点
    },
    methods: {
      /**
       * 批量根据经纬度坐标打点
       */
      addPoints(coordinates) {
        // 设置图层
        this.pointLayer = new VectorLayer({
          source: new VectorSource()
        });
        // 添加图层
        this.map.addLayer(this.pointLayer);
        // 循环添加feature
        for (let i = 0; i < coordinates.length; i++) {
          // 创建feature，一个feature就是一个点坐标信息
          let feature = new Feature({
            geometry: new Point(
              [coordinates[i].x, coordinates[i].y]
            )
          });
          feature.setStyle(this.getIcon(coordinates[i].type));
          this.featuresArr.push(feature);
        } // for 结束
        // 批量添加feature
        this.pointLayer.getSource().addFeatures(this.featuresArr);
      },
      getIcon(type) {
        let src = "";
        type == "bule" ?
          (src = require("../../assets/img/logo.png")) :
          (src = require("../../assets/img/locationMap.png"));
        var styleIcon = new Style({
          // 设置图片效果
          image: new Icon({
            src: src,
            anchor: [1, 1],
            scale:0.2,
          })
        });
        return styleIcon;
      }

    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
