require("dotenv").config();

import fetchProductRoutes from "./plugins/utils/fetchProductRoutes.js";

const nacelleEndpoint = process.env.NACELLE_GRAPHQL_ENDPOINT;
const nacelleToken = process.env.NACELLE_GRAPHQL_TOKEN;

// Name of the localStorage item
const AUTH_TOKEN = "apollo-token";

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    link: [
      {
        rel: "stylesheet",
        type: "text/css",
        href: "//space-styles.s3.amazonaws.com/6789.styles.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    "@nuxtjs/bulma",
    "@nuxtjs/pwa",
    "@nuxtjs/apollo",
    "@nacelle/nacelle-nuxt-module"
  ],

  nacelle: {
    endpoint: nacelleEndpoint,
    token: nacelleToken
  },

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: "~/plugins/apollo-default-config.js"
    }
  },

  generate: {
    routes: async () => {
      return fetchProductRoutes();
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
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // config.module.rules.push({
      //   test: /\.(graphql|gql)$/,
      //   exclude: /node_modules/,
      //   loader: 'graphql-tag/loader'
      // })
    }
  }
};
