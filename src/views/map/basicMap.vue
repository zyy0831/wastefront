<template>
  <div id="map">
  </div>
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


  import szNoSub from '../../assets/geoJson/shenzhenNoSub.json'
  export default {
    name: 'OlMap',
    data() {
      return {
        map: null,
        view: null,
        areaLayer: null,
        mapCenter: this.$store.state.mainPoint, //地图中心点，默认——平顶山
        mapZoom: 8,
        // [114.052857, 22.545676] 深圳

        pointLayer: null,
        featuresArr: []
      }
    },
    computed: {
      listenPoint() {
        return this.$store.state.mainPoint;
      }
    },
    mounted() {
      this.loadMap();
      this.addArea(szNoSub); //添加区域图层方法

      let coordinates = [{
          x: "106.918082",
          y: "31.441314",
          type: "lv"
        },
        {
          x: "86.36158200334317",
          y: "41.42448570787448",
          type: "bule"
        },
        {
          x: "89.71757707811526",
          y: "31.02619817424643",
          type: "lv"
        },
        {
          x: "116.31694544853109",
          y: "39.868508850821115",
          type: "bule"
        },
        {
          x: "103.07940932026341",
          y: "30.438580338450862",
          type: "lv"
        }
      ];
      // this.addPoints(coordinates);//根据坐标点批量打点
    },
    watch: {
      listenPoint: function (old, newd) {
        // this.mapCenter = old;
        this.changeCity(old);
      }
    },
    methods: {
      loadMap() {
        //渲染地图
        let projection = getProjection('EPSG:4326');
        let projectionExtent = projection.getExtent();
        let size = getWidth(projectionExtent) / 256;
        let resolutions = new Array(18);
        let matrixIds = new Array(18);
        for (let z = 1; z < 19; ++z) {
          resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = z;
        }
        let webKey = 'eafe0dbc50fbfa0fbd5f22e5f1fad360';
        let wmtsUrl_1 = 'http://t0.tianditu.gov.cn/vec_c/wmts?tk='; //矢量底图
        let wmtsUrl_2 = 'http://t0.tianditu.gov.cn/cva_c/wmts?tk='; //矢量注记
        this.view = new View({
          center: this.mapCenter,
          projection: projection,
          zoom: this.mapZoom
        });
        this.map = new Map({
          layers: [
            new TileLayer({
              opacity: 0.7,
              source: new WMTS({
                url: wmtsUrl_1 + webKey,
                layer: 'vec',
                matrixSet: 'c',
                format: 'tiles',
                style: 'default',
                projection: getProjection('EPSG:4326'),
                tileGrid: new WMTSTileGrid({
                  origin: getTopLeft(projectionExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds
                }),
                wrapX: true
              })
            }),
            new TileLayer({
              opacity: 0.7,
              source: new WMTS({
                url: wmtsUrl_2 + webKey,
                layer: 'cva',
                matrixSet: 'c',
                format: 'tiles',
                style: 'default',
                projection: getProjection('EPSG:4326'),
                tileGrid: new WMTSTileGrid({
                  origin: getTopLeft(projectionExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds
                }),
                wrapX: true
              })
            })
          ],
          target: 'map',
          view: this.view,
          controls: defaultControls({
            attribution: true,
            attributionOptions: {
              collapsible: true,
            },
            rotate: true,
            rotateOptions: {
              tipLabel: '重置标签',
            },
            zoom: true,
            zoomOptions: {
              zoomInTipLabel: '放大',
              zoomOutTipLabel: '缩小',
            }
          })
        });
        this.$store.state.map = this.map;
      },
      changeCity(xy) {
        // console.log(xy)
        this.view.setCenter(xy);
      },
      /**
       * 设置区域
       */
      addArea(geo = []) {
        if (geo.length == 0) return false;
        let areaFeature = null;
        // 设置图层
        this.areaLayer = new VectorLayer({
          source: new VectorSource({
            features: []
          })
        });
        // 添加图层
        this.map.addLayer(this.areaLayer);
        geo.forEach(g => {
          let lineData = g.features[0];
          if (lineData.geometry.type == "MultiPolygon") {
            areaFeature = new Feature({
              geometry: new MultiPolygon(
                lineData.geometry.coordinates
              )
            });
          } else if (lineData.geometry.type == "Polygon") {
            areaFeature = new Feature({
              geometry: new Polygon(
                lineData.geometry.coordinates
              )
            });
          }
        });
        areaFeature.setStyle(
          new Style({
            // fill: new Fill({
            //   color: "#4e98f444"
            // }),
            stroke: new Stroke({
              width: 3,
              color: [71, 137, 227, 1],
              lineDash: [4],
            })
          })
        );
        this.areaLayer.getSource().addFeatures([areaFeature]);
      },
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
            anchor: [1, 1]
          })
        });
        return styleIcon;
      }

    },


  }

</script>
<style>
  #map {
    height: 100%;
    width: 100%;
  }

</style>
