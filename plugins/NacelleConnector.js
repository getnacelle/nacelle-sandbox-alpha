import axios from 'axios'
import endpoint from '@nacelle/nacelle-nuxt-module/lib/write-endpoint'

const nacelleAPI = endpoint(process.env.NACELLE_SPACE_ID)
const token = process.env.NACELLE_GRAPHQL_TOKEN

const nacelleRequest = (query, variables) => {
  return axios.post(
    nacelleAPI,
    {
      query,
      variables: {
        ...variables
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-nacelle-token': token
      },
    }).then(res => {
      if (res && res.data && res.data.data) {
        return res.data.data
      }

      return undefined
    })
}

// PRODUCTS
const getProducts = (limit, cursor) => {
  const query = `
  query getAllProducts($cursor: String, $limit: Int) {
    getAllProducts(limit: $limit, cursor: $cursor) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          vendor
          content {
            fields
            __typename
          }
          metafields {
            id
            namespace
            key
            value
            __typename
          }
          priceRange {
            min
            max
            __typename
          }
          options {
            name
            values
            __typename
          }
          featuredMedia {
            src
            thumbnailSrc
            id
            src
            type
            __typename
          }
          media {
            edges {
              node {
                thumbnailSrc
                id
                src
                type
                __typename
              }
              __typename
            }
            __typename
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
                  __typename
                }
                swatchSrc
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        cursor
        __typename
      }
      pageInfo {
        hasNextPage
        __typename
      }
      __typename
    }
  }  
  `

  return nacelleRequest(query, { limit, cursor}).then(res => {
    if (res && res.getAllProducts) {
      return res.getAllProducts
    }

    return undefined
  })
}

const getAllProducts = async () => {
  try {
    let currentCursor = null
    let hasNextPage = false
    let pages = []

    do {
      const page = await getProducts(250, currentCursor)

      if (page) {
        pages.push(page)

        if (page.pageInfo) {
          hasNextPage = page.pageInfo.hasNextPage
        }

        if (hasNextPage && page.edges && page.edges.length > 0) {
          currentCursor = page.edges[page.edges.length - 1].cursor
        }
      } else {
        hasNextPage = false
      }      
    } while (hasNextPage === true)

    const products = pages.reduce((arr, page) => {
      return arr.concat(page.edges)
    }, [])

    return products
  } catch (err) {
    console.log(err)

    return undefined
  }
}

// COLLECTION
const getCollection = (handle, limit = 250, cursor = null) => {
  const query = `
  query GetCollectionByHandle($handle: String!, $cursor: String, $limit: Int) {
    getCollectionByHandle(handle: $handle) {
      id
      description
      handle
      title
      featuredMedia {
        id
        src
        __typename
      }
      products(limit: $limit, cursor: $cursor) {
        edges {
          node {
            id
            __typename
          }
          cursor
          __typename
        }
        pageInfo {
          hasNextPage
          __typename
        }
        __typename
      }
      __typename
    }
  }
  `

  return nacelleRequest(query, { handle, limit, cursor}).then(res => {
    if (res && res.getCollectionByHandle) {
      return res.getCollectionByHandle
    }

    return undefined
  })
}

// BLOG
const getBlog = (handle) => {
  const query = `
  query GetBlogByHandle($handle: String!) {
    getBlogByHandle(handle: $handle) {
      id
      handle
      source
      title
      fields
      articles {
        edges {
          node {
            id
            handle
            source
            title
            description
            tags
            publishDate
            excerpt
            featuredMedia {
              id
              type
              src
              __typename
            }
            fields
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  `

  return nacelleRequest(query, { handle }).then(res => {
    if (res && res.getBlogByHandle) {
      return res.getBlogByHandle
    }

    return undefined
  })
}

// Content
const getContentByHandle = (handle, type = 'content') => {
  const query = `
  query GetPageContentByHandle($handle: String!, $type: String!) {
    getContentByHandle(handle: $handle, type: $type) {
      id
      source
      type
      title
      description
      sections
      tags
      fields
      __typename
    }
  }  
  `

  return nacelleRequest(query, { handle, type }).then(res => {
    if (res && res.getContentByHandle) {
      return res.getContentByHandle
    }

    return undefined
  })
}

// Link Lists
const getLinkLists = () => {
  const query = `
  query GetSpace {
    getSpace {
      linklists {
        handle
        links {
          title
          to
          type
          links {
            title
            to
            type
            links {
              title
              to
              type
            }
          }
        }
      }
    }
  }
  `

  return nacelleRequest(query).then(res => {
    if (res && res.getSpace && res.getSpace.linklists) {
      return res.getSpace.linklists
    }

    return undefined
  })
}

export default {
  getBlog,
  getProducts,
  getAllProducts,
  getCollection,
  getContentByHandle,
  getLinkLists
}