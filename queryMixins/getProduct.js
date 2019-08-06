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
        let { images, variants, media, ...rest } = data.getProductByHandle
        return {
          variants: transformEdges(variants),
          media: transformEdges(media),
          ...rest
        }
      }
    }
  }
}
