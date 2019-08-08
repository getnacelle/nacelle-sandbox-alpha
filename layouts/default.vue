<template>
  <div>
    <site-header :logoSrc="'/starship_logo.png'" logoAlt="Starship" ref="header">
      <template v-slot:menu>
        <nuxt-link
          v-for="(link, index) in mainMenu"
          :key="index"
          :to="link.to"
          active-class="is-active"
          class="main-nav-item"
          @click.native="disableMenu"
        >
          {{ link.title }}
        </nuxt-link>
      </template>
      <template v-slot:flyout-menu>
        <nuxt-link
          v-for="(link, index) in mainMenu"
          :key="index"
          :to="link.to"
          class="main-nav-item"
          @click.native="disableMenu"
        >
          {{ link.title }}
        </nuxt-link>
      </template>
    </site-header>
    <nuxt :style="{'margin-top': `${headerHeight}px`}" />
    <site-footer />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import prefetchCollectionsAndContent from '~/queryMixins/prefetchCollectionsAndContent'
import SiteFooter from '~/components/SiteFooter'
export default {
  components: {
    SiteFooter
  },
  methods: {
    ...mapMutations('menu', ['disableMenu']),
    ...mapMutations('cart', ['hideCart', 'setFreeShippingThreshold']),
    ...mapActions('cart', ['updateLocalCart'])
  },
  mixins: [prefetchCollectionsAndContent],
  data() {
    return {
      headerHeight: null
    }
  },
  computed: {
    ...mapState('space', ['linklists']),
    mainMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(linklist => linklist.handle === 'main-menu')


        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    },
  },
  created() {},
  mounted() {
    this.headerHeight = this.$refs.header.$el.clientHeight
    this.updateLocalCart()
    this.setFreeShippingThreshold(100)
    this.hideCart()
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
