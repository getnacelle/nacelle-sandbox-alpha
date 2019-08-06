import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import { mapState } from 'vuex'
export default {
  computed: {
    fetchMoreCursor() {
      if (this.collection.products) {
        return Array.from(this.collection.products).pop()
      }
    },
    ...mapState(['collectionLimit'])
  },
  methods: {
    fetchMore() {}
  },
  apollo: {
    collection: {
      query: getCollectionByHandle,
      variables() {
        return {
          handle: this.$route.params.handle,
          limit: this.collectionLimit
        }
      },
      update(data) {
        const { products, ...rest } = data.getCollectionByHandle || {}

        if (products) {
          const transformedProducts = transformEdges(products).map(product => {
            if (product) {
              let { variants, ...rest } = product
              return {
                ...rest,
                variants: variants ? transformEdges(variants) : []
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
