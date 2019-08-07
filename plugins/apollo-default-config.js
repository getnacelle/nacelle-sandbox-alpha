export default function(context) {
  return {
    httpEndpoint: 'https://hailfrequency.com/graphql/v1/space/6789',
    httpLinkOptions: {
      headers: {
        'x-nacelle-token': 'tokenForStarshipFurniture'
      }
    },
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
