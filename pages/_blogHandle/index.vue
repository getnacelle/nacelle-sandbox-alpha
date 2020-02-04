<template>
  <div class="blog">
    <section v-if="featuredArticle" class="blog-feature">

      <article-preview
        :title="featuredArticle.title || ''"
        :handle="featuredArticle.handle || ''"
        :excerpt="featuredArticle.excerpt || ''"
        :tags="featuredArticle.tags"
        :featured-media="featuredArticle.featuredMedia"
        :is-featured="true"
        :path-fragment="`/${$route.params.blogHandle}/`"
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
              :title="article.title || ''"
              :handle="article.handle || ''"
              :excerpt="article.excerpt || ''"
              :tags="article.tags"
              :featured-media="article.featuredMedia"
              :path-fragment="`/${$route.params.blogHandle}/`"
            />
          </div>
        </div>
        <div
            ref="fetchMore"
            class="fetch-more-component"
          />
      </div>
    </section>
  </div>
</template>
<script>
import nacelleVue from '@nacelle/nacelle-vue-components/dist/nacelleVueInstance.js'
export default nacelleVue({type:'blog-collection'})
</script>

<style lang="scss" scoped>
.columns /deep/ .article-preview {
  padding: 1rem;
  border: 1px solid #f5f5f5;
}
</style>
