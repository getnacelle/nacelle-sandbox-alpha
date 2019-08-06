export default function(context) {
  return {
    httpEndpoint: context.env.NACELLE_GRAPHQL_ENDPOINT,
    httpLinkOptions: {
      headers: {
        'x-nacelle-token': context.env.NACELLE_GRAPHQL_TOKEN
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
