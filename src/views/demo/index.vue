<template>
  <div class="demo-box">
    <div class="pie-demo">
      <pie-echart el-name=".pie-demo" :radius="['75%', '80%']" :color-list="['#3D7BFF', '#8B91F9', '#DFEAFF']" pie-type="1" :pie-data="echar1" :center-point="pointData"></pie-echart>
    </div>
    <div class="demo-list">
      <div class="pie-demo1">
        <pie-echart el-name=".pie-demo1" :radius="['91%', '100%']" :color-list="['#FFD300', '#EEEEEE']" :pie-data="echar2" :center-point="pointData" ref="pieDemo"></pie-echart>
      </div>
      <div class="pie-demo1 pie-demo2">
        <pie-echart el-name=".pie-demo2" :radius="['91%', '100%']" :color-list="['#8B91F9', '#EEEEEE']" :pie-data="echar2" :center-point="pointData"></pie-echart>
      </div>
      <div class="pie-demo1 pie-demo3">
        <pie-echart el-name=".pie-demo3" :radius="['91%', '100%']" :color-list="['#5C99FF', '#EEEEEE']" :pie-data="echar2" :center-point="pointData"></pie-echart>
      </div>
    </div>
    <div class="demo-line">
      <line-echart
        el-name=".demo-line"
        :color-list="['#8B91F9', '#3D7BFF']"
        :line-data="echar3"
        x-type="2"
        line-type="2"
        :area-color="dataColor"
        :legend-data="legendData"
        :legend-show="true"
        y-name="（件）"
        ref="area">
      </line-echart>
    </div>
    <div class="line-1">
      <line-echart el-name=".line-1" :color-list="['#FFD300']" :line-data="echar4" ref="demo1"></line-echart>
    </div>
    <!-- 动态组件方式 -->
    <div class="line-1 line-2">
      <component
      :is="ename"
      el-name=".line-2"
      :color-list="['#FFD300']"
      :line-data="echar4"
       ref="demo1"
      ></component>
    </div>
    <div @click="changePie">change pie</div>
    <div @click="resetData">change line</div>
    <div @click="changeArea">change area</div>
  </div>
</template>
<script>
import PieEchart from 'components/common/PieEchart'
import LineEchart from 'components/common/LineEchart'
export default {
  data () {
    return {
      echar1: [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      },
      {
        value: 234,
        name: '联盟广告',
        label: {
          color: 'red',
          formatter: '{c}({d}%)\n{a|{b}}',
          rich: {
            a: {
              align: 'center',
              color: 'red'
            }
          }
        }
      }],
      echar2: [{
        value: 335,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      }],
      pointData: [{
        value: 13652,
        name: '库存'
      }],
      echar3: [{
        name: '处理单',
        data: [0, 330, 1232, 1301, 1534, 1620, 1630, 1510, 1350, 1230, 1232, 1301, 1534, 1620, 1630, 1510, 1520, 1330, 1232, 1301, 1534, 1620, 1630, 1510]
      },
      {
        name: '接收单',
        data: [0, 820, 932, 901, 934, 1290, 1330, 1320, 1201, 1820, 932, 901, 934, 1290, 1330, 1320, 930, 1820, 932, 901, 1934, 1290, 1330, 1320]
      }],
      dataColor: [{
        begin: '#8B91F9',
        end: '#EDF2FF'
      },
      {
        begin: '#3D7BFF',
        end: '#E1EBFF'
      }],
      legendData: [{
        name: '处理单',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAIAAAD6TJplAAAAl0lEQVR42mPcvf/3168MtACMsxf8+vDx/1Azes3G3x8//WdkJE3bf7Bj0HQBBZFFGLfv+fPlK9zVcAYjMoXVUxBT/mP3MEiUce+hP1+/0SZADh3/8+07uoVIbkf3B/Fhxnj8zJ/vPzAsxB0OJLj67KU/P37SIjwYGC/f+Esro2/c/fvzF25p3CGDN4WAFdx99O/3H5qkEABkMUr5znnLLwAAAABJRU5ErkJggg=='
      },
      {
        name: '接收单',
        icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAMCAIAAAAReyFmAAAAfklEQVR42mOsXvqfgQaA0bZ6aJmbNIU25uIJX7gEIzYuAXNb1/zHZQSyfjTLMaXQ7e7fRBtzZ+zEGQ6Y3scVFJhGMC4+8J/yiENzAUhk7fH///F4El05dhGoMJI44/az/3H5haiA+I/uEmhwH7j6H1kzIyOqHf/xJisc1gABALm+O1MTj5isAAAAAElFTkSuQmCC'
      }],
      echar4: [{
        name: '出库',
        data: [160, 330, 832, 1301, 1534, 1620, 1630]
      }],
      ename: ''
    }
  },
  updated (e) {
    console.log(33, e)
  },
  created () {
    setTimeout(() => {
      this.ename = 'line-echart'
    }, 1000)
  },
  components: {
    PieEchart,
    LineEchart
  },
  methods: {
    resetData () {
      console.log(996, this.$refs.demo1)
      this.echar4 = [{name: '出库', data: [23, 56, 68, 80, 55, 90, 113]}]
      this.$refs.demo1.setEchart()
    },
    changeArea () {
      this.dataColor = [{
        begin: '#f60',
        end: '#ff4'
      },
      {
        begin: '#3D7BFF',
        end: '#E1EBFF'
      }]
      this.echar3 = [{
        name: '处理单',
        data: [0, 330, 362, 411, 534, 620, 660, 710, 780, 830, 892, 1101, 1234, 1320, 1390, 1510, 1610, 1690, 1732, 1791, 1884, 1920, 2030, 2110]
      },
      {
        name: '接收单',
        data: [0, 220, 256, 365, 435, 550, 590, 620, 680, 710, 790, 901, 934, 1190, 1230, 1320, 1390, 1520, 1632, 1691, 1734, 1800, 1990, 2014]
      }]
      this.$refs.area.setEchart()
    },
    changePie () {
      this.echar2 = [{
        value: 635,
        name: '直接访问'
      },
      {
        value: 310,
        name: '邮件营销'
      }]
      this.pointData = [{
        value: 23652,
        name: '库存'
      }]
      this.$refs.pieDemo.setEchart()
    }
  }
}
</script>
<style lang="less" scoped>
.demo-box {
  background: #fff;
}
.pie-demo {
  width: 6.9rem;
  height: 4.9rem;
  margin: 0 auto;
}
.demo-list {
  display: flex;
  flex-wrap: nowrap;
  height: 2rem;
  .pie-demo1 {
    flex: 1;
  }
}
.demo-line {
  width: 6.9rem;
  height: 5.46rem;
  margin: 20px auto;
}
.line-1 {
  width: 96%;
  height: 4.6rem;
  margin: 0 auto;
}
</style>
