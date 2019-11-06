<template>
  <div class="page">
    <!-- Begin editing your homepage here -->
    <div v-if="!hasPageData">
      <content-hero-banner
        id="hero-banner"
        backgroundImgUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/hero-banner.jpg"
        backgroundAltTag="Update your new Nacelle Store"
        :title="name"
        ctaText="Shop Now"
        ctaUrl="/shop"
        :ctaHandler="() => { this.$router.push('/shop') }"
      />
      <content-side-by-side
        imageUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship1.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        ctaText="Shop Now"
        ctaUrl="/shop"
        backgroundColor="#f2eee8"
        :ctaHandler="() => { this.$router.push('/shop') }"
      />
      <content-side-by-side
        imageUrl="https://nacelle-assets.s3-us-west-2.amazonaws.com/starship2.jpg"
        title="Image With Text"
        copy="Connect Nacelle to your CMS to update content"
        ctaText="Shop Now"
        ctaUrl="/shop"
        backgroundColor="#f2eee8"
        :reverseDesktop="true"
        :ctaHandler="() => { this.$router.push('/shop') }"
      />
    </div>
    <!-- End of default content -->

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
import { mapState } from 'vuex'
import { fetchStatic } from '@nacelle/nacelle-tools'

export default {
  data() {
    return {
      handle: 'homepage',
      page: null,
      collection: null
    }
  },
  async asyncData(context) {
    const pageData = await fetchStatic.pageData('homepage', context)
    const collectionData = await fetchStatic.collectionData('homepage', context)
      
    return {
      ...pageData,
      ...collectionData
    }
  },
  computed: {
    ...mapState('space', ['name']),
    hasPageData() {
      if (this.page) {
        if (
          this.page.sections &&
          this.page.sections.length > 0
        ) {
          return true
        }

        if (
          this.page.fields &&
          this.page.fields.body
        ) {
          return true
        }

        return false
      }
    },
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
          error: () => {
            this.$nacelleHelpers.debugLog('No page data.')
          }
        }
      )
    }
  },
  methods: {
    pageError () {
      this.$nuxt.error({ statusCode: 404, message: 'Homepage does not exist' })
    }
  }
}
</script>
