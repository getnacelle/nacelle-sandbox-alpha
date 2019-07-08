<template>
  <section class="section">
    <div class="container">
      <div v-if="$apollo.loading">Loading...</div>
      <div class="products columns is-multiline">
        <div v-for="product in products" class="column is-3" :key="product.id">
          <router-link class="product" :to="'products/' + product.handle">
            <img v-if="product.featuredMedia" :src="`${product.featuredMedia.src}&width=500`" />
            <div class="details">
              <div class="title">{{product.title}}</div>
              <ProductPrice :price="product.priceRange.min" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
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
            ...rest
          }
        })
      }
    }
  },
  mounted() {
    const axios = require('axios')
    axios({
      method: 'post',
      url: 'https://hailfrequency.com/graphql/v1/space/12345',
      headers: {
        'Content-Type': 'application/json',
        'x-nacelle-token': 'defAValidToken'
      },
      data: {
        query: `mutation {
          processCheckout(input: {cartItems: [{variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yODU2ODgyMDIyMDAwOQ==", quantity: 1}]}) {
            id
            url
            completed
          }
        }`
      }
    }).then(res => {
      console.log(res.data)
    })
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