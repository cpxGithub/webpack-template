<template>
  <div id="app">
    <slot></slot>
    <div>hello world webpack</div>
    <div>{{t}}</div>
    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      t: 11999
    }
  }
}
</script>
