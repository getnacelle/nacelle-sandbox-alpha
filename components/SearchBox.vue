<template>
  <div class="search" :class="`${position}-searchbox`">
    <template v-if="position == 'global'">
      <search-input
        :placeholderText="placeholderText"
        @keydown.enter.native="navigateToSearchResults"
        :position="position"
      />
      <button class="button" @click="navigateToSearchResults">Search</button>
    </template>
    <template v-else>
      <search-input :placeholderText="placeholderText" :position="position" />
    </template>
  </div>
</template>

<script>
import SearchInput from '~/components/SearchInput'
export default {
  components: {
    SearchInput
  },
  props: {
    position: {
      type: String,
      default: 'global'
    },
    placeholderText: {
      type: String,
      default: 'Search products..'
    }
  },
  methods: {
    navigateToSearchResults() {
      if (this.$route.name != 'search') {
        this.$router.push('/search')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
}
.global-searchbox input,
.global-searchbox button {
  margin-right: 0.5rem;
}
</style>