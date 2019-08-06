import getAllProducts from '~/queries/getAllProducts.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import getPageContentWithoutCollectionByHandle from '~/queries/getPageContentWithoutCollectionByHandle.gql'
import getBlogByHandle from '~/queries/getBlogByHandle.gql'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['collectionLimit'])
  },
  methods: {
    prefetchCollection(collectionHandle) {
      let vm = this
      this.$apollo.addSmartQuery(collectionHandle, {
        query: getCollectionByHandle,
        variables() {
          return { handle: collectionHandle, limit: vm.collectionLimit }
        },
        update(data) {
          const { products, ...rest } = data.getCollectionByHandle || {}

          if (products) {
            const transformedProducts = transformEdges(products).map(
              product => {
                if (product) {
                  let { images, variants, ...rest } = product
                  return {
                    ...rest,
                    variants: transformEdges(variants)
                  }
                }

                return product
              }
            )

            return {
              products: transformedProducts,
              ...rest
            }
          }

          return {
            ...rest
          }
        }
      })
    }
  },
  mounted() {
    this.$apollo.addSmartQuery('page', {
      query: getPageContentWithoutCollectionByHandle,
      variables() {
        return { handle: 'shop' }
      },
      update(data) {
        const { source, articles } = data.getBlogByHandle

        return {
          source,
          content: transformEdges(articles)
        }
      }
    })
    this.$apollo.addSmartQuery('products', {
      query: getAllProducts,
      update(data) {
        return transformEdges(data.getAllProducts).map(product => {
          let { images, variants, ...rest } = product
          return {
            ...rest,
            variants: transformEdges(variants)
          }
        })
      }
    })

    this.$apollo.addSmartQuery('blog', {
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
    })

    this.prefetchCollection('beds')
    this.prefetchCollection('blankets')
    this.prefetchCollection('Sheets')
    this.prefetchCollection('consoles')
  }
}
