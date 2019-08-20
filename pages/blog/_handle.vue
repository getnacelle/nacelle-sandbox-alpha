<template>
  <div class="article-page">
    <blog-article-view :article="article" :products="collection ? collection.products : []" />
  </div>
</template>

<script>
import { getBlogArticle } from '@nacelle/nacelle-graphql-queries-mixins'

export default {
  mixins: [getBlogArticle],
  mounted() {
    if (JSON.stringify(this.article) == '{}') {
      this.$nuxt.error({
        statusCode: 404,
        message: 'That article could not be found'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

