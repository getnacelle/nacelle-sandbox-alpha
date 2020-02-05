<template>
  <div class="login-page">
    <oxi-social-login
      oxi-account-id="928348"
      shopify-domain="starship-furniture.myshopify.com"
      shopify-account-page="https://shopdemo.getnacelle.com/account/"
    />
  </div>
</template>

<script>
import OxiSocialLogin from '~/components/OxiSocialLogin.vue'

export default {
  components: {
    OxiSocialLogin
  }
}
</script>
