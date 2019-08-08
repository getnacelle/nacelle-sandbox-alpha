import getAllProducts from '~/queries/getAllProducts.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import getPageContentWithoutCollectionByHandle from '~/queries/getPageContentWithoutCollectionByHandle.gql'
import getBlogByHandle from '~/queries/getBlogByHandle.gql'
import getSpace from '~/queries/getSpace.gql'
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['collectionLimit'])
  },
  methods: {
    ...mapMutations('space', ['setLinklists']),
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
                  let { variants, ...rest } = product
                  return {
                    ...rest,
                    variants: variants ? transformEdges(variants) : []
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
    this.$apollo.addSmartQuery('space', {
      query: getSpace,
      update(data) {
        const space = data.getSpace

        if (space) {
          const { linklists } = space
          this.setLinklists(linklists)

          return space
        }

        return {}
      }
    }),
    this.$apollo.addSmartQuery('page', {
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
    })
    this.$apollo.addSmartQuery('products', {
      query: getAllProducts,
      update(data) {
        const products = data.getAllProducts

        if (products) {
          return transformEdges(data.getAllProducts).map(product => {
            let { images, variants, ...rest } = product
            return {
              ...rest,
              variants: variants ? transformEdges(variants) : []
            }
          })
        }

        return []
      }
    })

    this.$apollo.addSmartQuery('blog', {
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
    })

    this.prefetchCollection('beds')
    this.prefetchCollection('blankets')
    this.prefetchCollection('Sheets')
    this.prefetchCollection('consoles')
  }
}
