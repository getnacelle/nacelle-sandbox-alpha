<template>
  <div class="product">
    <section class="section">
      <div class="container">
        <product-shop v-if="product" :product="product" />
      </div>
    </section>
    <section class="section product-meta">
      <div class="container">
        <div class="columns">
          <div class="column is-7 ">
            <h4 class="title is-4">
              What You're Getting
            </h4>
            <div class="content">
              <p>
                Run a manual sweep of anomalous airborne or electromagnetic readings. Radiation levels in our atmosphere have increased by 3,000 percent. Electromagnetic and subspace wave fronts approaching synchronization. What is the strength of the ship's deflector shields at maximum output? The wormhole's size and short period would make this a local phenomenon. Do you have sufficient data to compile a holographic simulation?
              </p>
            </div>
          </div>
          <div class="column is-4 is-offset-1 highlight">
            <h4 class="title is-4">
              Our Products
            </h4>
            <div class="content">
              <p>
                It indicates a synchronic distortion in the areas emanating triolic waves. The cerebellum, the cerebral cortex, the brain stem,  the entire nervous system has been depleted of electrochemical energy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import getProductByHandle from '../../queries/getProductByHandle.gql'
import transformEdges from '../../plugins/utils/transformEdges'
import { mapMutations } from 'vuex'
import ProductShop from '~/components/ProductShop'

export default {
  components: {
    ProductShop
  },
  apollo: {
    product: {
      query: getProductByHandle,
      variables() {
        return { handle: this.$route.params.handle }
      },
      update(data) {
        let { images, variants, media, ...rest } = data.getProductByHandle
        return {
          variants: transformEdges(variants),
          media: transformEdges(media),
          ...rest
        }
      }
    }
  },
  methods: {
    ...mapMutations('cart', ['showCart'])
  }
}
</script>

<style lang="scss" scoped>
.price {
  margin-bottom: 1rem;
}

.product-meta .column {
  padding-bottom: 2rem;

  @media screen and (min-width: 769px) {
    padding-top: 3rem;
    padding-bottom: 0;
  }
}

.column.highlight {
  background-color: #f5f5f5;

  @media screen and (min-width: 769px) {
    padding: 3rem;
  }
}
</style>
