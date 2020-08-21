<template>
  <div id="iot">
    <basicmap ref="map"></basicmap>
    <div id="popup" class="ol-popup" style="width:200px">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <el-form :model="facInfoForm">
        <el-form-item label="名称">
          <span>{{facInfoForm.Name}}</span>
        </el-form-item>
        <el-form-item label="地址">
          <span>{{facInfoForm.location}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <span>{{facInfoForm.Attr}}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import 'ol/ol.css'
  import TileLayer from 'ol/layer/Tile'
  import VectorLayer from "ol/layer/Vector"
  import VectorSource from "ol/source/Vector"
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
  import Overlay from "ol/Overlay";

  import basicmap from '../map/basicMap'
  import * as facAPI from '../../api/facility'

  export default {
    data() {
      return {
        map: null,
        pointLayer: null,
        featuresArr: [],
        overlay: null,
        facInfoForm: {
          Name: '',
          lat: '',
          lon: '',
          location: '',
          Attr: '',
        },
        old: ''
      }
    },
    created() {

    },
    mounted() {
      this.initMap();
      this.getIotCoord();
      this.createdOverly();
      this.addPopup();
    },
    methods: {
      initMap() {
        this.map = this.$store.state.map
      },
      getIotCoord() {
        facAPI.getFacInfo().then(res => {
          let Coordinates = res.data;
          JSON.stringify(Coordinates)
          this.addPoints(Coordinates); //根据坐标点批量打点
        }).catch(err =>
          console.log(err)
        )
      },

      /**
       * 批量根据经纬度坐标打点
       */
      addPoints(coordinates) {
        console.log(coordinates)
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
              [coordinates[i].lon, coordinates[i].lat]
            )
          });
          feature.setStyle(this.getIcon(coordinates[i].Attr));
          this.featuresArr.push(feature);
        }
        // 批量添加feature
        this.pointLayer.getSource().addFeatures(this.featuresArr);
      },
      getIcon(type) {
        let src = "";
        type == "1" ?
          (src = require("../../assets/img/marker/facBlue.png")) :
          (src = require("../../assets/img/marker/facRed.png"));
        let styleIcon = new Style({
          // 设置图片效果
          image: new Icon({
            src: src,
            anchor: [1, 1],
            scale: 0.15,
          })
        });
        return styleIcon;
      },
      createdOverly() {
        let container = document.getElementById("popup");
        // 创建一个弹窗 Overlay 对象
        this.overlay = new Overlay({
          element: container, //绑定 Overlay 对象和 DOM 对象的
          autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
          autoPanAnimation: {
            duration: 250 //自动平移效果的动画时间 9毫秒
          }
        });
        // 将弹窗添加到 map 地图中
        this.map.addOverlay(this.overlay);
      },
      addPopup() {
        // 使用变量存储弹窗所需的 DOM 对象
        let closer = document.getElementById("popup-closer");

        let _that = this;

        /**
         * 添加单击响应函数来处理弹窗动作
         * display popup on click
         */
        _that.map.on("click", function (evt) {
          let coordinate = evt.coordinate;
          //判断当前单击处是否有要素，捕获到要素时弹出popup
          var feature = _that.map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
          });
          if (feature && feature.getGeometry().flatCoordinates.length < 3) {
            let coord = feature.getGeometry().flatCoordinates
            facAPI.getFacOneInfo(coord).then(res => {
              _that.facInfoForm = res.data[0] //在popup中加载当前要素的具体信息
              _that.checkType(_that.facInfoForm.Attr)
            }).catch(err => {
              console.log(err)
            })

            // console.log(_that.overlay.getPosition())  //popup的坐标信息
            if (_that.overlay.getPosition() == undefined) {
              _that.overlay.setPosition(coordinate); //设置popup的位置
              _that.old = feature.getGeometry().flatCoordinates
            } else if (feature.getGeometry().flatCoordinates != _that.old) {
              _that.overlay.setPosition(coordinate);
            }
          } else if (feature && feature.getGeometry().flatCoordinates.length > 3) {
            alert("您点击的是区划边界要素，请放大地图，重新点击")
            _that.facInfoForm = {}
          } else {
            _that.overlay.setPosition(undefined); //设置popup的位置
            _that.facInfoForm = {}

          }
        });
        /**
         * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
         * change mouse cursor when over marker
         */
        _that.map.on('pointermove', function (e) {
          var pixel = _that.map.getEventPixel(e.originalEvent);
          var hit = _that.map.hasFeatureAtPixel(pixel);
          _that.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        });
        /**
         * 为弹窗添加一个响应关闭的函数
         */
        closer.onclick = function () {
          _that.overlay.setPosition(undefined);
          _that.facInfoForm = {};
          closer.blur();
          return false;
        };
      },
      checkType(para) {
        console.log(para)
        switch (para) {
          case '0':
            this.facInfoForm.Attr = "填埋场";
            break;
          case '1':
            this.facInfoForm.Attr = "资源化设施";
            break;
        }
      }

    },
    components: {
      basicmap: basicmap,
    },
  }

</script>
<style scoped>
  #iot {
    height: 100%;
    width: 100%;
  }

  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
  }

  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }


  .ol-popup-closer:after {
    content: "✖";
  }

</style>
