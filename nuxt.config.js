require('dotenv').config()

import fetchProductRoutes from './plugins/utils/fetchProductRoutes.js'
import fetchCollectionRoutes from './plugins/utils/fetchCollectionRoutes.js'
import fetchBlogRoutes from './plugins/utils/fetchBlogRoutes.js'

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

export default {
  mode: process.env.BUILD_MODE,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//space-styles.s3.amazonaws.com/6789.styles.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@nacelle/nacelle-vue-components/dist/base-styles.css'],
  /*
   ** Plugins to load before mounting the App
   */

  /*
   ** Nuxt.js modules
   */
  env: {
    nacelleEndpoint: process.env.NACELLE_GRAPHQL_ENDPOINT,
    nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
    buildMode: process.env.BUILD_MODE
  },
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nacelle/nacelle-nuxt-module',
    '@nuxtjs/dotenv'
  ],

  nacelle: {
    endpoint: process.env.NACELLE_GRAPHQL_ENDPOINT,
    token: process.env.NACELLE_GRAPHQL_TOKEN
  },

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '~/plugins/apollo-default-config.js'
    }
  },

  generate: {
    interval: 100,
    routes: async () => {
      const products = await fetchProductRoutes()
      const collections = await fetchCollectionRoutes()
      const articles = await fetchBlogRoutes()

      return [...products, ...collections, ...articles]
    }
  },

  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    transpile: ['@nacelle/nacelle-vue-components']
    /*
     ** You can extend webpack config here
     */
  }
}
