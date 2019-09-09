<template>
  <div class="app nacelle">
    <global-header ref="header" />
    <nuxt :style="{'margin-top': `${headerHeight}px`}" />
    <site-footer />
    <!-- <event-dispatcher /> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import localforage from 'localforage'
import { prefetchCollectionsAndContent } from '@nacelle/nacelle-graphql-queries-mixins'
import GlobalHeader from '~/components/GlobalHeader'
import SiteFooter from '~/components/SiteFooter'
export default {
  components: {
    GlobalHeader,
    SiteFooter
  },
  methods: {
    ...mapMutations('cart', ['hideCart', 'setFreeShippingThreshold']),
    ...mapActions('cart', ['updateLocalCart']),
    ...mapActions('user', ['readSession'])
  },
  mixins: [prefetchCollectionsAndContent],
  data() {
    return {
      headerHeight: null
    }
  },
  computed: {
    ...mapGetters('space', ['getMetatag'])
  },
  created() {},
  mounted() {
    this.headerHeight = this.$refs.header.$el.clientHeight
    this.updateLocalCart()
    this.setFreeShippingThreshold(100)

    this.hideCart()

    if (process.env.DEV_MODE == 'true') {
      console.log('dev mode active!')
      localforage.clear()
    }
    this.readSession()
  },
  head() {
    const properties = {}
    const meta = []
    const title = this.getMetatag('title')
    const description = this.getMetatag('description')
    const image = this.getMetatag('og:image')

    if (title) {
      properties.title = title.value
      meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: title.value
      })
      meta.push({
        hid: 'og:site_name',
        property: 'og:site_name',
        content: title.value
      })
    }

    if (description) {
      meta.push({
        hid: 'description',
        name: 'description',
        content: description.value
      })
      meta.push({
        hid: 'og:description',
        property: 'og:description',
        content: description.value
      })
    }

    if (image) {
      meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: image.value
      })
    }

    meta.push({
      hid: 'og:type',
      property: 'og:type',
      content: 'website'
    })

    return {
      ...properties,
      meta
    }
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
</style>
