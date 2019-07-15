<template>
  <div class="page page-shop">
    <content-hero-banner
      v-if="collection"
      :title="collection.title"
      :backgroundImgUrl="featuredImage"
    />
    <section class="section">
      <div class="container">
        <product-grid
          v-if="products"
          :products="products"
          :showAddToCart="true"
          :showQuantityUpdate="true"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'

export default {
  name: 'home',
  data() {
    return {
      collection: null
    }
  },
  apollo: {
    collection: {
      query: getCollectionByHandle,
      variables() {
        return { handle: this.$route.params.handle }
      },
      update(data) {
        const { products, ...rest } = data.getCollectionByHandle || {}

        if (products) {
          const transformedProducts = transformEdges(products).map(product => {
            if (product) {
              let { images, variants, ...rest } = product
              return {
                ...rest,
                variants: transformEdges(variants)
              }
            }

            return product
          })

          return {
            products: transformedProducts,
            ...rest
          }
        }

        return {
          ...rest
        }
      }
    }
  },
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