<template>
  <div class="blog">
    <section v-if="featuredArticle" class="blog-feature">
      <article-preview
        :title="featuredArticle.title"
        :handle="featuredArticle.handle"
        :excerpt="featuredArticle.excerpt"
        :tags="featuredArticle.tags"
        :featuredMedia="featuredArticle.featuredMedia"
        :isFeatured="true"
      />
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="column is-4-desktop is-6-tablet"
          >
            <article-preview
              :title="article.title"
              :handle="article.handle"
              :excerpt="article.excerpt"
              :tags="article.tags"
              :featuredMedia="article.featuredMedia"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getBlog } from '@nacelle/nacelle-graphql-queries-mixins'
import ArticlePreview from '~/components/ArticlePreview'

export default {
  components: {
    ArticlePreview
  },
  mixins: [getBlog],
  computed: {
    blogProducts() {
      if (this.blog && this.blog.products && this.blog.products.length > 0) {
        return this.blog.products
      }

      return null
    },
    articles() {
      if (this.blog && this.blog.articles && this.blog.articles.length > 0) {
        return this.blog.articles
      }

      return []
    },
    featuredArticle() {
      if (this.articles.length > 0) {
        return this.articles[0]
      }

      return null
    },
    filteredArticles() {
      const copy = [...this.articles]
      return copy.splice(1, copy.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.columns /deep/ .article-preview {
  padding: 1rem;
  border: 1px solid #f5f5f5;
}
</style>
