import axios from 'axios'
const transformEdges = (object, field) => {
  if (field == null) {
    return object.edges.map(edge => {
      if (edge.cursor) {
        edge.node.cursor = edge.cursor
      }

      return edge.node
    })
  } else {
    return object.edges.map(edge => {
      return edge.node[field]
    })
  }
}

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
        res.data.data.getSpace.linklists &&
        res.data.data.getSpace.linklists.length > 0
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

//// GET PRODUCTS ////////////////////////////////////////

const getProducts = async () => {
  let currentCursor = null
  let hasNextPage = true
  let productPages = []
  do {
    let productPage = await getProductsAtCursor(currentCursor)
    productPages.push(productPage)
    currentCursor = productPage.cursor
    console.log(`fetching products at cursor:${currentCursor}`)
    hasNextPage = productPage.hasNextPage
  } while (hasNextPage == true)

  return productPages
    .map(page => {
      return page.routes
    })
    .reduce((allProductRoutes, page) => {
      return allProductRoutes.concat(page)
    })
}

const getProductsAtCursor = async cursor => {
  let query = `{
      getAllProducts {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            vendor
            priceRange {
              min
              max
            }
            options {
              name
              values
            }
            featuredMedia {
              src
              thumbnailSrc
              id
              src
              type
            }
            media {
              edges {
                node {
                  thumbnailSrc
                  id
                  src
                  type
                }
              }
            }
            variants {
              edges {
                node {
                  id
                  title
                  price
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                  swatchSrc
                }
              }
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }`
  if (cursor) {
    query = `{
          getAllProducts(cursor: "${cursor}") {
            edges {
              node {
                handle
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }`
  }
  return await axios({
    method: 'post',
    url: process.env.NACELLE_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token': process.env.NACELLE_GRAPHQL_TOKEN
    },
    data: {
      query: query
    }
  }).then(res => {
    if (res.data && res.data.data && res.data.data.getAllProducts) {
      let routes = transformEdges(res.data.data.getAllProducts).map(product => {
        return `/products/${product.handle}`
      })
      let productData = transformEdges(res.data.data.getAllProducts).map(
        product => {
          return product
        }
      )
      let cursor = res.data.data.getAllProducts.edges.pop().cursor
      let hasNextPage = res.data.data.getAllProducts.pageInfo.hasNextPage

      return {
        routes,
        productData,
        cursor,
        hasNextPage
      }
    }
  })
}

//// GET PAGES /////////////////////
const getPages = async () => {
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
      let siteLinks
      if (
        res.data &&
        res.data.data &&
        res.data.data.getSpace &&
        res.data.data.getSpace.linklists &&
        res.data.data.getSpace.linklists.length > 0
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

      return siteLinks
    })
    .catch(error => {
      throw Error(error)
    })
}

// let products = await getProducts()

// products
// console.log(products.length)

export default async () => {
  let products = await getProducts()
  let pages = await getPages()
  let blogArticles = await getBlogArticles()

  let routesArray = [products, pages, blogArticles]

  let routes = routesArray.reduce((allRoutes, array) => {
    return allRoutes.concat(array)
  })
  return routes
}
