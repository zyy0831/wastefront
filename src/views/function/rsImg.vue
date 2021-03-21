<template>
  <div id="shpDiv">
    <basicmap ref="map"></basicmap>
    <el-card class="airSel">
      <div style="background-color:#367EED;width:50%;height:30px;margin-left:50px;margin-bottom:20px;border-radius:25px;">
      <span class="SX">属性选择</span>
      </div>
      <el-select v-model="filterPropName" placeholder="请选择" @change="Query(filterPropName)" style="width:100%;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-card>
    <div>
    
    <el-form class="airRight" :label-position="labelPosition" id="selectFrom" >
      <div style="width:100%;height:40px;background-color:#367EED;margin-top:20px;">
      <span style="font-size:22px;;align:center;margin-top:30px;font-weight: bold;color:white;">功能切换区域</span>
      </div>
      <!-- <el-form-item label="切换遥感影像"></el-form-item> -->
      <el-form-item label="切换遥感影像" class="el-form-item_lable">
        <el-checkbox v-model="checked1" @change="show()"></el-checkbox>
      </el-form-item>
      <div style="width:80%;height:0.5px;background-color:white;margin-left:22px;"></div>
      <el-form-item label="详细信息显示" class="el-form-item_lable">
        <el-checkbox :value="showfrom" @change="show2()"></el-checkbox>
      </el-form-item>
    </el-form>
    </div>
    <div >
      <el-form class="airLeft" :label-position="labelPosition" :model="form" size="mini" v-show="showfrom" v-drag>
        <el-form-item style="background-color:#C7C8CA;  ">
          <div>
            <span style="font-size:20px;font-weight:bold;height:100%;width:100%;margin-left:10px;">详细信息</span>
          <el-button type="primary" @click="closeform()" size="mini" icon="el-icon-close"
            style="float: right; z-index: 999;background-color:#C7C8CA;border-color :#C7C8CA;!important; font-size:15px ;color:black;">
          </el-button>
          </div>
        </el-form-item>
        <el-form-item label="地址:" style="margin-left:15px;margin-top:30px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Address" style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="面积:" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Area"style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="个数:" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Id"style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="编号:" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Num" style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="类型；" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Type" style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="体积：" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Vol" style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
        <el-form-item label="备注：" style="margin-left:15px;margin-bottom:15px;font-weight:bold;">
          <el-input v-model="form.Remake" style="width:60%;margin-left:-20px;"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import "ol/ol.css";
  import {
    Tile as TileLayer
  } from "ol/layer";
  import {
    TileWMS
  } from "ol/source";
  import basicmap from "../map/basicMap";
  import VectorLayer from "ol/layer/Vector";
  import VectorSource from "ol/source/Vector";
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
  } from "ol/geom/Polygon";
  import Overlay from "ol/Overlay";
  import {
    GeoJSON,
    WFS
  } from "ol/format";
  import {
    equalTo
  } from "ol/format/filter";
  import {
    bbox
  } from "ol/loadingstrategy";
  export default {
    data() {
      return {
        labelPosition: "right",
        showfrom: false,
        map: null,
        layer_wms_tiff: null,
        layer_wms_shp: null,
        wfsVectorLayer: null,
        vector: null,
        vectorSource: null,
        url_geoser: "http://10.100.18.67:8080/geoserver/wastr/wms?service=WMS",
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
            value: "工程渣土",
            label: "工程渣土",
          },
          {
            value: "工程泥浆",
            label: "工程泥浆",
          },
          {
            value: "拆房垃圾",
            label: "拆房垃圾",
          },
          {
            value: "工程垃圾",
            label: "工程垃圾",
          },
          {
            value: "装修垃圾",
            label: "装修垃圾",
          },
        ],
        filterPropName: "",
      };
    },
    mounted() {
      this.initMap();
      // this.getWMS_tiff("	cite:pingdingshan201904031");
      this.getWMS_tiff("		wastr:pingdingshan201904031");
      // this.getWMS_tiff();
      this.getWMS_shp();
      // this.getWFS();
      // this.closeform();
    },
    methods: {
      closeform() {
        this.showfrom = false;
      },
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
          projection: "EPSG:4326",
          url: "http://10.100.18.67:8080/geoserver/cite/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cite%3AExport_Output&maxFeatures=50&outputFormat=text%2Fxml%3B%20subtype%3Dgml%2F2.1.2",
          strategy: bbox,
        });
        // console.log(wfsVectorSource);
        //创建wfs图层，注意需要设置好描边样式，否则不展示效果出来
        this.wfsVectorLayer = new VectorLayer({
          source: wfsVectorSource,
          style: new Style({
            stroke: new Stroke({
              color: "blue",
              width: 2,
            }),
          }),
          visible: true,
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
      show2() {
        this.showfrom = !this.showfrom;
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
        if (this.featuresGeo != null) {
          this.vector.getSource().clear(); //清楚图层中的要素
        }
        this.vectorSource = new VectorSource();
        this.vector = new VectorLayer({
          source: this.vectorSource,
          style: new Style({
            stroke: new Stroke({
              color: "rgba(0, 0, 255, 1.0)",
              width: 5,
            }),
          }),
        });
        // 创建一个请求
        let featureRequest = new WFS().writeGetFeature({
          srsName: "EPSG:4326",
          featureNS: "http://www.openplans.org/wastr", //修改为工作区URL
          featurePrefix: "wastr", //名字
          featureTypes: ["wastr:Export_Output"], //名字
          outputFormat: "application/json",
          filter: equalTo("Type", val),
        });
        // 发送请求
        fetch("http://10.100.18.67:8080/geoserver/wfs", {
            method: "POST",
            body: new XMLSerializer().serializeToString(featureRequest),
          })
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            this.featuresGeo = new GeoJSON().readFeatures(json);
            this.vectorSource.addFeatures(this.featuresGeo);
          });
        this.map.addLayer(this.vector);
      },
    },
    components: {
      basicmap: basicmap,
    },
    // 自定义指令
    directives: {
      drag(el, bindings) {
        el.onmousedown = function (e) {
          var disx = e.pageX - el.offsetLeft;
          var disy = e.pageY - el.offsetTop;
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disx + 'px';
          }
          document.onmouseup = function () {
            document.onmousemove = document.onmouseup = null;
          }
        }
      }
    }
  };

</script>

<style scoped>
  #shpDiv {
    width: 100%;
    height: 100%;
  }

  .el-form-item_lable{
  text-indent:15px;
  margin-top: 15px;
  
   }
   #selectFrom >>> .el-form-item__label {
  font-size: 18px;
  color:white;
  
  /* border-style: solid;
   */
  
  
}

  .airRight {
    z-index: 888;
    width: 10%;
    top: 9%;
    right: 1%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 1;
    background-color: #367EED;
    /* border-style: solid; */
    /* border-width: 2px; */
    border-color: rebeccapurple;
    border-bottom-color: transparent;
  }

  .airSel {
    z-index: 999;
    width: 12%;
    top:35%;
    right: 0%;
    height: 11%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 1;
    background-color: #367EED;
    /* border-style: solid; */
    /* border-width: 2px; */
    /* border-color: rebeccapurple; */
  }
.SX{
  font-size: 20px;
  font-weight: bold;
  color:white;
}
  .airLeft {
    z-index: 888;
    width: 12%;
    height: 37%;
    top: 36%;
    right: 16%;
    position: absolute;
    /* background-color: rgb(25, 202, 54); */
    opacity: 0.9;
    background-color: paleturquoise;
    /* border-style: solid;
    border-width: 2px;
    border-color: rebeccapurple; */
    font: red;
  }

</style>
