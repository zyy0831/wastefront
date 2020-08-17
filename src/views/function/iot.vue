<template>
  <div id="iot">
    <basicmap ref="map"></basicmap>
    <div id="popup" class="ol-popup" style="width:400px">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <p>{{iotInfo.title}}</p>
      <p>{{iotInfo.text}}</p>
      <p>{{iotInfo.titleURL}}</p>
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
  export default {
    data() {
      return {
        map: null,
        pointLayer: null,
        featuresArr: [],
        overlay: null,
        iotInfo: {
          imgURL: '',
          text: '',
          title: '',
          titleURL: '',
        },
        iotCoordinates: [{
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
        ],
        old: ''
      }
    },
    mounted() {
      this.initMap();
      this.getPoint();
      this.addPopup();
    },
    methods: {
      initMap() {
        this.map = this.$store.state.map
      },
      getPoint() {
        this.addPoints(this.iotCoordinates); //根据坐标点批量打点
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
        let styleIcon = new Style({
          // 设置图片效果
          image: new Icon({
            src: src,
            anchor: [1, 1],
            scale: 0.2,
          })
        });
        return styleIcon;
      },
      addPopup() {
        // 使用变量存储弹窗所需的 DOM 对象
        let container = document.getElementById("popup");
        let closer = document.getElementById("popup-closer");
        var beijing = [116.28, 39.54];
        //示例标注点北京市的信息对象
        var featuerInfo = {
          geo: beijing,
          att: {
            title: "北京市(中华人民共和国首都)", //标注信息的标题内容
            titleURL: "http://www.openlayers.org/", //标注详细信息链接
            text: "北京（Beijing），简称京，中华人民共和国首都、直辖市，中国的政治、文化和国际交往中心……", //标注内容简介
            imgURL: "../../images/label/bj.png" //标注的图片
          }
        }

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
        let _that = this;
        /**
         * 为弹窗添加一个响应关闭的函数
         */
        closer.onclick = function () {
          _that.overlay.setPosition(undefined);
          closer.blur();
          return false;
        };
        /**
         * 动态创建popup的具体内容
         * @param {string} title
         */
        function addFeatrueInfo(info) {
          _that.iotInfo.title = info.att.title;
          _that.iotInfo.text = info.att.text;
          _that.iotInfo.titleURL = info.att.titleURL;
        }
        /**
         * 动态设置元素文本内容（兼容）
         */
        function setInnerText(element, text) {
          if (typeof element.textContent == "string") {
            element.textContent = text;
          } else {
            element.innerText = text;
          }
        }

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
          if (feature) {
            // console.log(feature)
            // var a = feature.getGeometry();
            // console.log('横坐标' + a.flatCoordinates[0] + '纵坐标' + a.flatCoordinates[1])
            // console.log(feature.getGeometry().flatCoordinates)
            addFeatrueInfo(featuerInfo); //在popup中加载当前要素的具体信息
            // console.log(_that.overlay.getPosition())  //popup的坐标信息
            if (_that.overlay.getPosition() == undefined) {
              _that.overlay.setPosition(coordinate); //设置popup的位置
              _that.old = feature.getGeometry().flatCoordinates
            } else if (feature.getGeometry().flatCoordinates != _that.old) {
              _that.overlay.setPosition(coordinate);
            }
          } else {
            _that.overlay.setPosition(undefined); //设置popup的位置

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


      },

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
