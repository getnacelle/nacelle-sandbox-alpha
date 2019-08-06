import getArticleByHandle from '~/queries/getArticleByHandle.gql'
import getArticleCollectionByHandle from '~/queries/getArticleCollectionByHandle'
import transformEdges from '~/plugins/utils/transformEdges'
export default {
  apollo: {
    article: {
      query: getArticleByHandle,
      variables() {
        return {
          blogHandle: 'blog',
          articleHandle: this.$route.params.handle
        }
      },
      update(data) {
        return data.getArticleByHandle || {}
      }
    },
    collection: {
      query: getArticleCollectionByHandle,
      variables() {
        return {
          blogHandle: 'blog',
          articleHandle: this.$route.params.handle
        }
      },
      update(data) {
        const { collection, ...rest } = data.getArticleByHandle || {}
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
          ...rest,
          products: transformedProducts
        }
      }
    }
  }
}
