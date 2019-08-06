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
        const page = data.getBlogByHandle

        if (page) {
          const { source, articles, collection } = page
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

        return page
      }
    }
  }
}
