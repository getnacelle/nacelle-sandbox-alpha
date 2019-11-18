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
import nmerge from 'nuxt-merge-asyncdata'
import { getShopPage, getPage } from '@nacelle/nacelle-graphql-queries-mixins'
import ProductGrid from '~/components/ProductGrid'

export default nmerge({
  name: 'shop',
  components: {
    ProductGrid
  },
  mixins: [ getShopPage(), getPage({ pageHandle: 'shop' }) ]
})
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