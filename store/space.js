export const state = () => ({
  linklists: []
})

export const mutations = {
  setLinklists(state, payload) {
    state.linklists = payload
  }
}
