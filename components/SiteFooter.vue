<template>
  <div class="site-footer">
    <div class="container">
      <!-- TEMPORARY FOOTER START -->
      <div class="column is-6 is-offset-3 logo has-text-centered">
        <img :src="logoSrc" :alt="name" />
      </div>
      <div class="column is-12 has-text-centered">© NACELLE 2019</div>
      <!-- TEMPORARY FOOTER END -->

      <!-- <div class="columns is-multiline is-marginless">
        <div class="column is-3 logo has-text-centered">
          <img :src="logoSrc" :alt="name" />
        </div>

        <div class="column is-3 has-text-centered-mobile">
          <h4 class="title is-5">Shop</h4>
          <ul>
            <li v-for="(link, index) in shopMenu" :key="index">
              <nuxt-link :to="link.to">{{ link.title }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="column is-3 has-text-centered-mobile">
          <h4 class="title is-5">About</h4>
          <ul>
            <li v-for="(link, index) in aboutMenu" :key="index">
              <nuxt-link :to="link.to">{{ link.title }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="column is-3 has-text-centered-mobile">
          <h4 class="title is-5">Account</h4>
          <ul>
            <li v-for="(link, index) in accountMenu" :key="index">
              <nuxt-link :to="link.to">{{ link.title }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="column is-12 has-text-centered">© NACELLE 2019</div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('space', ['id', 'name', 'linklists']),
    logoSrc() {
      if (this.id) {
        return `https://nacelle-assets.s3-us-west-2.amazonaws.com/space/${this.id}/logo.png`
      }

      return ''
    },
    aboutMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(
          linklist => linklist.handle === 'about'
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    },
    shopMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(
          linklist => linklist.handle === 'shop'
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    },
    accountMenu() {
      if (this.linklists) {
        const linklist = this.linklists.find(
          linklist => linklist.handle === 'account'
        )

        if (linklist) {
          return linklist.links
        }

        return []
      }

      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.site-footer {
  padding-top: 2rem;
}

.logo {
  display: flex;
  justify-content: center;

  @media screen and (max-width: 786px) {
    align-content: center;
  }
}

img {
  max-width: 50%;
  align-self: center;
}

.title {
  margin-bottom: 0.5em;
}

a {
  color: #3b3b3b;
  letter-spacing: 0.016875rem;
}
</style>
