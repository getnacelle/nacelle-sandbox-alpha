import fs from 'fs-extra'
import { unique, nacelleConnector } from '@nacelle/nacelle-tools'

const staticDir = 'static/data'
const connector = nacelleConnector(
  process.env.NACELLE_SPACE_ID,
  process.env.NACELLE_GRAPHQL_TOKEN
)

const writeData = (path, data) => {
  return new Promise((resolve, reject) => {
    try {
      fs.ensureFileSync(path)
      fs.writeJson(path, data, resolve(`${path} Write Successful`))
    } catch (e) {
      console.error(`${path} Write Failed. ${e}`)
      reject(`${path} Write Failed. ${e}`)
    }
  })
}

const buildStaticFiles = async (data) => {
  console.log('\x1b[36m', '҈', '\x1b[0m', 'Writing space data...')

  try {
    fs.emptyDirSync(staticDir)

    fs.mkdirSync(`${staticDir}/collections`)
    fs.mkdirSync(`${staticDir}/pages`)
    fs.mkdirSync(`${staticDir}/products`)
    fs.mkdirSync(`${staticDir}/blogs`)
    fs.mkdirSync(`${staticDir}/articles`)

    if (data && data.length > 0) {
      // Save routes
      const routesOnly = data.reduce((allRoutes, route) => {
        if (route.route) {
          allRoutes.push(route.route)
        }

        return allRoutes
      }, [])

      writeData(`${staticDir}/routes.json`, routesOnly)

      // Save individual route data
      data.forEach(route => {
        if (route && route.writePath) {
          const fullPath = `${staticDir}/${route.writePath}/static.json`

          if (route.payload) {
            // Write the API data to static file
            writeData(fullPath, route.payload)
          } else {
            // If no data we still Write an empty file so we know not
            // to query the api on the front end
            writeData(fullPath, { noData: true })
          }
        }
      })
    }
  } catch (err) {
    console.log('Write failed')
    console.log(err)
  }
}

const getHandle = (path) => {
  const parts = path.split('/')

  return parts.pop()
}

const getLinklistRouteItems = (links) => {
  let pages = []
  let collections = []
  let blogs = []


  links.forEach(link => {
    const { to, type } = link

    if (to && type && to !== '/') {
      const handle = getHandle(to)

      switch (type) {
        case 'Page':
          pages.push({
            handle,
            payload: {},
            route: to,
            writePath: `/pages/${handle}`
          })
          collections.push({
              handle,
              payload: {},
              route: `/collections/${handle}`,
              writePath: `/collections/${handle}`
            })
          break
        case 'Collection':
          collections.push({
            handle,
            payload: {},
            route: to,
            writePath: `/collections/${handle}`
          })
          pages.push({
            handle,
            payload: {},
            route: undefined,
            writePath: `/pages/${handle}`
          })
          break
        case 'Blog':
          blogs.push({
            handle,
            payload: {},
            route: to,
            writePath: `/blogs/${handle}`
          })
          break
        default:
          break;
      }
    }

    if (link.links && link.links.length > 0) {
      const subItems = getLinklistRouteItems(link.links)

      pages = unique(pages.concat(subItems.pages), 'handle')
      collections = unique(collections.concat(subItems.collections), 'handle')
      blogs = unique(blogs.concat(subItems.blogs), 'handle')
    }
  })

  return {
    pages,
    collections,
    blogs
  }
}

