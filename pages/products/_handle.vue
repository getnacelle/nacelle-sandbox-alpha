<template>
  <section class="section">
    <div class="container">
      <div v-if="$apollo.loading">Loading...</div>
      <div v-if="product" class="product columns is-vcentered">
        <div class="column is-6">
          <product-media-select-view :featuredMedia="product.featuredMedia" :media="product.media" />
        </div>
        <div class="column is-5 is-offset-1">
          <ProductTitle :title="product.title" />
          <product-category :category="product.productType" v-if="product.productType" />
          <p class="price">
            <ProductPrice :price="product.variants[0].price" />
          </p>
          <ProductDescription :description="product.description" />
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
              <ProductAddToCartButton
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
    </div>
  </section>
</template>

<script>
import getProductByHandle from '../../queries/getProductByHandle.gql'
import transformEdges from '../../plugins/utils/transformEdges'
import { mapMutations } from 'vuex'
export default {
  apollo: {
    product: {
      query: getProductByHandle,
      variables() {
        return { handle: this.$route.params.handle }
      },
      update(data) {
        let { images, variants, media, ...rest } = data.getProductByHandle
        return {
          variants: transformEdges(variants),
          media: transformEdges(media),
          ...rest
        }
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
