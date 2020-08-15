<template>
  <div id="map">
  </div>
</template>

<script>
  import 'ol/ol.css'
  import {
    get as getProjection
  } from 'ol/proj'
  import {
    getWidth,
    getTopLeft
  } from 'ol/extent'
  import View from 'ol/View'
  import Map from 'ol/Map'
  import TileLayer from 'ol/layer/Tile'
  import WMTS from 'ol/source/WMTS'
  import WMTSTileGrid from 'ol/tilegrid/WMTS'
  import {
    defaults as defaultControls
  } from 'ol/control'

  export default {
    name: 'OlMap',
    data() {
      return {
        map: null,
        view: null,
        mapCenter: [113.186303, 33.767782], //地图中心点，平顶山
        // [114.052857, 22.545676] 深圳
      }
    },
    mounted() {
      this.loadMap();
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
          zoom: 8
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
      },
      changeCity(xy) {
        console.log(xy)
        this.view.setCenter(xy);


      },

    },
    computed: {
      listenPoint() {
        return this.$store.state.mainPoint;
      }
    },
    watch: {
      listenPoint: function (old, newd) {
        // this.mapCenter = old;
        this.changeCity(old);
      }
    }
  }

</script>
<style>
  #map {
    height: 100%;
    width: 100%;
  }

</style>
