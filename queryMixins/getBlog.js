import getBlogByHandle from '~/queries/getBlogByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
export default {
  apollo: {
    blog: {
      query: getBlogByHandle,
      variables() {
        return { handle: 'blog' }
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
          articles: transformEdges(articles)
        }
      }
    }
  }
}
