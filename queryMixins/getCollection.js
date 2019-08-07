import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import { mapState } from 'vuex'
export default {
  computed: {
    fetchMoreCursor() {
      if (this.collection.products) {
        return Array.from(this.collection.products).pop().cursor
      }
    },
    ...mapState(['collectionLimit'])
  },
  methods: {
    fetchMore() {
      // this.$apollo.queries.collection.fetchMore({
      //   // New variables
      //   variables: {
      //     cursor: this.fetchMoreCursor
      //   },
      //   // Transform the previous result with new data
      //   updateQuery: (previousResult, { fetchMoreResult }) => {
      //     console.log(fetchMoreResult)
      //     const oldProducts = transformEdges(
      //       previousResult.getCollectionByHandle.products
      //     ).map(product => {
      //       if (product) {
      //         let { images, variants, ...rest } = product
      //         return {
      //           ...rest,
      //           variants: transformEdges(variants)
      //         }
      //       }
      //       return product
      //     })
      //     const newProducts = transformEdges(
      //       fetchMoreResult.getCollectionByHandle.products
      //     ).map(product => {
      //       if (product) {
      //         let { images, variants, ...rest } = product
      //         return {
      //           ...rest,
      //           variants: transformEdges(variants)
      //         }
      //       }
      //       return product
      //     })
      //     // const hasMore = fetchMoreResult.tagsPage.hasMore
      //     // this.showMoreEnabled = hasMore
      //     return {
      //       collection: {
      //         __typename: previousResult.__typename,
      //         // Merging the tag list
      //         products: [...oldProducts, ...newProducts]
      //         // hasMore,
      //       }
      //     }
      //   }
      // })
    }
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
