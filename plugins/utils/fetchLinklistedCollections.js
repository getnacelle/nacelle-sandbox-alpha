export default () => {
  this.$apollo.addSmartQuery('linklistCollections', {
    query: `query {
      getSpace {
      linklists {
        links {
          type
          to
        }
      }
    }
  }`,

    update(res) {
      let collections
      if (
        res.data &&
        res.data.data &&
        res.data.data.getSpace &&
        res.data.data.getSpace.linklists &&
        res.data.data.getSpace.linklists.length > 0
      ) {
        console.log('ran with data')
        let linklists = res.data.data.getSpace.linklists.map(list => {
          return list.links
            .filter(link => {
              return link.type == 'Collection'
            })
            .map(link => {
              return link.to.split('collections/')[1]
            })
        })
        collections = linklists.reduce((fullList, list) => {
          return fullList.concat(list)
        })
        collections = collections.filter(function(item, index) {
          return collections.indexOf(item) >= index
        })
      } else {
        console.log('ran without data')
        collections = []
      }
      return collections
    }
  })
}
