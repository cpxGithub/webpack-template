<template>
  <div id="app">
    <slot>test</slot>
    <el-button type="primary">主要按钮</el-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
