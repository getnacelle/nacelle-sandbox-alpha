<template>
  <div class="page page-shop">
    <component :is="sourceComponent" :content="pageContent" />
    <section class="section">
      <div class="container">
        <product-grid :products="products" :showAddToCart="true" :showQuantityUpdate="true" />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import getAllProducts from '../queries/getAllProducts.gql'
import getPageContentWithoutCollectionByHandle from '../queries/getPageContentWithoutCollectionByHandle.gql'
import transformEdges from '../plugins/utils/transformEdges'

export default {
  name: 'home',
  data() {
    return {
      products: null
    }
  },
  apollo: {
    products: {
      query: getAllProducts,
      update(data) {
        return transformEdges(data.getAllProducts).map(product => {
          if (product) {
            let { images, variants, ...rest } = product
            return {
              ...rest,
              variants: transformEdges(variants)
            }
          }

          return product
        })
      }
    },
    page: {
      query: getPageContentWithoutCollectionByHandle,
      variables() {
        return { handle: 'shop' }
      },
      update(data) {
        const { source, articles } = data.getBlogByHandle

        return {
          source,
          content: transformEdges(articles)
        }
      }
    }
  },
  computed: {
    sourceComponent() {
      if (this.page && this.page.source) {
        if (this.page.source === 'shopify') {
          return 'ShopifyPageContent'
        }
      }

      return 'div'
    },
    pageContent() {
      if (this.page && this.page.content && this.page.content.length > 0) {
        return this.page.content
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