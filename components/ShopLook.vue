<template>
  <div class="shop-look" :style="inlineStyle">
    <img :src="imageSrc" alt="" @click="toggleProductCard" />
    <button class="button is-primary" @click="toggleProductCard">
      Shop the look
    </button>
    <div class="shop-look-product" :class="{ 'is-visible': productVisible }">
      <div style="position: relative">
        <product-card :product="product" />
        <interface-close-button class="close" v-on:close="toggleProductCard" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductShop from '~/components/ProductShop'

export default {
  components: {
    ProductShop
  },
  props: {
    imageSrc: {
      type: String,
      default: '',
      required: true
    },
    product: {
      type: Object,
      required: true
    },
    top: {
      type: Number,
    },
    left: {
      type: Number
    }
  },
  data() {
    return {
      productVisible: false
    }
  },
  mounted() {
    this.$emit('ready', this.$el)
  },
  computed: {
    inlineStyle() {
      // return `position: absolute; top: ${this.top}px; left: ${this.left}px`
    }
  },
  methods: {
    toggleProductCard() {
      this.productVisible = !this.productVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-look {
  position: relative;
  overflow: hidden;
  border: 1px solid #f5f5f5;
}

img {
  display: block;
  width: 100%;
}

.button {
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  &.is-primary {
    letter-spacing: 1px;
    border-radius: 0;
    border: 0;
    outline: 0;
    box-shadow: none;
    background-color: #3b3b3b;
    color: #fff;
  }
}

.shop-look-product {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  transform: translate3d(0, -100%, 0);
  background-color: #ffffff;
  transition: all 0.15s linear;
  overflow: scroll;

  &.is-visible {
    transform: translate3d(0, 0, 0);
  }

  @media screen and (max-width: 499px) {
    padding-top: 4rem;
    box-shadow: 0 8px 10px 0 rgba(#3b3b3b, 0.5);

    .close {
      position: fixed;
      top: 4rem;
      left: auto;
    }
  }

  @media screen and (min-width: 500px) {
    position: absolute;
    max-width: 400px;
    transform: translate3d(-100%, 0, 0);
  }
}

.close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 0.87rem;
}
</style>

