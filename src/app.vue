<template>
  <div>
    <slot></slot>
    <div>hello world</div>
    <div>{{t}}</div>
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