const generateRouteData = async () => {
  let routeItems = {}
  routeItems.articles = []

  try {
    // Get linklist
    const linklists = await connector.getLinkLists()
    
    // Search link list for pages
    if (linklists) {
      routeItems = getLinklistRouteItems(linklists)
      routeItems.articles = []
    }
    
    // Get page data
    console.log('\x1b[36m', '҈', '\x1b[0m', 'Prefetching page data...')
    if (routeItems.pages && routeItems.pages.length > 0) {
      for (const page of routeItems.pages) {
        const pagePayload = await connector.getContentByHandle(page.handle)
        page.payload = pagePayload ? pagePayload : { noData: true }
      }
    }

    // Get Homepage
    const homepage = await connector.getContentByHandle('homepage')
    const homepagePayload = homepage ? homepage : { noData: true }

    routeItems.pages.push({
      handle: 'homepage',
      payload: homepagePayload,
      route: '/',
      writePath: '/pages/homepage'
    })

    routeItems.collections.push({
      handle: 'homepage',
      payload: {},
      route: undefined,
      writePath: '/collections/homepage'
    })

    // Get blog
    console.log('\x1b[36m', '҈','\x1b[0m', 'Prefetching blog data...')
    if (routeItems.blogs && routeItems.blogs.length > 0) {

      for (const blog of routeItems.blogs) {
        const blogPayload = await connector.getBlog(blog.handle)
        blog.payload = blogPayload ? blogPayload : { noData: true }

        // Get all articles
        if (
          blog.payload &&
          blog.payload.articles &&
          blog.payload.articles.edges &&
          blog.payload.articles.edges.length > 0
        ) {
          const articleRoutes = blog.payload.articles.edges
            .reduce((routes, article) => {
              if (article && article.node && article.node.handle) {
                routes.push({
                  handle: article.node.handle,
                  payload: article,
                  route: `${blog.payload.handle}/${article.node.handle}`,
                  writePath: `/articles/${article.node.handle}`
                })

                routeItems.collections.push({
                  handle: article.node.handle,
                  payload: {},
                  route: undefined,
                  writePath: `/collections/${article.node.handle}`
                })
              }

              return routes
            }, [])

          routeItems.articles = routeItems.articles.concat(articleRoutes)
        }
      }
    }
    
    // Get all products
    console.log('\x1b[36m', '҈', '\x1b[0m', 'Prefetching product data...')
    const products = await connector.getAllProducts(100)
    
    routeItems.products = products.reduce((routes, product) => {
      if (product && product.node && product.node.handle) {
        routes.push({
          handle: product.node.handle,
          payload: product.node,
          route: `/products/${product.node.handle}`,
          writePath: `/products/${product.node.handle}`
        })
      }

      return routes
    }, [])

    // Get Shop Page
    const shopRoute = {
      handle: 'shop',
      payload: {},
      route: undefined,
      writePath: `/shop`
    }

    if (products) {
      const shopProducts = products.slice(0, 250)
      shopRoute.payload = {
        products: shopProducts
      }
    }
    
    // Get all collections
    console.log('\x1b[36m', '҈', '\x1b[0m', 'Prefetching collection data...')
    if (routeItems.collections && routeItems.collections.length > 0) {
      for (const collection of routeItems.collections) {
        const collectionData = await connector.getCompleteCollection(collection.handle, 10)

        // fill product data with previously retrieved product data
        if (collectionData) {
          if (
            collectionData.products &&
            collectionData.products.edges &&
            collectionData.products.edges.length > 0
          ) {
            const filledProducts = collectionData.products.edges.map(product => {
              return products.find(({ node }) => {
                return node.id === product.node.id
              })
            })

            collectionData.products.edges = filledProducts
          }

          collection.payload = collectionData
        } else {
          collection.payload = { noData: true }
        }
      }
    }

    // Flatten data
    return [
      ...routeItems.pages,
      ...routeItems.collections,
      ...routeItems.blogs,
      ...routeItems.products,
      ...routeItems.articles,
      shopRoute
    ]
  } catch (err) {
    console.log(err)
    return false
  }
}

export default function NacelleStaticData (moduleOptions) {
  if (
    this.options &&
    this.options.nacelle &&
    !this.options.nacelle.skipPrefetch
  ) {
    this.nuxt.hook('build:before', async () => {
      const routeData = await generateRouteData()
      return buildStaticFiles(routeData)
    })
  }

  this.nuxt.hook('generate:routeCreated', ({route, path, errors}) => {
    if (errors && errors.length > 0) {
      console.log(route)
      console.log(path)
      console.log(errors)
    }
  })

  this.nuxt.hook('generate:done', ({nuxt, errors}) => {
    if (errors && errors.length > 0) {
      console.log(errors)
    }
  })
}