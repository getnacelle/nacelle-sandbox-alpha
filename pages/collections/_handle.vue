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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { getCollection } from '@nacelle/nacelle-tools'

export default {
  name: 'home',
  mixins: [ getCollection() ],
  computed: {
    ...mapGetters('space', ['getMetatag']),
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
  },
  methods: {
    pageError () {
      this.$nuxt.error({ statusCode: 404, message: 'Page does not exist' })
    }
  },
  head() {
    if (this.collection) {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      if (this.collection.title) {
        let fullTitle = this.collection.title

        if (title) {
          fullTitle = `${fullTitle} | ${title.value}`
        }

        properties.title = fullTitle
        meta.push({
          hid: 'og:title',
          property: 'og:title',
          content: fullTitle
        })
      }

      if (this.collection.description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.collection.description
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: this.collection.description
        })
      }

      if (this.featuredImage) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: this.featuredImage
        })
      }

      return {
        ...properties,
        meta
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