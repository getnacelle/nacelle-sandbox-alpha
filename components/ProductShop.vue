<template>
  <div class="product columns is-vcentered">
    <div class="column is-6">
      <product-media-select-view :featuredMedia="product.featuredMedia" :media="product.media" />
    </div>
    <div class="column is-5 is-offset-1">
      <product-title :title="product.title" />
      <product-category :category="product.productType" v-if="product.productType" />
      <p class="price">
        <product-price :price="product.variants[0].price" />
      </p>
      <product-description :description="product.description" />
      <div class="columns">
        <div class="column is-half">
          <product-quantity-update 
            :image="product.featuredMedia"
            :title="product.title"
            :productId="product.id"
            :handle="product.handle"
            :variant="product.variants[0]"
          />
        </div>
        <div class="column is-half">
          <product-add-to-cart-button
            :image="product.featuredMedia"
            :title="product.title"
            :productId="product.id"
            :handle="product.handle"
            :variant="product.variants[0]"
            @click.native="showCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      default: () => {}
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
