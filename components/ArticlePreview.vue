<template>
  <div class="article-preview nacelle" :class="{ 'is-featured': isFeatured }">
    <slot name="media" :featuredMedia="featuredMedia">
      <nuxt-link :to="link">
        <interface-featured-media :media="featuredMedia" />
      </nuxt-link>
    </slot>
    <slot
      name="details"
      :title="title"
      :excerpt="excerpt"
      :handle="handle"
      :readMoreText="readMoreText"
      :link="link"
      :tags="tags"
    >
      <div class="article-preview-content">
        <div class="article-preview-inner content">
          <h5 v-if="tags && tags.length > 0">{{ tags.join(', ') }}</h5>
          <nuxt-link :to="link">
            <h3 class="title is-4">
              {{ title }}
            </h3>
          </nuxt-link>
          <p>
            {{ excerpt }}
          </p>
          <p>
            <nuxt-link :to="link">
              {{ readMoreText }}
            </nuxt-link>
          </p>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    handle: {
      type: String,
      default: '',
      required: true
    },
    excerpt: {
      type: String,
      default: '',
      required: true
    },
    tags: {
      type: Array,
      default: () => {
        return []
      }
    },
    pathFragment: {
      type: String,
      default: '/blog/'
    },
    featuredMedia: {
      type: Object,
      default: () => {
        return null
      }
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    readMoreText: {
      type: String,
      default: 'Read More'
    }
  },
  computed: {
    link() {
      return `${this.pathFragment}${this.handle}`
    }
  }
}
</script>

<style lang="scss" scoped>
.is-featured {
  position: relative;
  background-color: #f5f5f5;
}

.is-featured /deep/ .featured-media {
  @media screen and (min-width: 769px) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 60%;

    figure {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.is-featured .article-preview-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  padding-bottom: 2rem;
  max-width: 1200px;

  @media screen and (min-width: 769px) {
    padding-top: 3rem;
    padding-bottom: 3rem;
    min-height: 500px;
  }
}

.is-featured .article-preview-inner {
  margin-top: -4rem;
  padding: 2rem;
  background-color: #ffffff;

  @media screen and (min-width: 769px) {
    margin-top: 0;
    width: 42%;
  }
}
</style>

