// import GetSpace from '../queries/getSpace'
import { getSpace } from '@nacelle/nacelle-graphql-queries-mixins'

export const state = () => ({
  name: '',
  domain: '',
  metafields: [],
  linklists: [],
  facebookCatalogID: '12345'
})

export const mutations = {
  setName(state, name) {
    state.name = name
  },

  setDomain(state, domain) {
    state.domain = domain
  },

  setMetafields(state, metafields) {
    state.metafields = metafields
  },

  addMetafield(state, metafield) {
    state.metafields.push(metafield)
  },

  setLinklists(state, payload) {
    state.linklists = payload
  },

  addLinklist(state, linklist) {
    state.linklists.push(linklist)
  }
}

export const actions = {
  fetchSpaceDetails({ commit }) {
    let client = this.app.apolloProvider.defaultClient

    return getSpace(client).then(data => {
      if (data && data.data && data.data.getSpace) {
        const { name, domain, metafields, linklists } = data.data.getSpace

        commit('setName', name)
        commit('setDomain', domain)
        commit('setMetafields', metafields)
        commit('setLinklists', linklists)
      }
    })
  }
}
