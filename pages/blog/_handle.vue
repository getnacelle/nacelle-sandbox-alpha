<template>
  <div class="article-page">
    <article-view :article="article" :products="collection ? collection.products : []" />
  </div>
</template>

<script>
import { getBlogArticle } from '@nacelle/nacelle-graphql-queries-mixins'
import ArticleView from '~/components/ArticleView'

export default {
  components: {
    ArticleView
  },
  mixins: [getBlogArticle]
}
</script>

<style lang="scss" scoped></style>

