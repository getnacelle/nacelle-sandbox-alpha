<template>
  <div class="columns is-multiline is-paddingless">
    <div v-for="product in products" :key="product.id" :class="columnClasses">
      <product-card
        :product="product"
        :showQuantityUpdate="showQuantityUpdate"
        :showAddToCart="showAddToCart"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    },
    showQuantityUpdate: {
      type: Boolean,
      default: false
    },
    showAddToCart: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columnClasses() {
      let classes = 'column'

      if (this.columns === 4) {
        classes = `${classes} is-one-quarter-desktop`
      }

      if (this.columns === 3) {
        classes = `${classes} is-one-third-desktop`
      }

      if (this.columns === 2) {
        classes = `${classes} is-half-desktop`
      }

      classes = `${classes} is-half-tablet`

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  padding-bottom: 3rem;
}
</style>

