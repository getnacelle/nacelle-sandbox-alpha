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
        getAllProducts {
          edges {
            node {
              handle
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
      res.data.data.getAllProducts
    ) {
      const products = transformEdges(res.data.data.getAllProducts).map(product => {
        return `/products/${product.handle}`
      })

      return products
    }

    return []
  })
}
