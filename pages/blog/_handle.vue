<template>
  <div class="article-page">
    <blog-article-view :article="article" :products="collection ? collection.products : []" />
  </div>
</template>

<script>
import { getBlogArticle } from '@nacelle/nacelle-graphql-queries-mixins'

export default {
  mixins: [getBlogArticle]
}
</script>

<style lang="scss" scoped></style>

