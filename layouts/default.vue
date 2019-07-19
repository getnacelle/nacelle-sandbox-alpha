<template>
  <div>
    <site-header :logoSrc="'/starship_logo.png'" ref="header">
      <template v-slot:menu>
        <nuxt-link :to="'/shop'" class="main-nav-item" @click.native="disableMenu">Shop All</nuxt-link>
        <nuxt-link :to="'/collections/beds'" class="main-nav-item" @click.native="disableMenu">Beds</nuxt-link>
        <nuxt-link
          :to="'/collections/blankets'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Blankets</nuxt-link>
        <nuxt-link
          :to="'/collections/Sheets'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Sheets</nuxt-link>
        <nuxt-link
          :to="'/collections/consoles'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Consoles</nuxt-link>
        <nuxt-link :to="'/blog/'" class="main-nav-item" @click.native="disableMenu">Blog</nuxt-link>
      </template>
      <template v-slot:flyout-menu>
        <nuxt-link :to="'/shop'" class="main-nav-item" @click.native="disableMenu">Shop</nuxt-link>
        <nuxt-link :to="'/collections/beds'" class="main-nav-item" @click.native="disableMenu">Beds</nuxt-link>
        <nuxt-link
          :to="'/collections/blankets'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Blankets</nuxt-link>
        <nuxt-link
          :to="'/collections/Sheets'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Sheets</nuxt-link>
        <nuxt-link
          :to="'/collections/consoles'"
          class="main-nav-item"
          @click.native="disableMenu"
        >Consoles</nuxt-link>
        <nuxt-link :to="'/blog/'" class="main-nav-item" @click.native="disableMenu">Blog</nuxt-link>
      </template>
    </site-header>
    <nuxt :style="{'margin-top': `${headerHeight}px`}" />
    <site-footer />
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import getAllProducts from '../queries/getAllProducts.gql'
import transformEdges from '../plugins/utils/transformEdges'
import getCollectionByHandle from '~/queries/getCollectionByHandle.gql'
import getPageContentWithoutCollectionByHandle from '../queries/getPageContentWithoutCollectionByHandle.gql'
import getBlogByHandle from '~/queries/getBlogByHandle.gql'
import SiteFooter from '~/components/SiteFooter'
export default {
  components: {
    SiteFooter
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapMutations('cart', ['hideCart', 'setFreeShippingThreshold']),
    ...mapActions('cart', ['updateLocalCart']),
    prefetchCollection(collectionHandle) {
      this.$apollo.addSmartQuery(collectionHandle, {
        query: getCollectionByHandle,
        variables() {
          return { handle: collectionHandle }
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
  data() {
    return {
      headerHeight: null
    }
  },
  created() {},
  mounted() {
    this.headerHeight = this.$refs.header.$el.clientHeight
    this.updateLocalCart()
    this.setFreeShippingThreshold(100)

    this.hideCart()

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

    this.$apollo.addSmartQuery('collection', {
      query: getCollectionByHandle,
      variables() {
        return { handle: 'beds' }
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
</script>


<style lang="scss">
.cart {
  z-index: 9999;
  background: white;
}

html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

// Custom site header styles
.main-nav-right {
  flex-grow: 1;
  @media screen and (max-width: 786px) {
    flex-grow: unset;
  }
}
.main-nav-brand {
  @media screen and (max-width: 786px) {
    margin-left: -1rem;
  }
}

.main-nav-menu {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

button.main-nav-cart {
  // width: 112px;
  text-align: right;
}
</style>
