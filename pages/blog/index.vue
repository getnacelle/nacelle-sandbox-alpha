<template>
  <div>
    blog index
    {{hi}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('test', ['hi'])
  }
}
</script>

<style>
</style>
