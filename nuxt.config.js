require('dotenv').config()

import fetchAllRoutes from './plugins/utils/fetchAllRoutes'

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
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: `//space-styles.s3.amazonaws.com/${process.env.NACELLE_SPACE_ID}/styles.css`
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

  env: {
    nacelleEndpoint: process.env.NACELLE_GRAPHQL_ENDPOINT,
    nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
    buildMode: process.env.BUILD_MODE
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nacelle/nacelle-nuxt-module',
    '@nacelle/nacelle-klaviyo-nuxt-module'
    // '@nuxtjs/sitemap'
  ],

  // sitemap: {
  //   gzip: true,
  //   async routes() {
  //     return await fetchAllRoutes()
  //   }
  // },

  nacelle: {
    endpoint: process.env.NACELLE_GRAPHQL_ENDPOINT,
    token: process.env.NACELLE_GRAPHQL_TOKEN,
    gaID: process.env.NACELLE_GA_ID,
    fbID: process.env.NACELLE_FB_ID,
    klaviyo: {
      companyId: 'KPQ5Cy',
      defaultListId: 'HCtW5s',
      defaultEmbedCode: '<div class="klaviyo-form-JCCXJ5"></div>'
    }
  },

  generate: {
    // concurrency: 1,
    routes: async () => {
      return await fetchAllRoutes()
    }
  },

  generate: {
    workers: 4,
    workerConcurrency: 8,
    concurrency: 8,
    async routes() {
      return await fetchAllRoutes()
    },
    done({ duration, errors, workerInfo }) {
      if (errors.length) {
        console.log(errors)
      }
    }
  },

  build: {
    // analyze: true,
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    transpile: ['@nacelle/nacelle-vue-components']
  }
}
