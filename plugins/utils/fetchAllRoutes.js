import transformEdges from './transformEdges.js'

export default () => {
  const axios = require('axios')

  return axios({
    method: 'post',
    url:
      process.env.NACELLE_GRAPHQL_ENDPOINT ||
      'https://hailfrequency.com/graphql/v1/space/6789',
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token':
        process.env.NACELLE_GRAPHQL_TOKEN || 'tokenForStarshipFurniture'
    },
    data: {
      query: `query {
        getAllProducts {
          edges {
            node {
              handle
            }
          }
        }
        getSpace {
          linklists {
            links {
              type
              to
            }
          }
        }
        getBlogByHandle(handle: "blog") {
          articles {
            edges {
              node {
                id
                handle
              }
            }
          }
        }
      }`
    }
  }).then(res => {
    let articleRoutes
    if (
      res.data &&
      res.data.data &&
      res.data.data.getBlogByHandle &&
      res.data.data.getBlogByHandle.articles
    ) {
      const articles = transformEdges(
        res.data.data.getBlogByHandle.articles
      ).map(article => {
        return `/blog/${article.handle}`
      })

      articleRoutes = articles
    } else {
      articleRoutes = []
    }

    let productRoutes
    if (res.data && res.data.data && res.data.data.getAllProducts) {
      const products = transformEdges(res.data.data.getAllProducts).map(
        product => {
          return `/products/${product.handle}`
        }
      )

      productRoutes = products
    } else {
      productRoutes = []
    }

    // let siteLinks
    // if (
    //   res.data &&
    //   res.data.data &&
    //   res.data.data.getSpace &&
    //   res.data.data.getSpace.linkLists
    // ) {
    //   siteLinks = res.data.data.getSpace.linkLists.flat()
    //   console.log(siteLinks)
    // }
    return articleRoutes.concat(productRoutes)
  })
}
