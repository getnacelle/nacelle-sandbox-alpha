import * as Cookies from 'es-cookie'
export default {
  methods: {
    getUserData() {
      this.data = Cookies.get('user-data')
    }
  }
}
