<template>
  <div class="product">
    <section class="section">
      <div class="container">
        <product-details v-if="product" :product="product" />
      </div>
    </section>
    <section class="section product-meta" v-if="product">
      <div class="container">
        <div class="columns">
          <div class="column is-7">
            <h4 class="title is-4">What You're Getting</h4>
            <div class="content">
              <p>Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. What is the strength of the ship's deflector shields at maximum output? The wormhole's size and short period would make this a local phenomenon. Do you have sufficient data to compile a holographic simulation?</p>
            </div>
          </div>
          <div class="column is-4 is-offset-1 highlight">
            <h4 class="title is-4">Our Products</h4>
            <div class="content">
              <p>It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem, the entire nervous system has been depleted of electrochemical energy.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import transformEdges from '~/plugins/utils/transformEdges.js'
import ProductDetails from '~/components/ProductDetails'
import { getProduct } from '@nacelle/nacelle-graphql-queries-mixins'
import productMetafields from '@nacelle/nacelle-vue-components/dist/mixins/productMetafields'

import gql from 'graphql-tag'

export default {
  mixins: [productMetafields],
  components: {
    ProductDetails
  },
  data() {
    return {
      product: null
    }
  },
  computed: {
    ...mapGetters('space', ['getMetatag'])
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  },

  async asyncData({ params, app, payload }) {
    if (payload) {
      const { variants, media, ...rest } = payload
      const transformedProduct = {
        variants: variants ? transformEdges(variants) : [],
        media: media ? transformEdges(media) : [],
        ...rest
      }
      return { product: transformedProduct }
    }
  },
  head() {
    if (this.product) {
      const properties = {}
      const meta = []
      const title = this.getMetatag('title')

      if (this.product.title) {
        let fullTitle = this.product.title

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

      if (this.product.description) {
        meta.push({
          hid: 'description',
          name: 'description',
          content: this.product.description
        })
        meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: this.product.description
        })
      }

      if (this.product.featuredMedia) {
        meta.push({
          hid: 'og:image',
          property: 'og:image',
          content: this.product.featuredMedia.src
        })
      }

      return {
        ...properties,
        meta
      }
    }
  },
  created() {
    if (process.browser) {
      getProduct({
        apollo: this.$apollo,
        params: this.$route.params,
        store: this.$store,
        nuxt: this.$nuxt,
        context: 'component'
      })
    }
  },
  mounted() {
    if (process.browser) {
      this.$apollo.queries.product.startPolling(5000)
    }
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}

.product-meta .column {
  padding-bottom: 2rem;

  @media screen and (min-width: 769px) {
    padding-top: 3rem;
    padding-bottom: 0;
  }
}

.column.highlight {
  background-color: #f5f5f5;

  @media screen and (min-width: 769px) {
    padding: 3rem;
  }
}
</style>
