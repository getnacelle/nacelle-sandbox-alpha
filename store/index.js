import { getSpace } from '@nacelle/nacelle-graphql-queries-mixins'

export const state = () => ({
  collectionLimit: 12
})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ commit }) {
    let client = this.app.apolloProvider.defaultClient

    await getSpace(client).then(data => {
      if (data && data.data && data.data.getSpace) {
        const { id, name, domain, metafields, linklists } = data.data.getSpace

        commit('space/setId', id)
        commit('space/setName', name)
        commit('space/setDomain', domain)
        commit('space/setMetafields', metafields)
        commit('space/setLinklists', linklists)
      }
    })
  }
}
