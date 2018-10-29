<template>
  <div>
    <div>
      <div style="display: block; width: 100px; height: 100px; background: #f60; color: #fff" class="needsclick" @click="upload">
        <div>6666666</div>
      </div>
      <div class="upload-box">
        <div class="upload-img">
          +
        </div>
        <input ref="input" type="file" name="image" accept="image/*" @change='handleInputChange' id="upload1">
      </div>
      
      <img :src="urlImg" alt="" class="logo-img">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      urlImg: ''
    }
  },
  mounted () {},
  methods: {
    handleInputChange (e) {
      console.log(11, e)
      const file = e.target.files[0]
      const reader = new FileReader()
      // file转dataUrl是个异步函数，要将代码写在回调里
      reader.onload = (e) => {
        const result = e.target.result
        console.log(result)
        this.urlImg = result
      }

      reader.readAsDataURL(file)
    },
    upload () {
      console.log(11, this.$refs.input)
      this.$refs.input.click()
    }
  }
}
</script>
<style lang="less" scoped>
.upload-box {
  position: relative;
  margin: 10px;
}
.upload-img {
  width: 60px;
  height: 60px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 60px;
}
#upload1 {
  opacity: 0;
  // font-size: 2rem;
  width: 60px;
  height: 60px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}
#upload {
  display: none;
}
.logo-img {
  display: block;
  width: 300px;
  height: 500px;
}
</style>
