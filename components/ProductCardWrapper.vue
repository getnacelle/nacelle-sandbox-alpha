<template>
  <product-card :product="product" :variant="variant" />
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import getProductVariant from '~/queryMixins/getProductVariant'
export default {
  props: {
    product: {
      type: Object
    }
  },
  data() {
    return {
      variant: null
    }
  }
}
</script>

<style>
</style>
