import gql from 'graphql-tag'

export default function (context, inject) {
  const { app } = context

  const getPage = (handle, apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}
    
    let query = gql`
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

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('page', {
      query,
      variables() {
        return {
          handle: handle,
          type: 'content'
        }
      },
      update(data) {
        console.log('I am querying')
        const page = data.getContentByHandle

        if (page) {
          return page
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const getProduct = (handle, apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}

    let query = gql`
    query GetProductByHandle($handle: String!) {
      getProductByHandle(handle: $handle) {
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
    }  
`

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('product', {
      query,
      variables() {
        return { handle }
      },
      update(data) {
        console.log('I am querying')
        const product = data.getProductByHandle
        if (product) {
          const transformedProduct = app.$nacelleHelpers.transformProduct(product)


          return transformedProduct
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const getCollection = (handle, apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}

    let query = gql`
  query GetCollectionByHandle($handle: String!, $limit: Int) {
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
      products(limit: $limit) {
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
      __typename
    }
  }
`

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('collection', {
      query,
      variables() {
        return {
          handle,
          limit: 250
        }
      },
      update(data) {
        console.log('I am querying')
        const collection = data.getCollectionByHandle
        
        if (collection) {
          const transformedCollection = app.$nacelleHelpers.transformCollection(collection)

          return transformedCollection
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const getArticle = (handle, blogHandle, apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}

    let query = gql`
      query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
        getArticleByHandle(blogHandle: $blogHandle, articleHandle: $articleHandle) {
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
      }
    `

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('article', {
      query,
      variables() {
        return {
          articleHandle: handle,
          blogHandle
        }
      },
      update(data) {
        console.log('I am querying')
        const article = data.getArticleByHandle

        if (article) {
          return article
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const getBlog = (handle, apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}

    let query = gql`
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

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('blog', {
      query,
      variables() {
        return {
          blogHandle: handle
        }
      },
      update(data) {
        console.log('I am querying')
        const blog = data.getBlogByHandle
        
        if (blog) {
          const transformedBlog = app.$nacelleHelpers.transformBlog(blog)

          return transformedBlog
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const getShopPage = (apollo, options = {}) => {
    const { customQuery, error } = options ? options : {}

    let query = gql`
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

    if (customQuery) {
      query = gql`customQuery`
    }

    apollo.addSmartQuery('products', {
      query,
      variables() {
        return {
          limit: 250
        }
      },
      update(data) {
        console.log('I am querying')
        const products = data.getAllProducts
        
        if (products) {
          const transformedProducts = products.map(
            app.$nacelleHelpers.transformProduct
          )

          return transformedProducts
        } else {
          if (error) {
            error()
          }
        }
      }
    })
  }

  const plugin = {
    getPage,
    getProduct,
    getCollection,
    getArticle,
    getBlog,
    getShopPage
  }

  inject('nacelleApollo', plugin)
}