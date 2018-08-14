<template>
  <div></div>
</template>
<script>
/**
 * echart线状图组件
 * 使用说明
 * 通过传递对应props渲染图表，初始渲染后。如需再次改变图表数据，修改对应props数据后，调用setEchart方法即可
 * 参数说明
 * lineData: [{name: 'xxx', data: [12, 34]}]
 * areaColor: [{begin: 'xxx', end: 'xxx'}]
 * 方法：setEchart，重新设置图表
 */
import echart from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
export default {
  props: {
    elName: String, // 图表渲染节点(必填)
    colorList: Array, // 图表颜色(必填)
    lineData: { // 数据列表(必填)
      type: Array,
      default: () => []
    },
    xType: { // x轴数据类型，1-七天 2-24小时
      type: String,
      default: '1'
    },
    xData: Array, // x轴数据列表
    lineType: { // 折线图类型：1-基础折线图 2-区域覆盖折线图
      type: String,
      default: '1'
    },
    areaColor: Array, // 渐变填充色
    legendData: Array, // 图例组件数据，一般用于渐变填充
    yName: String, // y轴名称
    legendShow: { // 显示legend，默认不显示
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      myechart: {} // 图表实例
    }
  },
  computed: {
    options () { // 图表数据对象
      let [baseSet, series] = [{}, []]
      let xdata
      if (!this.xData) { // x轴处理
        switch (this.xType) {
          case '1':
            xdata = ['1日', '2日', '3日', '4日', '5日', '6日', '今日']
            break
          case '2':
            xdata = ['1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时', '24时']
            break
          default:
            xdata = []
        }
      } else {
        xdata = this.xData
      }

      baseSet = { // series初始选项
        type: 'line',
        showSymbol: this.lineType === '1' // 显示标记
      }

      if (this.lineType === 2) baseSet.areaStyle = {} // 设置填充图表为默认颜色

      this.lineData.forEach((item, index) => { // 处理后端数据，获取series数据
        if (this.areaColor) { // 判断是否是渐变线状图表
          baseSet.areaStyle = { // 设置渐变颜色
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: this.areaColor[index].begin // 0% 处的颜色
              },
              {
                offset: 1,
                color: this.areaColor[index].end // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          }
        }
        series.push({
          ...baseSet,
          name: item.name,
          data: item.data
        })
      })

      return {
        animation: false,
        color: this.colorList,
        grid: {
          top: !this.legendShow ? '3%' : 35, // 根据是否显示legend,控制图表距离容器顶部距离
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true // 防止标签过长溢出
        },
        legend: {
          show: this.legendShow,
          right: 10,
          top: 0,
          itemGap: 20,
          textStyle: {
            color: '#57637C'
          },
          data: this.legendData
        },
        xAxis: {
          type: 'category',
          axisLabel: { // 坐标轴刻度标签设置
            interval: xdata.length > 12 ? 2 : 0, // x轴坐标点大于12个，间隔两个显示
            color: '#A5AFBE'
          },
          axisTick: { // 坐标轴刻度设置
            show: false
          },
          axisLine: { // 坐标轴线设置
            lineStyle: {
              color: '#A5AFBE'
            }
          },
          boundaryGap: false,
          data: xdata
        },
        yAxis: {
          type: 'value',
          name: this.yName,
          nameTextStyle: {
            color: '#57637C',
            padding: [0, 35, 0, 0]
          },
          axisLine: { // y轴线不显示
            show: false
          },
          axisLabel: {
            color: '#A5AFBE',
            formatter: (data) => { // y轴数据过滤
              if (data >= 1000) {
                return `${data / 1000}k`
              } else {
                return data
              }
            }
          },
          axisTick: {
            show: false
          }
        },
        series
      }
    }
  },
  mounted () {
    this.myechart = echart.init(document.querySelector(this.elName))
    this.myechart.setOption(this.options)
  },
  methods: {
    setEchart () { // series数据变化，重设图表
      this.$nextTick(() => {
        this.myechart.setOption(this.options)
      })
    }
  }
}
</script>
