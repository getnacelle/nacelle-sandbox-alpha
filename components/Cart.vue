<template>
  <transition name="slide">
    <div class="flyout" v-if="cartVisible">
      <cart-flyout-header v-on:close="handleClose" />
      <cart-flyout-messaging>
        <messaging-free-shipping-counter />
      </cart-flyout-messaging>
      <div class="cart-items">
        <cart-item v-for="item in lineItems" :key="item.variant.id" :item="item"></cart-item>
      </div>
      <cart-flyout-subtotal />
      <cart-flyout-checkout-button />
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import CartItem from '~/components/CartItem'
export default {
  components: {
    CartItem
  },
  computed: {
    ...mapState('cart', ['lineItems', 'cartVisible'])
  },
  methods: {
    ...mapMutations('cart', [
      'showCart',
      'hideCart',
      'setFreeShippingThreshold'
    ]),
    ...mapActions('cart', ['updateLocalCart']),
    handleClose() {
      this.hideCart()
    }
  },
  watch: {
    lineItems(newValue) {
      if (newValue.length == 0) {
        this.hideCart()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flyout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  background-color: #ffffff;
  border-left: 1px solid #dedede7a;
  box-shadow: 20px 0px 20px 20px #e6e6e6c4;
  z-index: 999;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  .cart-items {
    flex-grow: 5;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.32s ease;
}

.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
}
</style>
