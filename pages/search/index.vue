<template>
  <div>
    <section class="section search-section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <search-box position="in-page" />
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <search-results
        :searchData="productData"
        :searchQuery="query"
        slotMode="multiple"
        v-if="productData"
      >
        <template v-slot:result="{ result }">
          <product-grid :products="result" />
        </template>
      </search-results>
    </section>
  </div>
</template>

<script>
import routesData from '~/static/data/products.json'
import transformEdges from '~/plugins/utils/transformEdges'
import SearchBox from '~/components/SearchBox'
import SearchResults from '~/components/SearchResults'
import { mapState } from 'vuex'
export default {
  components: {
    SearchBox,
    SearchResults
  },
  async asyncData({ params, $axios }) {
    let productData = await $axios(
      'http://localhost:3000/data/products.json'
    ).then(res => res.data)
    if (productData) {
      return {
        productData: productData
          .filter(route => {
            return (
              route.payload && route.payload.title && route.payload.variants
            )
          })
          .map(route => {
            route.payload.variants = transformEdges(route.payload.variants)
            return route.payload
          })
      }
    }
  },
  computed: {
    ...mapState('search', ['query']),
    searchResults() {
      if (this.productData && this.query) {
        let options = {
          keys: ['title'],
          threshold: 0.5
        }
        return new Fuse(this.productData, options).search(this.query)
      }
    }
  }
}
</script>

<style>
.search-section {
  background: whitesmoke;
}
</style>