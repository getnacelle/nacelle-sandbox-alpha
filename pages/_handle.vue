<template>
  <div></div>
</template>

<script>
import { getPage } from '@nacelle/nacelle-graphql-queries-mixins'
export default {
  data() {
    return {
      handle: this.$route.params.handle
    }
  },
  mixins: [getPage],
  mounted() {
    if (this.page == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: 'That page could not be found'
      })
    }
  }
}
</script>

<style>
</style>
