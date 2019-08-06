<template>
  <div class="page page-shop">
    <content-hero-banner
      v-if="collection"
      :title="collection.title"
      :backgroundImgUrl="featuredImage"
    />
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <product-card-wrapper
            class="column is-4"
            v-for="product in products"
            :product="product"
            :key="product.id"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ProductCardWrapper from '~/components/ProductCardWrapper'
import getCollection from '~/queryMixins/getCollection'

export default {
  name: 'home',
  data() {
    return {
      collection: null
    }
  },
  components: {
    ProductCardWrapper
  },
  mixins: [getCollection],
  computed: {
    products() {
      if (
        this.collection &&
        this.collection.products &&
        this.collection.products.length
      ) {
        return this.collection.products
      }

      return null
    },
    featuredImage() {
      if (
        this.collection &&
        this.collection.featuredMedia &&
        this.collection.featuredMedia.src
      ) {
        return this.collection.featuredMedia.src
      }

      return null
    }
  }
}
</script>
<style lang="scss" scoped>
// .products {
//   display: flex;
//   flex-wrap: wrap;
// }
.product {
  // width: 20rem;
  // height: 20rem;
  // text-decoration: none;
  // color: black;
  // display: flex;
  // flex-direction: column;
  // margin-bottom: 2rem;
  // flex-grow: 1;
  // justify-content: center;
  // align-items: center;
  .title {
    font-weight: bold;
  }
  img {
    width: 250px;
  }
}
</style>