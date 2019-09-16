<template>
  <div>
    <div v-if="slotMode!='multiple'">
      <slot v-for="result in searchResults" name="result" :result="result"></slot>
    </div>
    <div v-else>
      <slot name="result" :result="searchResults"></slot>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
export default {
  props: {
    searchKeys: {
      type: Array,
      default: () => {
        return ['title']
      }
    },
    searchData: {
      type: Array
    },
    searchQuery: {
      type: String
    },
    relevanceThreshold: {
      type: Number,
      default: 0.5
    },
    slotMode: {
      type: String,
      default: 'multiple'
    }
  },
  computed: {
    searchResults() {
      if (this.searchData && this.searchQuery) {
        let options = {
          includeMatches: true,
          keys: this.searchKeys,
          threshold: this.relevanceThreshold
        }
        return new Fuse(this.searchData, options).search(this.searchQuery)
      }
    }
  }
}
</script>