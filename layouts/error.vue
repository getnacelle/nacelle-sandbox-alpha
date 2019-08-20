<template>
  <div>
    <div v-if="error" class="error">
      <h1>{{error.statusCode}}</h1>
      <p>{{error.message}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>


<style lang="scss" scoped>
h1 {
  font-weight: 500;
  text-align: center;
  font-size: 72pt;
}
p {
  text-align: center;
}
.error {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
