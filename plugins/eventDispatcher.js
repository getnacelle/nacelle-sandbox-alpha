export default ({ app }, inject) => {
  inject('eventDispatcher', eventType => {
    switch (eventType) {
      case 'productView':
        break
      case 'addToCart':
        break
      case 'removeFromCart':
        break
      case 'pageView':
        break
      case 'search':
        break
    }
  })
}
