import getProductVariant from '~/queries/getProductVariant'

export default {
  apollo: {
    variant: {
      query: getProductVariant,
      variables() {
        return {
          handle: this.product.handle,
          selectedOptions: this.selectedOptions
        }
      },
      skip() {
        if (
          this.selectedProduct != null &&
          this.allOptionsSelected &&
          this.product.id == this.selectedProduct.id
        ) {
          console.log('hi')
          return false
        } else {
          return true
        }
      },
      update(data) {
        return data.getProductByHandle.variantByOptions
      }
    }
  }
}
