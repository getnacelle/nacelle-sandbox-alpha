<template>
  <div class="page">
    <div v-if="$apollo.loading">Loading...</div>
    <component :is="sourceComponent" :content="pageContent" :products="pageProducts" />
  </div>
</template>

<script>
import getPageContentByHandle from '~/queries/getPageContentByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'

export default {
  apollo: {
    page: {
      query: getPageContentByHandle,
      variables() {
        return { handle: 'homepage' }
      },
      update(data) {
        const { source, articles, collection } = data.getBlogByHandle
        const products =
          collection && collection.products
            ? transformEdges(collection.products)
            : []
        const transformedProducts = products.map(product => {
          const variants = transformEdges(product.variants)

          return {
            ...product,
            variants
          }
        })

        return {
          source,
          products: transformedProducts,
          content: transformEdges(articles)
        }
      }
    }
  },
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
