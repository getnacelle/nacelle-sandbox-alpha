import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import transformCollectionData from '~/plugins/utils/transformCollectionData'
import { mapState } from 'vuex'
import observeFetchMoreComponent from './observeFetchMoreComponent'
export default {
  computed: {
    fetchMoreCursor() {
      if (this.collection.products) {
        let index = this.collection.products.length - 1
        return this.collection.products[index].cursor
      }
    },
    ...mapState(['collectionLimit'])
  },
  methods: {
    fetchMore() {
      this.$apollo.queries.collection.fetchMore({
        variables: {
          cursor: this.fetchMoreCursor
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          let oldProducts = previousResult.getCollectionByHandle.products
          let newProducts = fetchMoreResult.getCollectionByHandle.products
          let { products, ...rest } = previousResult.getCollectionByHandle

          let joinedArray = union(oldProducts.edges, newProducts.edges)
          let uniqueArray = uniqBy(joinedArray, 'node.id')

          return {
            getCollectionByHandle: {
              ...rest,
              products: {
                edges: uniqueArray,
                __typename: oldProducts.__typename
              }
            }
          }
        }
      })
    }
  },

  mixins: [observeFetchMoreComponent],

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
        return transformCollectionData(data)
      }
    }
  }
}
