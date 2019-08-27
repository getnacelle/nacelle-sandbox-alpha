import transformEdges from './transformEdges.js'
const axios = require('axios')

const getArticles = async handle => {
  return axios({
    method: 'post',
    url: process.env.NACELLE_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token': process.env.NACELLE_GRAPHQL_TOKEN
    },
    data: {
      query: `query {
                  getBlogByHandle(handle: "${handle}") {
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
  })
    .then(res => {
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
          return `/${handle}/${article.handle}`
        })

        articleRoutes = articles
      } else {
        articleRoutes = []
      }
      return articleRoutes
    })
    .catch(error => {
      throw Error(error)
    })
}

const getBlogHandles = async () => {
  return await axios({
    method: 'post',
    url: process.env.NACELLE_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token': process.env.NACELLE_GRAPHQL_TOKEN
    },
    data: {
      query: `query {
                getSpace {
                  linklists {
                    links {
                      type
                      to
                    }
                  }
                }
              }`
    }
  })
    .then(res => {
      let handles
      if (
        res.data &&
        res.data.data &&
        res.data.data.getSpace &&
        res.data.data.getSpace.linklists
      ) {
        let linklists = res.data.data.getSpace.linklists.map(list => {
          return list.links
            .filter(link => {
              return link.type == 'Blog'
            })
            .map(link => {
              return link.to.split('/')[1]
            })
        })
        handles = linklists.reduce((fullList, list) => {
          return fullList.concat(list)
        })
      } else {
        handles = []
      }
      return handles
    })
    .catch(error => {
      throw Error(error)
    })
}

const getBlogArticles = async () => {
  let handles = await getBlogHandles()
  if (handles.length > 0) {
    let allArticles = handles.map(async handle => getArticles(handle))
    let resolvedArticles = await Promise.all(allArticles)
    return resolvedArticles.reduce((all, set) => {
      return all.concat(set)
    })
  } else {
    return []
  }
}

export default async () => {
  let productsAndPages = await axios({
    method: 'post',
    url: process.env.NACELLE_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token': process.env.NACELLE_GRAPHQL_TOKEN
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
      }`
    }
  })
    .then(res => {
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

      let siteLinks
      if (
        res.data &&
        res.data.data &&
        res.data.data.getSpace &&
        res.data.data.getSpace.linklists
      ) {
        let linklists = res.data.data.getSpace.linklists.map(list => {
          return list.links
            .filter(link => {
              return link.type != 'External'
            })
            .map(link => {
              return link.to
            })
        })
        siteLinks = linklists.reduce((fullList, list) => {
          return fullList.concat(list)
        })
      } else {
        siteLinks = []
      }

      let allRoutes = [productRoutes, siteLinks]

      return allRoutes.reduce((all, set) => {
        return all.concat(set)
      })
    })
    .catch(error => {
      throw Error(error)
    })
  let blogArticles = await getBlogArticles()

  let routesArray = [productsAndPages, blogArticles]

  return routesArray.reduce((allRoutes, array) => {
    return allRoutes.concat(array)
  })
  // return blogArticles
}
