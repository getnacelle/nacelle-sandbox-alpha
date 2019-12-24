<template>
  <div class="page">
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
import nmerge from 'nuxt-merge-asyncdata'
import { getPage, getCollection } from '@nacelle/nacelle-tools'

export default nmerge({
  mixins: [getPage(), getCollection()]
})
</script>
