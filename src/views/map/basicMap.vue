<template>
  <div id="map"></div>
</template>

<script>
  import "ol/ol.css";
  import TileLayer from "ol/layer/Tile";
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";
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
  } from "ol/control";
  import WMTS from "ol/source/WMTS";
  import WMTSTileGrid from "ol/tilegrid/WMTS";
  import {
    get as getProjection
  } from "ol/proj";
  import {
    fromLonLat
  } from "ol/proj";
  import {
    getWidth,
    getTopLeft
  } from "ol/extent";

  import szNoSub from "../../assets/geoJson/shenzhenNoSub.json";
  import p_bf from "../../assets/geoJson/p_bf.json";
  import p_lushan from "../../assets/geoJson/p_lushan.json";
  import p_rz from "../../assets/geoJson/p_rz.json";
  import p_wd from "../../assets/geoJson/p_wd.json";
  import p_wg from "../../assets/geoJson/p_wg.json";
  import p_xh from "../../assets/geoJson/p_xh.json";
  import p_yx from "../../assets/geoJson/p_yx.json";
  import p_sl from "../../assets/geoJson/p_sl.json";
  import p_yxq from "../../assets/geoJson/p_yxq.json";
  import p_zh from "../../assets/geoJson/p_zh.json";
  import sz_baq from "../../assets/geoJson/sz_baq.json";
  import sz_ftq from "../../assets/geoJson/sz_ftq.json";
  import sz_gmq from "../../assets/geoJson/sz_gmq.json";
  import sz_lgq from "../../assets/geoJson/sz_lgq.json";
  import sz_longhq from "../../assets/geoJson/sz_longhq.json";
  import sz_luohq from "../../assets/geoJson/sz_luohq.json";
  import sz_nsq from "../../assets/geoJson/sz_nsq.json";
  import sz_psq from "../../assets/geoJson/sz_psq.json";
  import sz_ytq from "../../assets/geoJson/sz_ytq.json";
  import nosubpds from "../../assets/geoJson/nosubpds.json";
  import j_ning from "../../assets/geoJson/j_ning.json";
  import S_qiu from "../../assets/geoJson/S_qiu.json";
  export default {
    name: "OlMap",
    data() {
      return {
        map: null,
        view: null,
        areaLayer: null,
        mapCenter: this.$store.state.mainPoint, //地图中心点，默认——深圳
        mapZoom: 10,
        // [114.052857, 22.545676] 深圳

        pointLayer: null,
        featuresArr: [],
      };
    },
    computed: {
      listenPoint() {
        return this.$store.state.mainPoint;
      },
    },
    mounted() {
      this.loadMap();
      this.addArea_nu(szNoSub); //添加区域图层方法
      this.addArea_nu(nosubpds);
      this.addArea(p_bf);
      this.addArea(p_lushan);
      this.addArea(p_rz);
      this.addArea(p_sl);
      this.addArea(p_wd);
      this.addArea(p_wg);
      this.addArea(p_xh);
      this.addArea(p_yx);
      this.addArea(p_yxq);
      this.addArea(p_zh);
      this.addArea(sz_baq);
      this.addArea(sz_ftq);
      this.addArea(sz_gmq);
      this.addArea(sz_lgq);
      this.addArea(sz_longhq);
      this.addArea(sz_luohq);
      this.addArea(sz_nsq);
      this.addArea(sz_psq);
      this.addArea(sz_ytq);
      this.addArea(j_ning);
      this.addArea(S_qiu);
      
    },
    watch: {
      listenPoint: function (old, newd) {
        // this.mapCenter = old;
        this.changeCity(old);
      },
    },
    methods: {
      loadMap() {
        //渲染地图
        let projection = getProjection("EPSG:4326");
        let projectionExtent = projection.getExtent();
        let size = getWidth(projectionExtent) / 256;
        let resolutions = new Array(18);
        let matrixIds = new Array(18);
        for (let z = 1; z < 19; ++z) {
          resolutions[z] = size / Math.pow(2, z);
          matrixIds[z] = z;
        }
        let webKey = "eafe0dbc50fbfa0fbd5f22e5f1fad360";
        let wmtsUrl_1 = "http://t0.tianditu.gov.cn/vec_c/wmts?tk="; //矢量底图
        let wmtsUrl_2 = "http://t0.tianditu.gov.cn/cva_c/wmts?tk="; //矢量注记
        this.view = new View({
          center: this.mapCenter,
          projection: projection,
          zoom: this.mapZoom,
        });
        this.map = new Map({
          layers: [
            new TileLayer({
              opacity: 1,
              source: new WMTS({
                url: wmtsUrl_1 + webKey,
                layer: "vec",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: getProjection("EPSG:4326"),
                tileGrid: new WMTSTileGrid({
                  origin: getTopLeft(projectionExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds,
                }),
                wrapX: true,
              }),
            }),
            new TileLayer({
              opacity: 1,
              source: new WMTS({
                url: wmtsUrl_2 + webKey,
                layer: "cva",
                matrixSet: "c",
                format: "tiles",
                style: "default",
                projection: getProjection("EPSG:4326"),
                tileGrid: new WMTSTileGrid({
                  origin: getTopLeft(projectionExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds,
                }),
                wrapX: true,
              }),
            }),
          ],
          target: "map",
          view: this.view,
          controls: defaultControls({
            attribution: true,
            attributionOptions: {
              collapsible: true,
            },
            rotate: true,
            rotateOptions: {
              tipLabel: "重置标签",
            },
            zoom: true,
            zoomOptions: {
              zoomInTipLabel: "放大",
              zoomOutTipLabel: "缩小",
            },
          }),
        });
        this.$store.state.map = this.map;
      },
      changeCity(xy) {
        // console.log(JSON.stringify(xy))
        if(xy[0]==114.052857){
          this.$store.state.city ='sz';
          this.view.setZoom(10);
        }else{
          this.$store.state.city ='pds';
          this.view.setZoom(10);
        }
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
            features: [],
          }),
        });
        // 添加图层
        this.map.addLayer(this.areaLayer);
        geo.forEach((g) => {
          let lineData = g.features[0];
          if (lineData.geometry.type == "MultiPolygon") {
            areaFeature = new Feature({
              geometry: new MultiPolygon(lineData.geometry.coordinates),
            });
          } else if (lineData.geometry.type == "Polygon") {
            areaFeature = new Feature({
              geometry: new Polygon(lineData.geometry.coordinates),
            });
          }
        });
        areaFeature.setStyle(
          new Style({
            fill: new Fill({
              color: "#4e98f444"
            }),
            stroke: new Stroke({
              width: 5,
              color: [1777, 137, 227, 1],
              lineDash: [4],
            }),
          })
        );
        this.areaLayer.getSource().addFeatures([areaFeature]);
      },
      addArea_nu(geo = []) {
        if (geo.length == 0) return false;
        let areaFeature = null;
        // 设置图层
        this.areaLayer = new VectorLayer({
          source: new VectorSource({
            features: [],
          }),
        });
        // 添加图层
        this.map.addLayer(this.areaLayer);
        geo.forEach((g) => {
          let lineData = g.features[0];
          if (lineData.geometry.type == "MultiPolygon") {
            areaFeature = new Feature({
              geometry: new MultiPolygon(lineData.geometry.coordinates),
            });
          } else if (lineData.geometry.type == "Polygon") {
            areaFeature = new Feature({
              geometry: new Polygon(lineData.geometry.coordinates),
            });
          }
        });
        areaFeature.setStyle(
          new Style({
            // fill: new Fill({
            //   color: "#4e98f444"
            // }),
            stroke: new Stroke({
              width: 8,
              color: [71, 137, 227, 1],
              lineDash: [4],
            }),
          })
        );
        this.areaLayer.getSource().addFeatures([areaFeature]);
      },
    },
  };

</script>
<style>
  #map {
    height: 100%;
    width: 100%;
  }

</style>
