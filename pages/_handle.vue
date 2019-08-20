<template>
  <div>{{this.$route.params.handle}}</div>
</template>

<script>
import { getPage } from '@nacelle/nacelle-graphql-queries-mixins'
export default {
  mixins: [getPage]
}
</script>

<style>
</style>
