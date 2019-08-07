export default (object, field) => {
  if (field == null) {
    return object.edges.map(edge => {
      if (edge.cursor) {
        edge.node.cursor = edge.cursor
      }

      return edge.node
    })
  } else {
    return object.edges.map(edge => {
      return edge.node[field]
    })
  }
}
