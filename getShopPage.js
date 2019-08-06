import getAllProducts from './node_modules/@nacelle/nacelle-nuxt-module/lib/queries/getAllProducts'
import getPageContentWithoutCollectionByHandle from './node_modules/@nacelle/nacelle-nuxt-module/lib/queries/getAllProducts'
import transformEdges from './node_modules/@nacelle/nacelle-nuxt-module/lib/utils/transformEdges'
export const getShopPage = {
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
          const { source, articles } = data.getBlogByHandle

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
