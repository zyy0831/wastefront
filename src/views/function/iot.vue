<template>
  <div id="iot">
    <basicmap ref="map"></basicmap>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
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
  import Overlay from "ol/Overlay";

  import basicmap from '../map/basicMap'
  export default {
    data() {
      return {
        map: null,
        pointLayer: null,
        featuresArr: [],
        overlay: null,
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
        let coordinates = [{
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
        ];
        this.addPoints(coordinates); //根据坐标点批量打点
      },
      /**
       * 批量根据经纬度坐标打点
       */
      addPoints(coordinates) {
        console.log("aaa");
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
        let content = document.getElementById("popup-content");
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
         * 添加单击响应函数来处理弹窗动作
         */
        this.map.on("click", function (evt) {
          let coordinate = evt.coordinate
          content.innerHTML = `
                <p>你点击了这里：</p>
                <p>坐标：</p>X：${coordinate[0]} &nbsp;&nbsp; Y: ${coordinate[1]}`;
          _that.overlay.setPosition(evt.coordinate); //把 overlay 显示到指定的 x,y坐标
        });
        /**
         * 为弹窗添加一个响应关闭的函数
         */
        closer.onclick = function () {
          _that.overlay.setPosition(undefined);
          closer.blur();
          return false;
        };
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
.popup-content {
    width: 400px;
}
.ol-popup-closer:after {
    content: "✖";
}
</style>


