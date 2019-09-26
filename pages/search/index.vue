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
      <div class="columns">
        <div class="column is-2">
          <search-filters
            :filterProperties="[{field:'productType', label:'Product Type'}, {field: `category`, label:'Category'}]"
            :passingConditions="[ {property: 'productType', conditional:'!=', value:'Blankets'}]"
            :inputData="productData"
            v-if="productData"
            v-on:updated="updateFilteredData"
          />
        </div>
        <div class="column is-10">
          <search-results :searchData="filteredData" :searchQuery="query" v-if="filteredData">
            <template v-slot:result="{ result }">
              <product-grid :products="result" :columns="3" />
            </template>
            <template v-slot:no-results>
              <search-no-results />
            </template>
          </search-results>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { allProductsJSON } from '@nacelle/nacelle-graphql-queries-mixins'
export default {
  // components: {
  //   SearchBox,
  //   SearchFilters,
  //   SearchResults,
  //   SearchNoResults
  // },
  data() {
    return {
      filteredData: null
    }
  },
  methods: {
    updateFilteredData(data) {
      this.filteredData = data
    }
  },
  mixins: [allProductsJSON]
}
</script>

<style>
.search-section {
  background: whitesmoke;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>