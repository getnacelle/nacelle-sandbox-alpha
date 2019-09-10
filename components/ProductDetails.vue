<template>
  <div class="product columns">
    <div class="column is-6">
      <product-media-select-view :featuredMedia="product.featuredMedia" :media="product.media" />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <!-- <product-add-to-cart-button
        :product="product"
        :variant="currentVariant"
        :allOptionsSelected="true"
        :onlyOneOption="true"
        :metafields="[{key:'test', value:'hi'}]"
      />-->
      <product-category :category="product.productType" v-if="product.productType" />
      <p class="price">
        <product-price :price="currentVariant.price" v-if="currentVariant" />
      </p>

      <product-description :description="product.description" />
      <product-variant-select :product="product" :variant="currentVariant" v-if="currentVariant" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
//import your own components here
//import ProductSpecial from '~/components/ComponentName'
export default {
  components: {
    //export your components by name here:
    // ComponentName
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    variant(val) {
      if (val != null) {
        this.setVariant(this.variant)
      }
    }
  },
  computed: {
    currentVariant() {
      if (this.variant != null) {
        return this.variant
      } else {
        return this.product.variants[0]
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}
</style>
