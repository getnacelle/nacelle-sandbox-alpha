<template>
  <div class="login">
    <div 
      v-if="showIframe"
      class="oxi_social_wrapper"
    >
      <iframe
        id="social_login_frame"
        :src="iframeSrc"
        style="width:100%;max-width:100%;padding-top:0px;margin-bottom:5px;border:0px;height:240px;"
        scrolling=no
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // oxiAccountId: {
    //   type: String,
    //   default: ''
    // },
    shopifyDomain: {
      type: String,
      default: ''
    },
    shopifyAccountPage: {
      type: String,
      default: ''
    }
  },
  computed: {
    showIframe() {
      return (
        this.shopifyDomain.length > 0 &&
        this.shopifyAccountPage.length > 0
      )
    },
    iframeSrc() {
      const endpoint = 'https://social-login.oxiapps.com/widget'
      const params = `site=${this.shopifyDomain}&parenturl=${this.shopifyAccountPage}`
      return `${endpoint}?${params}`
    }
  }
}
</script>

<style>
  .login {
    margin: 0 auto;
    padding: 3rem 1rem;
    max-width: 400px;
  }
</style>