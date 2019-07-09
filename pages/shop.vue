<template>
  <section class="section">
    <div class="container">
      <div v-if="$apollo.loading">Loading...</div>
      <content-product-grid
        v-if="!$apollo.loading"
        :title="'Shop'"
        :products="products"
      />
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import getAllProducts from '../queries/getAllProducts.gql'
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
          let { images, variants, ...rest } = product
          return {
            ...rest,
            variants: transformEdges(variants)
          }
        })
      }
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