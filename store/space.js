export const state = () => ({
  linklists: [],
  facebookCatalogID: '12345'
})

export const mutations = {
  setLinklists(state, payload) {
    state.linklists = payload
  }
}
