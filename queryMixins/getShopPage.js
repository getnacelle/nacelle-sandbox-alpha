import getAllProducts from '../queries/getAllProducts.gql'
import getPageContentWithoutCollectionByHandle from '../queries/getPageContentWithoutCollectionByHandle.gql'
import transformEdges from '../plugins/utils/transformEdges'
export default {
  apollo: {
    products: {
      query: getAllProducts,
      update(data) {
        return transformEdges(data.getAllProducts).map(product => {
          if (product) {
            let { images, variants, ...rest } = product
            return {
              ...rest,
              variants: transformEdges(variants)
            }
          }

          return product
        })
      }
    },
    page: {
      query: getPageContentWithoutCollectionByHandle,
      variables() {
        return { handle: 'shop' }
      },
      update(data) {
        const page = data.getBlogByHandle

        if (page) {
          const { source, articles } = page

          return {
            source,
            content: transformEdges(articles)
          }
        }
        
        return page
      }
    }
  }
}
