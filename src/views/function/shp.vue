<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-form class="air" :label-position="labelPosition">
      <el-form-item label="名称" class="good" >
        <p>{{name}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import 'ol/ol.css'
  import TileLayer from 'ol/layer/Tile'
  import VectorLayer from "ol/layer/Vector"
  import VectorSource from "ol/source/Vector"
  import {
    TileWMS
  } from "ol/source";
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
    circular
  } from 'ol/geom/Polygon';
  import Overlay from "ol/Overlay";


  import basicmap from "../map/basicMap";
  export default {
    data() {
      return {
        labelPosition: 'right',
        map: null,
        wmsLayer: null,
        URL1: "http://10.100.18.67:8080/geoserver/cite/wms?service=WMS",
        checked1: true,
        name:''
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
        this.wmsLayer = new TileLayer({
            name: 'layerName123',
            visible: this.checked1,
            source: new TileWMS({
              params: {
                FORMAT: "image/png",
                VERSION: "1.1.0",
                LAYERS: "cite:20200818",
                TILED: true,
                STYLES: "",
                transparent: true,
                opacity: 1,
              },
              url: this.URL1,
              serverType: "geoserver",
            }),
          }),
          this.map.addLayer(this.wmsLayer);
        this.map.on('click', this.mapClick);
      },
      show() {
        this.checked1 = !this.checked1;
        this.wmsLayer.setVisible(this.checked1);
      },
      mapClick: function (evt) {
        var _that = this;
        var feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          return layer;
        });
        console.log(feature)
        var viewResolution = _that.map.getView().getResolution();
        var url = _that.wmsLayer.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', {
          'INFO_FORMAT': 'application/json',
        });
        // console.log(_that.wmsLayer.get('name'))
        console.log(url)
        // console.log(_that.map.getLayers().array_)
        this.$axios({
          method: 'get',
          url: url,
        }).then((res) => {
          console.log(res.data.features[0].properties.name)
          this.name= res.data.features[0].properties.name
          // console.log(res.data.features[0].geometry.coordinates)

        }).catch((err) => {
          console.log(err)
        })
      }
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
    height: 20%;
    top: 25%;
    right: 68%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
    background-color: white;
  }


</style>
