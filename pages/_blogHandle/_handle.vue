<template>
  <div class="article-page">
    <article class="article">
      <div class="article-hero">
        <transition name="fade">
          <interface-featured-media
            v-if="article && article.featuredMedia"
            :media="article.featuredMedia"
          />
        </transition>
      </div>
      <div class="container">
        <transition name="fadeDelay">
          <div v-if="article" class="columns is-centered is-multiline">
            <div class="article-header column is-6 has-text-centered">
              <!-- 
              * Edit Blog Article Header *
                Available slots:
                name: "tags", data: "tags"
                name: "title", data: "title"
                name: "author", data: "author"
                name: "date", data: "date"
              -->
              <blog-article-header
                :title="article.title"
                :author="article.author"
                :tags="article.tags"
                :publishDate="article.publishDate"
              >
                <!-- Extra HTML markup can also be added below the default header content -->
              </blog-article-header>
            </div>
            <div class="column is-9 content">
              <blog-article-content
                :article="article"
                :products="products"
              >
                <!-- Extra HTML added after content -->
                <nuxt-link
                  :to="`/${$route.params.blogHandle}/`"
                  class="breadcrumb"
                >
                  Back to Blog
                </nuxt-link>
              </blog-article-content>
            </div>
          </div>
        </transition>
      </div>
    </article>
  </div>
</template>

<script>
import nacelleVue from '@nacelle/nacelle-vue-components/dist/nacelleVueInstance.js'
export default nacelleVue({type:'blog-article'})
</script>

<style lang="scss" scoped>
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

.article .container {
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

.article-body .content {
  position: relative;
}

.fade-enter-active {
  transition: opacity 0.25s;
}
.fade-enter {
  opacity: 0;
}

.fadeDelay-enter-active {
  transition: opacity 0.55s 0.25s;
}
.fadeDelay-enter {
  opacity: 0;
}
</style>

