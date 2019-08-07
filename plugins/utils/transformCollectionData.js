import transformEdges from './transformEdges'

export default data => {
  const { products, ...rest } = data.getCollectionByHandle || {}

  if (products) {
    const transformedProducts = transformEdges(products).map(product => {
      if (product) {
        let { variants, ...rest } = product
        return {
          ...rest,
          variants: variants ? transformEdges(variants) : []
        }
      }

      return product
    })

    return {
      products: transformedProducts,
      ...rest
    }
  }

  return {
    ...rest
  }
}
