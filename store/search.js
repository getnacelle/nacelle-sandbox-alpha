export const state = () => ({
  query: null,
  autocompleteVisible: false,
  filtersCleared: false
})

export const mutations = {
  setQuery(state, query) {
    state.query = query
  },

  setAutocompleteVisible(state) {
    state.autocompleteVisible = true
  },
  setAutocompleteNotVisible(state) {
    state.autocompleteVisible = false
  },
  setFiltersCleared(state) {
    state.filtersCleared = true
  },
  setFiltersNotCleared(state) {
    state.filtersCleared = false
  }
}

export const getters = {
  queryOrigin(state) {
    if (state.query) {
      return state.query.origin
    }
  }
}
