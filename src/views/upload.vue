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
import 'styles/upload.less'
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
