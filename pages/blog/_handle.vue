<template>
  <div class="article">
    <div class="article-hero">
      <transition name="fade">
        <featured-media
          v-if="article && article.featuredMedia"
          :media="article.featuredMedia"
        />
      </transition>
    </div>
    <div class="article-body container">
      <transition name="fadeDelay">
        <div v-if="article" class="columns is-centered is-multiline">
          <div  class="article-header column is-6 has-text-centered">
            <h5
              v-if="article.tags && article.tags.length > 0"
              class="article-tags"
            >
              {{ article.tags.join(', ') }}
            </h5>
            <h1 class="title is-3">
              {{ article.title }}
            </h1>
            <blog-publish-date :date="article.publishDate" />
          </div>
          <div class="column is-9">
            <div class="content" v-html="content" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import getArticleByHandle from '~/queries/getArticleByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import FeaturedMedia from '~/components/FeaturedMedia'

export default {
  components: {
    FeaturedMedia
  },
  apollo: {
    article: {
      query: getArticleByHandle,
      variables() {
        return {
          blogHandle: 'blog',
          articleHandle: this.$route.params.handle
        }
      },
      update(data) {
        const { collection, ...rest } = data.getArticleByHandle || {}
        const products = (collection && collection.products) ? transformEdges(collection.products) : []

        return {
          ...rest,
          products
        }
      }
    }
  },
  computed: {
    content() {
      if (
        this.article &&
        this.article.fields &&
        this.article.fields.content
      ) {
        return this.article.fields.content
      }

      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.article {

}

.article-hero {
  height: 300px;
  background: #f5f5f5;

  @media screen and (min-width: 769px) {
    height: 400px;
  }

  /deep/ .featured-media {
    width: 100%;
    height: 100%;

    figure,
    img {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: cover;
    }
  }
}

.article-body {
  position: relative;
  margin-top: -3rem;
  padding: 2rem;
  padding-bottom: 5rem;
  background-color: #ffffff;
  border: 1px solid #f5f5f5;
  max-width: 1024px;
}

.article-tags {
  margin-bottom: 1em;
}

.fade-enter-active {
  transition: opacity .25s;
}
.fade-enter {
  opacity: 0;
}

.fadeDelay-enter-active {
  transition: opacity .55s 0.25s;
}
.fadeDelay-enter {
  opacity: 0;
}
</style>

