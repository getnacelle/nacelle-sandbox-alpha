export const staticPageData = (handle, app) => {
  try {
    const pageData = require(`~/static/data/pages/${handle}/static.json`)
      
    if (pageData) {
      if (pageData.noData) {
        return {
          noPageData: true
        }
      }

      // Update Apollo Cache
      const query = `getContentByHandle({\"handle\":\"${handle}\", \"type\":\"content\"})`
      const cache = {}
      cache[query] = pageData
      app.$nacelleHelpers.cacheData({ data: cache })

      return {
        staticPageData: pageData,
        page: pageData
      }
    }
  } catch (err) {
    const path = `~/static/data/pages/${handle}/static.json`
    app.$nacelleHelpers.debugLog('Static page file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}

export const staticCollectionData = (handle, app) => {
  try {
    const collectionData = require(`~/static/data/collections/${handle}/static.json`)

    if (collectionData) {
      if (collectionData.noData) {
        return {
          noCollectionData: true
        }
      }

      // Update Apollo Cache
      const query = `getCollectionByHandle({\"handle\":\"${handle}\")`
      const cache = {}
      cache[query] = collectionData
      app.$nacelleHelpers.cacheData({ data: cache })

      return {
        staticCollectionData: collectionData,
        collection: app.$nacelleHelpers.transformCollection(collectionData)
      }
    }
  } catch (err) {
    const path = `~/static/data/collections/${handle}/static.json`
    app.$nacelleHelpers.debugLog('Static Collection file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}

export const staticShopPageData = (app) => {
  try {
    const shopData = require(`~/static/data/shop/static.json`)

    if (shopData) {
      if (shopData.noData) {
        return {
          noShopData: true
        }
      }

      // Update Apollo Cache
      if (shopData.products) {
        const transformedProducts = []
        
        shopData.products.forEach(product => {
          if (product && product.node && product.node.handle) {
            const query = `getProductByHandle({\"handle\":\"${product.node.handle}\")`
            const cache = {}
            cache[query] = product
            app.$nacelleHelpers.cacheData({ data: cache })

            transformedProducts.push(
              app.$nacelleHelpers.transformProduct(product.node)
            )
          }
        })

        return {
          staticShopData: shopData,
          products: transformedProducts
        }
      }
    }
  } catch (err) {
    const path = `~/static/data/shop/static.json`
    app.$nacelleHelpers.debugLog('Static shop file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}

export const staticProductData = (handle, app) => {
  try {
    const productData = require(`~/static/data/products/${handle}/static.json`)
    
    if (productData) {
      if (productData.noData) {
        return {
          noProductData: true
        }
      }

      // Update Apollo Cache
      const query = `getProductByHandle({\"handle\":\"${handle}\"})`
      const cache = {}
      cache[query] = productData
      app.$nacelleHelpers.cacheData({ data: cache })

      return {
        staticProductData: productData,
        product: app.$nacelleHelpers.transformProduct(productData)
      }
    }
  } catch (err) {
    const path = `~/static/data/products/${handle}/static.json`
    app.$nacelleHelpers.debugLog('Static product file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}

export const staticBlogData = (handle, app) => {
  try {
    const blogData = require(`~/static/data/blogs/${handle}/static.json`)
    
    if (blogData) {
      if (blogData.noData) {
        return {
          noBlogData: true
        }
      }

      // Update Apollo Cache
      const query = `getBlogByHandle({\"handle\":\"${handle}\"})`
      const cache = {}
      cache[query] = blogData
      app.$nacelleHelpers.cacheData({ data: cache })

      return {
        staticBlogData: blogData,
        blog: app.$nacelleHelpers.transformBlog(blogData)
      }
    }
  } catch (err) {
    const path = `~/static/data/blogs/${handle}/static.json`
    app.$nacelleHelpers.debugLog('Static blog file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}

export const staticArticleData = (handle, app) => {
  try {
    const articleData = require(`~/static/data/articles/${handle}/static.json`)
    
    if (articleData) {
      if (articleData.noData) {
        return {
          noArticleData: true
        }
      }

      // Update Apollo Cache
      const query = `getArticleByHandle({\"blogHandle\":\"blog\",\"handle\":\"${handle}\"})`
      const cache = {}
      cache[query] = articleData.node
      app.$nacelleHelpers.cacheData({ data: cache })

      return {
        staticArticleData: articleData,
        article: articleData.node
      }
    }
  } catch (err) {
    const path = `~/static/data/articles/${handle}/static.json`
    app.$nacelleHelpers.debugLog('Static article file does not exist. Fallback to API query.')
    app.$nacelleHelpers.debugLog(`path: ${path}`)
    console.log(err)
  }

  return undefined
}
