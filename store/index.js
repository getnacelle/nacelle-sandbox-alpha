export const state = () => ({
  collectionLimit: 12
})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('space/fetchSpaceDetails')
  }
}
