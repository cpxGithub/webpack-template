<template>
  <section class="map-container">
    <div class="map-demo">
      <map-echart el-name=".map-demo" :map-data="dataList"></map-echart>
    </div>
  </section>
</template>
<script>
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
      let classStr
      if (params.data.storeData.name) {
        classStr = 'warn-info'
      }
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
<style lang="less" scoped>
.map-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
}
.map-demo {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.map-info-box {
  width: 7rem;
  height: 2rem;
  box-sizing: border-box;
  padding: 0.4rem 0.3rem;
  .map-info-top {
    display: flex;
    justify-content: space-between;
    color: #001744;
    margin-bottom: 0.6rem;
    .info-title {
      font-size: 0.3rem;
    }
    .info-item {
      margin-right: 0.4rem;
    }
    .warn-info {
      font-size: 0.24rem;
      color: #FF2943;
    }
  }
  .map-info-b {
    font-size: 0.24rem;
    color: #A2AABA;
    .num-info {
      color: #3E7CFF;
    }
    .info-b-item {
      margin-right: 0.6rem;
    }
  }
}
</style>
