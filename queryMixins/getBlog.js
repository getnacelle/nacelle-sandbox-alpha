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
        const blog = data.getBlogByHandle

        if (blog) {
          const { source, articles, collection } = blog
          const products =
            collection && collection.products
              ? transformEdges(collection.products)
              : []
          const transformedProducts = products.map(product => {
            const variants = product.variants ? transformEdges(product.variants) : []

            return {
              ...product,
              variants
            }
          })

          return {
            source,
            products: transformedProducts,
            articles: articles ? transformEdges(articles) : []
          }
        }

        return blog
      }
    }
  }
}
