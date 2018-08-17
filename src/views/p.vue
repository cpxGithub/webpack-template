<template>
  <div class="list-box">
    <p class="list-b">6--{{name}}</p>
  </div>
</template>
<script>
export default {
  props: ['name']
}
</script>

<style scoped>
.list-box {
  border: 3px solid firebrick;
}
</style>
