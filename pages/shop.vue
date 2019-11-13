<template>
  <div class="page page-shop">
    <page-content :page="page" :products="products" />
    <section class="section">
      <div class="container">
        <product-grid :products="products" :showAddToCart="true" :showQuantityUpdate="true" />
      </div>
      <div ref="fetchMore" class="fetch-more-component"></div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { fetchStatic } from '@nacelle/nacelle-tools'
import ProductGrid from '~/components/ProductGrid'

export default {
  name: 'home',
  components: {
    ProductGrid
  },
  data() {
    return {
      handle: 'shop',
      products: null,
      page: null
    }
  },
  async asyncData(context) {
    const pageData = await fetchStatic.pageData('shop', context)
    const shopPageData = await fetchStatic.shopPageData(context)
      
    return {
      ...pageData,
      ...shopPageData
    }
  },
  created () {
    if (!this.products && !this.noShopData) {
      this.$nacelleApollo.getShopPage(
        this.$apollo,
        {
          error: () => {
            this.$nacelleHelpers.debugLog('No product data.')
          }
        }
      )
    }

    if (!this.page && !this.noPageData) {
      this.$nacelleApollo.getPage(
        this.handle,
        this.$apollo,
        {
          error: () => {
            this.$nacelleHelpers.debugLog('No page data.')
          }
        }
      )
    }
  },
  methods: {
    pageError () {
      this.$nuxt.error({ statusCode: 404, message: 'Shop page does not exist' })
    }
  },
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