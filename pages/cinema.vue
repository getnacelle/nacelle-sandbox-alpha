<template>
  <div class="page">
    <page-content :page="page" :products="products">
      <div class="player">
        <product-video
          source="https://cdn.shopify.com/s/files/1/0269/4309/4893/files/prod-vid-01.mp4?22"
        />
      </div>
    </page-content>
  </div>
</template>

<style scoped>
.player {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem 0 0 0;
}
</style>
