<template>
  <input
    type="text"
    :placeholder="placeholderText"
    class="input nacelle"
    v-model="localQuery"
    @keyup="setQueryInStore"
    :ref="`${position}-search-input`"
  />
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    placeholderText: {
      type: String,
      default: 'Search products..'
    },
    position: {
      type: String
    }
  },
  watch: {
    $route(newRoute) {
      if (newRoute.name == 'search' && this.position == 'global') {
        this.localQuery = null
        this.$refs['global-search-input'].blur()
      }
    }
  },
  data() {
    return {
      localQuery: null
    }
  },
  computed: {
    ...mapState('search', ['query'])
  },
  methods: {
    ...mapMutations('search', ['setQuery']),
    setQueryInStore(e) {
      if (e.key !== 'Enter') {
        this.setQuery(this.localQuery)
      }
    }
  },
  created() {
    this.localQuery = this.query
  },
  mounted() {
    if (this.position != 'global') {
      this.$refs[`${this.position}-search-input`].focus()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
