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
            v-if="section.props.contentType === 'ContentHeroBanner'"
            v-bind="section.props"
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
            v-if="section.props.contentType === 'ContentSideBySide'"
            v-bind="section.props"
          />
          -->

          <!--
            * Edit Product Grid *
                Available slots:
                name: "header", data: "title"
                name: "products", data: "products", "columns"

          <content-product-grid
            v-if="section.props.contentType === 'ContentProductGrid'"
            v-bind="section.props"
          />
          -->

          <!-- 
            * Edit Testimonials *

          <content-testimonials
            v-if="section.props.contentType === 'ContentTestimonials'"
            v-bind="section.props"
          />
          -->

        <!-- </template> -->
    </page-content>
  </div>
</template>

<script>
import { getPage } from '@nacelle/nacelle-graphql-queries-mixins'
export default {
  data() {
    return {
      handle: this.$route.params.handle
    }
  },
  mixins: [getPage]
}
</script>
