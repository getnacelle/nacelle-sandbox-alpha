<template>
  <div class="site-footer">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-3 logo">
          <img src="/starship_logo.png" />
        </div>

        <div class="column is-2 is-offset-7">© NACELLE 2019</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: flex-start;
  @media screen and (max-width: 786px) {
    justify-content: center;
    align-content: center;
  }
}
img {
  max-width: 50%;
  align-self: center;
}
.site-footer {
  text-align: center;
}
</style>
