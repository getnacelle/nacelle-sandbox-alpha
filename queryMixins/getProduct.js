import getProductByHandle from '~/queries/getProductByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'

export default {
  apollo: {
    product: {
      query: getProductByHandle,
      variables() {
        return { handle: this.$route.params.handle }
      },
      update(data) {
        const product = data.getProductByHandle

        if (product) {
          let { variants, media, ...rest } = product
          return {
            variants: variants ? transformEdges(variants) : [],
            media: media ? transformEdges(media) : [],
            ...rest
          }
        }
      }
    }
  }
}
