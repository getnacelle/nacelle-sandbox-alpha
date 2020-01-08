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
          <refinement-filters
            v-if="productData"
            :filterProperties="[
              {
                field:'productType',
                label:'Product Type'
              },
              {
                field: `category`,
                label:'Category'
              }
            ]"
            :inputData="productData"
            v-on:updated="updateFilteredData"
          />
        </div>
        <div class="column is-10">
          <search-results
            v-if="filteredData"
            :searchData="filteredData"
            :searchQuery="query"
          >
            <template v-slot:result="{ result }">
              <product-grid :products="result" :columns="3" />
              <!-- <pre>{{ result.length }}</pre> -->
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
import nacelleVue from "@nacelle/nacelle-vue-components/dist/nacelleVueInstance.js"
export default nacelleVue({
  type: "search",
})
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