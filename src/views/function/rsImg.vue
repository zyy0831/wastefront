<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-card class="airSel">
      <el-select v-model="filterPropName" placeholder="请选择" @change="Query(filterPropName)">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-card>
    <el-form class="airRight" :label-position="labelPosition">
      <el-form-item label="切换遥感影像"></el-form-item>
      <el-form-item label="">
        <el-checkbox v-model="checked1" @change="show()">tiff1</el-checkbox>
      </el-form-item>
    </el-form>
    <el-form class="airLeft" :label-position="labelPosition" :model="form">
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
import {GeoJSON,WFS} from 'ol/format';
import {equalTo} from 'ol/format/filter';
import {bbox} from 'ol/loadingstrategy';
export default {
  data() {
    return {
      labelPosition: "right",
      map: null,
      layer_wms_tiff: null,
      layer_wms_shp: null,
      wfsVectorLayer: null,
        vector: null,
        vectorSource: null,
      url_geoser: "http://localhost:8080/geoserver/wastr/wms?service=WMS",
      checked1: true,
        featuresGeo: null,
      form: {
        Address: "", //地址
        Area: "", //面积
        Id: "", //编号
        Num: "", //编号
        Remake: "", //备注
        Type: "", //类型
        Vol: "", //体积
      },
        options: [{
          value: '工程渣土',
          label: '工程渣土'
        }, {
          value: '工程泥浆',
          label: '工程泥浆'
        }, {
          value: '拆房垃圾',
          label: '拆房垃圾'
        }, {
          value: '工程垃圾',
          label: '工程垃圾'
        }, {
          value: '装修垃圾',
          label: '装修垃圾'
        }
        ],
        filterPropName: ''
    };
  },
  mounted() {
    this.initMap();
    // this.getWMS_tiff("	cite:pingdingshan201904031");
     this.getWMS_tiff("		wastr:pingdingshan201904031");
    // this.getWMS_tiff();
    this.getWMS_shp();
    // this.getWFS();
  },
  methods: {
    getWMS_shp() {
      (this.layer_wms_shp = new TileLayer({
        visible: this.checked1,
        source: new TileWMS({
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.0",
            LAYERS: "wastr:Export_Output",
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
      getWFS() {
        //创建wfs资源
        let wfsVectorSource = new VectorSource({
          format: new GeoJSON(),
          projection: 'EPSG:4326',
          url: 'http://localhost:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3AExport_Output&maxFeatures=50&outputFormat=text%2Fxml%3B%20subtype%3Dgml%2F2.1.2',
          strategy: bbox
        });
        // console.log(wfsVectorSource);
        //创建wfs图层，注意需要设置好描边样式，否则不展示效果出来
        this.wfsVectorLayer = new VectorLayer({
          source: wfsVectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'blue',
              width: 2
            })
          }),
          visible: true
        });
        // console.log(this.wfsVectorLayer);
        this.map.addLayer(this.wfsVectorLayer);
      },
    initMap() {
      this.map = this.$store.state.map;
      this.map.on("click", this.mapClick);
    },
    getWMS_tiff(tiffInput) {
      (this.layer_wms_tiff = new TileLayer({
        visible: this.checked1,
        source: new TileWMS({
          params: {
            FORMAT: "image/png",
            VERSION: "1.1.0",
            LAYERS: tiffInput,
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
      // this.checked1 = !this.checked1;
      this.layer_wms_tiff.setVisible(this.checked1);
    },
    mapClick: function (evt) {
      let _that = this;
        let viewResolution = _that.map.getView().getResolution();
        let url_wms_Shp = _that.layer_wms_shp
          .getSource()
          .getFeatureInfoUrl(evt.coordinate, viewResolution, "EPSG:4326", {
            INFO_FORMAT: "application/json",
          });
        // console.log(_that.layer_wms_tiff.get('name'))
        // console.log(_that.map.getLayers().array_)
        this.$axios({
            method: "get",
            url: url_wms_Shp,
          })
          .then((res) => {
            // console.log(res.data.features[0].properties);
            this.form = res.data.features[0].properties;
            // this.name = res.data.features[0].properties.name;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      //属性查询
      Query(val) {
        if(this.featuresGeo != null){
          this.vector.getSource().clear(); //清楚图层中的要素
        }
        this.vectorSource = new VectorSource();
        this.vector = new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: 'rgba(0, 0, 255, 1.0)',
              width: 5,
            }),
          }),
        });
        // 创建一个请求
        let featureRequest = new WFS().writeGetFeature({
          srsName: 'EPSG:4326',
          featureNS: 'http://www.openplans.org/wastr', //修改为工作区URL
          featurePrefix: 'wastr', //名字
          featureTypes: ['wastr:Export_Output'], //名字
          outputFormat: 'application/json',
          filter: equalTo('Type', val)
        });
        // 发送请求
        fetch('http://10.100.18.67:8080/geoserver/wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest),
        }).then(res => {
          return res.json();
        }).then(json => {
          this.featuresGeo = new GeoJSON().readFeatures(json);
          this.vectorSource.addFeatures(this.featuresGeo);
        });
        this.map.addLayer(this.vector)
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
.airRight {
  z-index: 999;
  width: 15%;
  top: 12%;
  right: 3%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 0.9;
  background-color:paleturquoise;
  border-style:solid;
  border-width:10px;
    border-color:rebeccapurple;
  border-bottom-color: transparent;

}

  .airSel {
    z-index: 999;
    width: 15%;
    top: 27%;
    right: 3%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
    background-color:paleturquoise;
    border-style:solid;
    border-width:10px;
   border-color:rebeccapurple;

  }

.airLeft {
  z-index: 999;
  width: 20%;
  height: 80%;
  top: 9%;
  right: 62%;
  position: absolute;
  /* background-color: rgb(25, 202, 54); */
  opacity: 0.7;
  background-color:paleturquoise;
  border-style:solid;
  border-width:10px;
  border-color:rebeccapurple;
font:red;

}

</style>
