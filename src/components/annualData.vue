<template>
  <div id="infoCss">
    <el-button @click="Query">默认按钮</el-button>
    <basicmap></basicmap>
  </div>
</template>
<script>
  import 'ol/ol.css';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import {
    Vector as VectorLayer,
    Tile as TileLayer
  } from 'ol/layer';
  import {
    Vector as VectorSource,
    OSM
  } from 'ol/source';
  import {
    GeoJSON,
    WFS
  } from 'ol/format';
  import {
    equalTo
  } from 'ol/format/filter';
  import {
    bbox
  } from 'ol/loadingstrategy'
  import {
    Style,
    Stroke,
    Circle,
    Fill
  } from 'ol/style';
  import {
    Projection
  } from 'ol/proj'
  import {
    registerXMLSerializer
  } from 'ol/xml';

  import basicmap from '../map/basicMap'

  export default {
    data() {
      return {
        map: null,
      }
    },
    computed: {},
    created() {

    },
    mounted() {
      this.initMap();
      this.getWFS();
    },
    watch: {

    },
    methods: {
      initMap() {
        this.map = this.$store.state.map;
      },
      getWFS() {
        //创建wfs资源
        let wfsVectorSource = new VectorSource({
          format: new GeoJSON(),
          projection: 'EPSG:4326',
          url: 'http://10.100.18.67:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3A0820-5&maxFeatures=50&outputFormat=application%2Fjson',
          strategy: bbox
        });
        //创建wfs图层，注意需要设置好描边样式，否则不展示效果出来
        let wfsVectorLayer = new VectorLayer({
          source: wfsVectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 2
            })
          }),
          visible: true
        });
        this.map.addLayer(wfsVectorLayer);
      },
      //属性查询
      Query() {
        let vectorSource = new VectorSource();
        let vector = new VectorLayer({
          source: vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'rgba(0, 0, 255, 1.0)',
              width: 20,
            }),
          }),
        });
        // 创建一个请求
        let featureRequest = new WFS().writeGetFeature({
          srsName: 'EPSG:4326',
          featureNS: 'http://www.opengeospatial.net/cite',
          featurePrefix: 'cite',
          featureTypes: ['cite:0820-5'],
          outputFormat: 'application/json',
          filter: equalTo('Type', '工程渣土')
        });
        // 发送请求
        fetch('http://10.100.18.67:8080/geoserver/wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest),
        }).then(res => {
          return res.json();
        }).then(json => {
          let features = new GeoJSON().readFeatures(json);
          vectorSource.addFeatures(features);
        });
       this.map.addLayer(vector)
      }


    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
<style scoped>
  #infoCss {
    height: 100%;
    width: 100%;
  }

</style>
