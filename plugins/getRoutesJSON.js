import fetchAllRoutes from './utils/fetchAllRoutes'
import fs from 'fs-extra'

export default function getRoutesJSON(moduleOptions) {
  const writeData = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        fs.ensureFileSync(path)
        fs.writeJson(path, data, resolve(`${path} Write Successful`))
      } catch (e) {
        console.error(`${path} Write Failed. ${e}`)
        reject(`${path} Write Failed. ${e}`)
      }
    })
  }

  this.nuxt.hook('build:before', async () => {
    fs.emptyDir('static/data')
    return writeData('static/data/products.json', await fetchAllRoutes())
  })
}
