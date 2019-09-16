export const state = () => ({
  query: null
})

export const mutations = {
  setQuery(state, query) {
    state.query = query
  }
}
