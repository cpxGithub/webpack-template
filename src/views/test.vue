<template>
  <div>
    <TestP v-bind="$props"></TestP>
    {{ad}}
    <div @click="error = ''">点击</div>
    <div v-if="error">
      错误：{{ error }}
    </div>
    <div v-else>
      {{ results }}
    </div>
    <div class="box"></div>
    <router-link to="/upload">
      <div>跳转</div>
    </router-link>
    <div v-bind="{ id: someProp, 'other-attr': otherProp }">99222</div>
    <div class="demo-list">
      <div class="pie-demo1">
        <pie-echart el-name=".pie-demo1" :radius="['91%', '100%']" :color-list="['#FFD300', '#EEEEEE']" :pie-data="echar2" :center-point="pointData" ref="pieDemo"></pie-echart>
      </div>
    </div>
    <div class="line-1">
      <line-echart el-name=".line-1" :color-list="['#FFD300']" :line-data="echar1" ref="demo1"></line-echart>
    </div>
  </div>
</template>
<script>
import 'styles/test.less'
import PieEchart from 'components/common/PieEchart'
import LineEchart from 'components/common/LineEchart'
import TestP from './p'
export default {
  data () {
    return {
      ad: 33,
      someProp: 'ddd',
      otherProp: 12,
      error: 66,
      results: 33,
      echar1: [{
        name: '出库',
        data: [160, 330, 832, 1301, 1534, 1620, 1630]
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
      }]
    }
  },
  props: {
    name: {
      type: String
    }
  },
  components: {
    TestP,
    PieEchart,
    LineEchart
  },
  mounted () {
    console.log(991, process.env.NODE_ENV)
    let arr = [4, 5, 2]
    arr.includes(4)
    console.log(this.$el)
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(66)
      }, 1000)
    }).finally(res => {
      console.log(333, res)
    })
  }
}
</script>
