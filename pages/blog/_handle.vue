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
          <div class="column is-9 content">
            <div v-html="content" ref="content" />
            <no-ssr>
              <shop-look
                v-for="(shopImage, index) in shopImages"
                :key="index"
                :imageSrc="shopImage.src"
                :product="shopImage.product"
                @ready="(node) => moveImage(shopImage.node, node)"
              />
            </no-ssr>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import getArticleByHandle from '~/queries/getArticleByHandle.gql'
import transformEdges from '~/plugins/utils/transformEdges'
import FeaturedMedia from '~/components/FeaturedMedia'
import ShopLook from '~/components/ShopLook'

export default {
  components: {
    FeaturedMedia,
    ShopLook
  },
  data() {
    return {
      waitingToUpdate: true,
      shopImages: []
    }
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
        const products =
          collection && collection.products
            ? transformEdges(collection.products)
            : []
        const transformedProducts = products.map(product => {
          const variants = transformEdges(product.variants)

          return {
            ...product,
            variants
          }
        })

        return {
          ...rest,
          products: transformedProducts
        }
      }
    }
  },
  computed: {
    content() {
      if (
        this.article &&
        this.article.fields &&
        this.article.fields.contentHtml
      ) {
        return this.article.fields.contentHtml
      }

      return ''
    }
  },
  updated() {
    this.$nextTick(() => {
      if (
        this.waitingToUpdate &&
        this.article &&
        this.article.products &&
        typeof this.$refs.content !== 'undefined' &&
        this.$refs.content.innerHTML.length > 0
      ) {
        this.updateImages()
      }
    })
  },
  methods: {
    updateImages() {
      this.shopImages = []
      const images = [ ...this.$el.querySelectorAll('.article-body img') ]

      images.forEach(image => {
        const product = this.article.products.find(({ handle }) => handle === image.alt)

        if (product) {
          this.shopImages.push({
            node: image,
            src: image.src,
            product: product
          })
        }
      })

      this.waitingToUpdate = false
    },
    moveImage(imageNode, shopLookNode) {
      imageNode.parentNode.replaceChild(shopLookNode, imageNode)
    }
  }
}
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

.article-body .content {
  position: relative;
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

