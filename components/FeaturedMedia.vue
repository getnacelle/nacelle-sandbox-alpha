<template>
  <div class="featured-media">
    <figure
      v-if="source && type.includes('image')"
    >
      <img :src="media.src">
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    media: {
      type: Object,
      default: () => {}
    },
    width: {
      type: Number
    }
  },
  computed: {
    source() {
      if (
        this.media &&
        this.media.src
      ) {
        return this.media.src
      }

      return null
    },
    type() {
      if (
        this.media &&
        this.media.type
      ) {
        return this.media.type
      }

      return 'image'
    }
  }
}
</script>

<style>

</style>
