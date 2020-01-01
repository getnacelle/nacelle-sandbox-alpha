<template>
  <div class="app nacelle">
    <global-header ref="header" />
    <nuxt :style="{'margin-top': `${headerHeight}px`}" />
    <div class="site-footer">
      <div class="container">
        <div class="column is-6 is-offset-3 logo has-text-centered">
          <img :src="logoSrc" :alt="name" />
        </div>
        <div class="column is-12 has-text-centered">© NACELLE 2019</div>
      </div>
    </div>
    <event-dispatcher />
    <error-modal />
  </div>
</template>

<script>
import nacelleVue from "@nacelle/nacelle-vue-components/dist/nacelleVueInstance.js"
export default nacelleVue({
  type: "default-layout"
})
</script>


<style lang="scss">
.cart {
  z-index: 9999;
  background: white;
}

html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
