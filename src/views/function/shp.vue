<template>
  <basicmap ref="map"></basicmap>
</template>

<script>
import "ol/ol.css";
import {
  Tile as TileLayer,
} from "ol/layer";
import{TileWMS} from "ol/source"


import basicmap from "../map/basicMap";
export default {
  data() {
    return {
      map: null,
      wmsLayer: null,
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
        opacity:0.5,
        source: new TileWMS({
          params: {
            FORMAT: "image/jpeg",
            VERSION: "1.1.0",
            LAYERS: "karl:Export_Output",
            TILED: true,
            STYLES: "",
          },
          url: "http://localhost:8080/geoserver/karl/wms",
          transition: 0,
          serverType:'geoserver'
        }),
      }),
      this.map.addLayer(this.wmsLayer);
      console.log(this.map)
    },
  },
  components: {
    basicmap: basicmap,
  },
};
</script>

<style scoped>
#map {
  width: 1000px;
  height: 700px;
  border: 1px solid #ff0000;
}
</style>