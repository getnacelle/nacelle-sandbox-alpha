<template>
  <div class="page">
    <div v-if="$apollo.loading">Loading...</div>
    <component
      :is="sourceComponent"
      :content="page.content"
      :products="page.products"
    />
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
        const products = (collection && collection.products) ? transformEdges(collection.products) : []
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
      if (this.page.source === 'shopify') {
        return 'ShopifyPageContent'
      }

      return 'div'
    }
  }
}
</script>
