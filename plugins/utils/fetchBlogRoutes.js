import transformEdges from './transformEdges.js'

export default () => {
  const axios = require('axios')
  
  return axios({
    method: 'post',
    url: 
      process.env.NACELLE_GRAPHQL_ENDPOINT ||
      'https://hailfrequency.com/graphql/v1/space/6789',
    headers: {
      'Content-Type': 'application/json',
      'x-nacelle-token': 
        process.env.NACELLE_GRAPHQL_TOKEN ||
        'tokenForStarshipFurniture'
    },
    data: {
      query: `query {
          getBlogByHandle(handle: "blog") {
            articles {
              edges {
                node {
                  id,
                  handle
                }
              }
            }
          }
        }
      `
    }
  }).then(res => {
    if (
      res &&
      res.data &&
      res.data.data &&
      res.data.data.getBlogByHandle &&
      res.data.data.getBlogByHandle.articles
    ) {
      const articles = transformEdges(res.data.data.getBlogByHandle.articles).map(article => {
        return `/blog/${article.handle}`
      })

      return articles
    }

    return []
  })
}
