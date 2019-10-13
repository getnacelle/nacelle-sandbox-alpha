<template>
  <div class="page">
    <div v-if="$apollo.loading">Loading...</div>
    <page-content :page="page" :products="products">
      <!-- 
        /****
        /* Customize Your Nacelle Content
        /****
      -->

        <!-- <template v-slot:section="{ section }"> -->

      <!-- 
            * Edit Hero Banner *
                Available slots:
                name: "background", data: "backgroundImgUrl", "mobileBackgroundImgUrl", "backgroundAltTag"
                name: "body", data: "title", "subtitle", "textColor"
                name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"

          <content-hero-banner
            v-if="section.contentType === 'ContentHeroBanner'"
            v-bind="section.data"
          >
            <template v-slot:body="{ title }">
              <h1 class="special-title">{{ title }}</h4>
            </template>
          </content-hero-banner>
      -->

      <!--
            * Edit Side-by-Side Section *
                Available slots:
                name: "body", data: "title", "copy"
                name: "cta", data: "ctaUrl", "ctaText", "ctaHandler"

          <content-side-by-side
            v-if="section.contentType === 'ContentSideBySide'"
            v-bind="section.data"
          />
      -->

      <!--
            * Edit Product Grid *
                Available slots:
                name: "header", data: "title"
                name: "products", data: "products", "columns"

          <content-product-grid
            v-if="section.contentType === 'ContentProductGrid'"
            v-bind="section.data"
          />
      -->

      <!-- 
            * Edit Testimonials *

          <content-testimonials
            v-if="section.contentType === 'ContentTestimonials'"
            v-bind="section.data"
          />
      -->

      <!-- </template> -->
    </page-content>
  </div>
</template>

<script>
import { staticPageData, staticCollectionData } from '~/plugins/NacelleFetchStatic'

export default {
  data() {
    return {
      handle: this.$route.params.handle,
      page: null,
      collection: null
    }
  },
  async asyncData({ params, app, payload }) {
    const { handle } = params
    const pageData = staticPageData(handle, app)
    const collectionData = staticCollectionData(handle, app)
      
    return {
      ...pageData,
      ...collectionData
    }
  },
  computed: {
    products () {
      if (
        this.collection &&
        this.collection.products &&
        Array.isArray(this.collection.products)
      ) {
        return this.collection.products
      }

      return []
    }
  },
  created () {
    if (!this.collection && !this.noCollectionData) {
      this.$nacelleApollo.getCollection(
        this.handle,
        this.$apollo,
        {
          error: () => {
            this.$nacelleHelpers.debugLog('No collection data.')
          }
        }
      )
    }

    if (!this.page && !this.noPageData) {
      this.$nacelleApollo.getPage(
        this.handle,
        this.$apollo,
        {
          error: this.pageError
        }
      )
    }
  },
  methods: {
    pageError () {
      this.$nuxt.error({ statusCode: 404, message: 'does not exist' })
    }
  }
}
</script>
