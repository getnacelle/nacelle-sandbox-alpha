const httpEndpoint =
  process.env.NACELLE_GRAPHQL_ENDPOINT ||
  'https://hailfrequency.com/graphql/v1/space/6789'

export default function(context) {
  return {
    httpEndpoint: httpEndpoint,
    httpLinkOptions: {
      headers: {
        'x-nacelle-token': 'tokenForStarshipFurniture'
      }
    },
    // getAuth: () => {
    //   // get the authentication token from local storage if it exists
    //   const token =
    //     'Om01bFUxbFBWWFBDUEo5cWtXMlBreTZJV0tCZU9oYjdXYWdrZGQwTnBHaWNmd2pHbjFEc01TTldTY2pET05LRFg='
    //   // return the headers to the context so httpLink can read them
    //   if (token) {
    //     return 'Bearer ' + token
    //   } else {
    //     return ''
    //   }
    // },
    inMemoryCacheOptions: {
      freezeResults: false,
      dataIdFromObject: object => object.handle || null,
      cacheRedirects: {
        Query: {
          getProductByHandle: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'Product', handle: args.handle }),
          getArticleByHandle: (_, args, { getCacheKey }) =>
            getCacheKey({ __typename: 'Article', handle: args.articleHandle })
        }
      }
    }
  }
}
