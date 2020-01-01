<template>
  <div class="page page-shop" v-if="collection">
    <content-hero-banner
      v-if="collection"
      :title="collection.title"
      :backgroundImgUrl="featuredImage"
    />
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <product-grid
            v-if="products && products.length > 0"
            :products="products"
            :showAddToCart="true"
            :showQuantityUpdate="true"
          />
        </div>
      </div>
      <div ref="fetchMore" class="fetch-more-component" />
    </section>
  </div>
</template>

<script>
import nacelleVue from "@nacelle/nacelle-vue-components/dist/nacelleVueInstance.js"
export default nacelleVue({
  type: "collection"
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