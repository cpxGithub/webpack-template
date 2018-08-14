<template>
  <div></div>
</template>
<script>
let linkUrl
export default {
  beforeRouteEnter (to, from, next) {
    linkUrl = {name: from.name, query: from.query}
    next()
  },
  created () {
    this.$router.push(linkUrl)
  }
}
</script>
