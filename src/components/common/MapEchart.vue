<template>
  <div class="map-echart">
    <div class="map-content"></div>
    <div class="btn-list">
      <div class="btn-item" @click="zoomMap(1)">+</div>
      <div class="btn-item btn-reduce" @click="zoomMap(2)">-</div>
    </div>
  </div>
</template>
<script>
/**
 * 地图图表组件
 * 参数说明：
 * mapData: [{
    name: '武汉', // 必填
    value: [114.31, 30.52, 55], // 必填：经纬度，数据值(可选)
    itemStyle: { // 不合格点样式
      color: '#FF2943'
    }
  },
  {
    name: '深圳',
    value: [114.06, 22.54, 99]
  }]
 */
import echart from 'echarts/lib/echarts'
import 'echarts/map/js/china' // 引入地图数据
export default {
  props: {
    elName: String, // 图表渲染节点(必填)
    mapData: Array, // 数据列表(必填)
    backgroundColor: { // 图表背景色
      type: String,
      default: '#F8F8F8'
    },
    tooltipBack: { // 提示框背景色
      type: String,
      default: '#FFF'
    },
    tooltipFormatter: [String, Function], // 提示框内容格式
    geoOption: Object, // 地图选项，会基于现有合并
    normalMark: { // series type:scatter正常情况下标记点样式
      type: String,
      default: '#3E7CFF'
    }
  },
  data () {
    return {
      mapEchart: {}, // 图表实例
      options: {}, // 图表参数
      timer: {} // 定时器
    }
  },
  computed: {
    currZoom () { // 用于处理缩放时，标记点的大小
      if (this.mapEchart.getOption) {
        return this.mapEchart.getOption().geo[0].zoom
      }
    }
  },
  watch: {
    currZoom (value, oldValue) { // 用于处理缩放时，标记点的大小
      if (value === oldValue) return
      let options = this.mapEchart.getOption()
      options.series[0].symbolSize = 15 * value > 40 ? 40 : 15 * value
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.mapEchart.setOption(options)
      }, 10)
    }
  },
  mounted () {
    this.options = {
      animation: false,
      backgroundColor: this.backgroundColor,
      tooltip: this.tooltipFormatter ? {
        trigger: 'item',
        backgroundColor: this.tooltipBack,
        position: 'bottom', // 设置展示框的位置
        confine: true, // 限制tooltip框在图表的区域内
        formatter: this.tooltipFormatter
      } : {},
      geo: {
        map: 'china',
        roam: true, // 开启缩放和平移
        zoom: 1.2,
        scaleLimit: { // 设置最小缩放比例
          min: 1,
          max: 5
        },
        label: { // 设置地图标签
          show: false
        },
        itemStyle: { // 设置地图样式
          areaColor: '#F8F8F8',
          borderColor: '#00FFFF'
        },
        emphasis: { // 设置高亮样式
          label: {
            show: false
          },
          itemStyle: {
            areaColor: '#F8F8F8'
          }
        },
        ...this.geoOption
      },
      series: [{
        type: 'scatter',
        coordinateSystem: 'geo',
        symbolSize: 18,
        label: {
          show: false // 正常模式下不显示标签
        },
        itemStyle: { // 设置标记样式
          color: this.normalMark
        },
        emphasis: { // 设置高亮模式下标签展示
          label: {
            show: true,
            formatter: '{b}',
            position: 'top',
            color: '#001744'
          }
        },
        data: this.mapData
      }]
    }
    this.mapEchart = echart.init(document.querySelector(`${this.elName} .map-content`))
    this.mapEchart.setOption(this.options)
  },
  methods: {
    zoomMap (type) { // 放大缩小函数
      let zoom = this.mapEchart.getOption().geo[0].zoom
      if (type === 1) {
        if (zoom + 1 >= 5) this.options.geo.zoom = 5
        else this.options.geo.zoom = zoom + 1
      } else {
        if (zoom - 1 <= 1) this.options.geo.zoom = 1.2
        else this.options.geo.zoom = zoom - 1
      }
      this.options.series[0].symbolSize = 15 * this.options.geo.zoom > 40 ? 40 : 15 * this.options.geo.zoom
      this.mapEchart.setOption(this.options)
    },
    setEchart (data) { // 设置图表
      this.options.geo.zoom = 1.2
      this.options.series[0] = {
        ...this.options.series[0],
        symbolSize: 18,
        data
      }
      this.mapEchart.setOption(this.options)
    }
  }
}
</script>
