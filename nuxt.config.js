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
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
  css: [
    '@nacelle/nacelle-vue-components/dist/base-styles.css',
    '@/assets/global.css'
  ],

  env: {
    nacelleSpaceID: process.env.NACELLE_SPACE_ID,
    nacelleToken: process.env.NACELLE_GRAPHQL_TOKEN,
    buildMode: process.env.BUILD_MODE
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nacelle/nacelle-nuxt-module',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '~/plugins/getRoutesJSON'
  ],

  sitemap: {
    gzip: true,
    async routes() {
      let routes = await fetchAllRoutes()
      return routes.map(routePayload => {
        return routePayload.route
      })
    }
  },

  nacelle: {
    spaceID: process.env.NACELLE_SPACE_ID,
    token: process.env.NACELLE_GRAPHQL_TOKEN,
    gaID: process.env.NACELLE_GA_ID,
    fbID: process.env.NACELLE_FB_ID
  },

  generate: {
    workers: 4,
    concurrency: 4,
    async routes() {
      return await fetchAllRoutes()
    },
    done({ duration, errors, workerInfo }) {
      if (errors.length) {
        console.log(errors)
      }
      console.log(workerInfo)
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
