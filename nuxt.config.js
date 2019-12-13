require('dotenv').config()

import path from 'path'
import fs from 'fs-extra'

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
        href: `//dmf8x4ovgacxs.cloudfront.net/${process.env.NACELLE_SPACE_ID}/styles.css`
      }
    ],
    script: [
      {
        src:
          'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver'
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
    'vue-currency-filter/nuxt'
  ],

  sitemap: {
    gzip: true,
    async routes() {
      const staticDir = path.resolve(__dirname, './static/data')
      const routes = fs.readJsonSync(`${staticDir}/routes.json`)
      const routesOnly = routes.map(route => route.route)
      
      return routesOnly
    }
  },

  nacelle: {
    spaceID: process.env.NACELLE_SPACE_ID,
    token: process.env.NACELLE_GRAPHQL_TOKEN,
    gaID: process.env.NACELLE_GA_ID,
    fbID: process.env.NACELLE_FB_ID,
    skipPrefetch: process.env.SKIP_PREFETCH === 'true',
    customEndpoint: process.env.NACELLE_CUSTOM_ENDPOINT
  },

  generate: {
    workers: 4,
    concurrency: 4
  },

  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: false,
        minifyJS: false,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    transpile: ['@nacelle/nacelle-vue-components', '@nacelle/nacelle-tools']
  }
}
