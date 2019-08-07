import getAllProducts from '../queries/getAllProducts.gql'
import getPageContentWithoutCollectionByHandle from '../queries/getPageContentWithoutCollectionByHandle.gql'
import transformEdges from '../plugins/utils/transformEdges'
import observeFetchMoreComponent from './observeFetchMoreComponent'
import { mapState } from 'vuex'
import uniqBy from 'lodash.uniqby'
import union from 'lodash.union'

export default {
  computed: {
    fetchMoreCursor() {
      if (this.products) {
        let index = this.products.length - 1
        return this.products[index].cursor
      }
    },
    ...mapState(['collectionLimit'])
  },

  methods: {
    fetchMore() {
      this.$apollo.queries.products.fetchMore({
        variables: {
          cursor: this.fetchMoreCursor
        },

        updateQuery: (previousResult, { fetchMoreResult }) => {
          let oldProducts = previousResult.getAllProducts
          let newProducts = fetchMoreResult.getAllProducts
          let { edges, ...rest } = previousResult.getAllProducts

          let joinedArray = union(oldProducts.edges, newProducts.edges)
          let uniqueArray = uniqBy(joinedArray, 'node.id')

          return {
            getAllProducts: {
              edges: uniqueArray,
              ...rest
            }
          }
        }
      })
    }
  },
  mixins: [observeFetchMoreComponent],
  apollo: {
    products: {
      query: getAllProducts,
      variables() {
        return { limit: this.collectionLimit }
      },
      update(data) {
        const products = data.getAllProducts

        if (products) {
          return transformEdges(data.getAllProducts).map(product => {
            if (product) {
              let { images, variants, ...rest } = product
              return {
                ...rest,
                variants: variants ? transformEdges(variants) : []
              }
            }

            return product
          })
        }

        return []
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
            content: articles ? transformEdges(articles) : []
          }
        }

        return page
      }
    }
  }
}
