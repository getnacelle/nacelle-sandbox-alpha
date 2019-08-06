import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
export default {
  apollo: {
    collection: {
      query: getCollectionByHandle,
      variables() {
        return { handle: this.$route.params.handle }
      },
      update(data) {
        const { products, ...rest } = data.getCollectionByHandle || {}

        if (products) {
          const transformedProducts = transformEdges(products).map(product => {
            if (product) {
              let { images, variants, ...rest } = product
              return {
                ...rest,
                variants: transformEdges(variants)
              }
            }

            return product
          })

          return {
            products: transformedProducts,
            ...rest
          }
        }

        return {
          ...rest
        }
      }
    }
  }
}
