<template>
  <div></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('events', ['log']),
    ...mapState('space', ['facebookCatalogID']),
    ...mapGetters('cart', ['quantityTotal']),
    ...mapState('cart', ['lineItems']),
    productIDs() {
      let productIDs = this.lineItems.map(item => {
        return item.productId
      })
    },
    logEntry() {
      return JSON.parse(JSON.stringify(this.log)).pop()
    }
  },
  watch: {
    log(log) {
      let vm = this
      switch (vm.logEntry.event) {
        case 'PAGE_VIEW':
          vm.facebookPageView()
          vm.googleAnalyticsPageView()
          break

        case 'PRODUCT_VIEW':
          vm.facebookProductView()
          vm.googleAnalyticsProductView()
          break

        case 'ADD_TO_CART':
          vm.facebookAddToCart()
          vm.googleAnalyticsAddToCart()
          break

        case 'REMOVE_FROM_CART':
          vm.googleAnalyticsRemoveFromCart()
          break

        case 'CHECKOUT':
          vm.facebookCheckoutInitiate()
          break
      }
    }
  },
  methods: {
    //// PAGE VIEW METHODS /////////////////////////////////
    facebookPageView() {
      fbq('track', 'PageView')
    },
    googleAnalyticsPageView() {
      ga('send', 'pageview', this.logEntry.page.pageUrl)
    },

    //// PRODUCT VIEW METHODS //////////////////////////////
    facebookProductView() {
      let vm = this
      fbq('track', 'ViewContent', {
        content_ids: vm.logEntry.product.productId,
        content_name: vm.logEntry.product.title,
        content_type: 'product',
        product_catalog_id: vm.facebookCatalogID
      })
    },

    googleAnalyticsProductView() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.logEntry.product.productId,
        name: vm.logEntry.product.title
      })
      ga('ec:setAction', 'detail')
      ga('send', 'pageview')
    },

    //// ADD TO CART METHODS ///////////////////////////////
    facebookAddToCart() {
      let vm = this
      fbq('track', 'AddToCart', {
        content_ids: vm.logEntry.product.productId,
        content_name: vm.logEntry.product.title,
        content_type: 'product',
        product_catalog_id: vm.facebookCatalogID
      })
    },

    googleAnalyticsAddToCart() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.logEntry.product.productId,
        name: vm.logEntry.product.title
      })
      ga('ec:setAction', 'add')
      ga('send', 'event', 'UX', 'click', 'add to cart')
    },

    //// REMOVE FROM CART METHODS ///////////////////////////////
    googleAnalyticsRemoveFromCart() {
      let vm = this
      ga('ec:addProduct', {
        id: vm.logEntry.lineItem.productId,
        name: vm.logEntry.lineItem.title
      })
      ga('ec:setAction', 'remove')
      ga('send', 'event', 'UX', 'click', 'remove from cart')
    },

    //// CHECKOUT INITIATION METHODS ///////////////////////////////
    facebookCheckoutInitiate() {
      let vm = this
      fbq('track', 'InitiateCheckout', {
        content_ids: vm.productIDs,
        content_type: 'product',
        num_items: vm.quantityTotal,
        product_catalog_id: vm.facebookCatalogID
      })
    }
  }
}
</script>