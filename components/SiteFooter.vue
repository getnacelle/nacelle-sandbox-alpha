<template>
  <div class="site-footer">
    <div class="container">
      <div class="columns is-multiline is-marginless">
        <div class="column is-4 is-offset-4 logo">
          <img src="/starship_logo.png" alt="Starship" />
        </div>

        <div class="column is-12">© NACELLE 2019</div>
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
  justify-content: center;
  @media screen and (max-width: 786px) {
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
