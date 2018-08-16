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
    <div v-bind="{ id: someProp, 'other-attr': otherProp }">222222222</div>
  </div>
</template>
<script>
import TestP from "./p";
export default {
  data() {
    return {
      ad: 33,
      someProp: "ddd",
      otherProp: 12,
      error: 66,
      results: 33
    };
  },
  props: {
    name: {
      type: String,
      default: "aaa"
    }
  },
  components: {
    TestP
  },
  watch: {
    function() {
      console.log(11);
      return this.ad;
    },
    function(params) {
      console.log(332, params);
    }
  },
  mounted() {
    console.log(this.$el);
  }
};
</script>

<style lang="less" scoped>
.list-box /deep/ .list-b {
  color: #f60;
  font-size: 36px;
}
.list-box {
  width: 300px;
  height: 50px;
  border: 1px solid #f60;
  margin-bottom: 30px;
}
.box {
  width: 500px;
  height: 300px;
  background: url("~@/assets/img/1.jpg") no-repeat top/contain;
}
</style>
