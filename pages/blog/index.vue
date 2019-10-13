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
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { staticBlogData } from '~/plugins/NacelleFetchStatic'
import ArticlePreview from '~/components/ArticlePreview'

export default {
  components: {
    ArticlePreview
  },
  data () {
    return {
      handle: 'blog',
      blog: null
    }
  },
  async asyncData({ params, app, payload }) {
    const blogData = staticBlogData('blog', app)
      
    return {
      ...blogData
    }
  },
  computed: {
    ...mapGetters('space', ['getMetatag']),
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
  },
  created() {
    if (!this.blog && !this.noBlogData) {
      this.$nacelleApollo.getBlog(
        this.handle,
        this.$apollo,
        {
          error: this.pageError
        }
      )
    }
  },
  methods: {
    pageError () {
      this.$nuxt.error({ statusCode: 404, message: 'does not exist' })
    }
  },
  head() {
    const properties = {}
    const meta = []
    const title = this.getMetatag('title')

    let fullTitle = 'Blog'
        
    if (title) {
      fullTitle = `${fullTitle} | ${title.value}`
    }

    properties.title = fullTitle
    meta.push({
      hid: 'og:title',
      property: 'og:title',
      content: fullTitle
    })

    return {
      ...properties,
      meta
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
