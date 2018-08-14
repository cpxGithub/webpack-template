<template>
  <div></div>
</template>
<script>
/**
 * echart饼状图组件
 * 宽高：由图表渲染节点设置，然后radius根据宽高最小值的百分比设置
 * 使用说明：通过传递对应props渲染图表，初始渲染后。如需再次改变图表数据，修改对应props数据后，调用setEchart方法即可
 * 如果需要修改各数据项颜色，需要在pieData个数据项中设置，格式如下：
 * {
    value: 234,
    name: '联盟广告',
    label: {
      color: 'red', // 需要修改的颜色
      formatter: '{c}({d}%)\n{a|{b}}',
      rich: {
        a: {
          align: 'center',
          color: 'red' // 需要修改的颜色
        }
      }
    }
   方法：setEchart用于重新设置图表
 */
import echart from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
export default {
  props: {
    elName: String, // 图表渲染节点(必填)
    colorList: Array, // 图表颜色(必填)
    radius: Array, // 图表内外环大小(必填)
    pieData: { // 图表数据(必填)
      type: Array,
      default: () => []
    },
    centerPoint: { // 中心点数据
      type: Array,
      default: () => []
    },
    pieType: { // 图表类型 1：显示具体数据 2：不显示具体数据
      type: String,
      default: '2'
    }
  },
  data () {
    return {
      myechart: {} // 图表实例
    }
  },
  computed: {
    options () { // 图表数据对象
      let series = [{
        name: 'pieEchart',
        type: 'pie',
        silent: true, // 禁止一切鼠标事件
        radius: this.radius,
        z: 10,
        label: {
          show: this.pieType === '1',
          formatter: '{c}({d}%)\n{a|{b}}',
          rich: {
            a: {
              align: 'center',
              height: 16,
              verticalAlign: 'bottom'
            }
          }
        },
        labelLine: {
          length: 5,
          length2: 5
        },
        data: this.pieData
      }]

      if (this.centerPoint) {
        series.push({ // 展示中心点信息
          name: '总量',
          type: 'pie',
          silent: true, // 禁止一切鼠标事件
          radius: this.radius,
          z: 5,
          label: {
            formatter: (params) => { // 数据格式化
              let str = params.data.value
              return `{a|${str}}\n{x|${params.data.name}}`
            },
            position: 'center',
            rich: {
              a: {
                color: '#001744',
                fontSize: 14
              },
              x: {
                color: '#57637C',
                height: 16,
                verticalAlign: 'bottom'
              }
            }
          },
          data: this.centerPoint
        })
      }
      // 返回图表option
      return {
        animation: false,
        color: this.colorList,
        series
      }
    }
  },
  mounted () {
    this.myechart = echart.init(document.querySelector(this.elName)) // 初始化一个图表实例
    this.myechart.setOption(this.options)
  },
  methods: {
    setEchart () { // 重设图表
      this.$nextTick(() => {
        this.myechart.setOption(this.options)
      })
    }
  }
}
</script>
