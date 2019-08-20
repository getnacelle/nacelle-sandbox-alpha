import * as Cookies from 'es-cookie'
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('user', ['setUserData']),
    getUserData() {
      let cookie = Cookies.get('user-data')
      if (cookie != undefined) {
        this.setUserData(JSON.parse(Cookies.get('user-data')))
      }
    }
  }
  // mounted() {
  //   Cookies.set('user-data', JSON.stringify({ test: 'hi' }))
  // }
}
