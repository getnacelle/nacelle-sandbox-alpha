<template>
  <div class="page">
    <div v-if="$apollo.loading">Loading...</div>
    <component :is="sourceComponent" :content="pageContent" :products="pageProducts" />
  </div>
</template>

<script>
import { getPage } from '@nacelle/nacelle-graphql-queries-mixins'
export default {
  mixins: [getPage],
  computed: {
    sourceComponent() {
      if (this.page && this.page.source) {
        if (this.page.source === 'shopify') {
          return 'ShopifyPageContent'
        }
      }

      return 'div'
    },
    pageProducts() {
      if (this.page && this.page.products && this.page.products.length > 0) {
        return this.page.products
      }

      return null
    },
    pageContent() {
      if (this.page && this.page.content && this.page.content.length > 0) {
        return this.page.content
      }

      return null
    }
  }
}
</script>
