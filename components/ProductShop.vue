<template>
  <div class="product columns is-vcentered">
    <div class="column is-6">
      <product-media-select-view :featuredMedia="product.featuredMedia" :media="product.media" />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <product-category :category="product.productType" v-if="product.productType" />
      <p class="price">
        <product-price :price="currentVariant.price" />
      </p>
      <product-description :description="product.description" />
      <product-variant-select :product="product" :variant="currentVariant" />
      <!-- <product-options
        v-if="product.options[0].values.length > 1"
        :options="product.options"
        v-on:selectedOptions="captureOptions"
      />
      <div class="columns">
        <div class="column is-half">
          <product-quantity-update
            :image="product.featuredMedia"
            :title="product.title"
            :productId="product.id"
            :handle="product.handle"
            :variant="variant || {}"
          />
        </div>
        <div class="column is-half">
          <product-add-to-cart-button
            :image="product.featuredMedia"
            :title="product.title"
            :productId="product.id"
            :handle="product.handle"
            :variant="variant || {}"
            @click.native="showCart"
          />
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import getProductVariant from '~/queryMixins/getProductVariant'
export default {
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
  mixins: [getProductVariant],
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
