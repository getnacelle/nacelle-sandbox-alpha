const transformEdges = (object) => {
  if (object.edges && object.edges.length > 0) {
    return object.edges.map(edge => {
      return edge.node
    })
  }

  return []
}

const transformProduct = (product) => {
  const { variants, media, ...rest } = product
  const transformedProduct = {
    variants: variants ? transformEdges(variants) : [],
    media: media ? transformEdges(media) : [],
    ...rest
  }

  return transformedProduct
}

const transformBlog = (blog) => {
  const { articles, ...rest } = blog
  return {
    ...rest,
    articles: articles ? transformEdges(articles) : []
  }
}

const transformCollection = (collection) => {
  const { products, ...rest } = collection

  if (products) {
    const edges = transformEdges(products)
    const transformedProducts = edges.map(transformProduct)

    return {
      ...rest,
      products: transformedProducts
    }
  }
  
  return {
    ...rest,
    products: []
  }
}

export default function (context, inject) {
  const { app } = context
  const { apolloProvider } = app
  const { defaultClient } = apolloProvider

  const cacheData = (data) => {
    defaultClient.cache.writeData(data)
  }

  const debugLog = (msg) => {
    if (process.env.DEV_MODE == 'true') {
      console.log(msg)
    }
  }

  const plugin = {
    cacheData,
    debugLog,
    transformEdges,
    transformProduct,
    transformBlog,
    transformCollection
  }

  inject('nacelleHelpers', plugin)
}
