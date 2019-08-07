export default {
  mounted() {
    let options = {
      root: null,
      rootMargin: '250px',
      threshold: 0.1
    }
    let vm = this

    let onChange = (changes, observer) => {
      if (changes[0].isIntersecting) {
        vm.fetchMore()
      }
    }

    let observer = new IntersectionObserver(onChange, options)
    let observee = this.$refs.fetchMore

    observer.observe(observee)
  }
}
