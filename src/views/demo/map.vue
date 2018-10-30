<template>
  <section class="map-container">
    <div class="map-demo">
      <map-echart el-name=".map-demo" :map-data="dataList"></map-echart>
    </div>
  </section>
</template>
<script>
import 'styles/map.less'
import MapEchart from 'components/common/MapEchart'
export default {
  data () {
    return {
      dataList: [{
        name: '武汉',
        value: [114.31, 30.52, 55],
        storeData: {name: 11},
        itemStyle: { // 不合格点样式
          color: '#FF2943'
        }
      },
      {
        name: '深圳',
        storeData: {name: false},
        value: [114.06, 22.54, 99]
      }]
    }
  },
  methods: {
    formation (params) { // 展示框
      let str
      str = `
        <div class="map-info-box">
        fkadsjflj
        </div>
      `
      return str
    }
  },
  components: {
    MapEchart
  }
}
</script>
