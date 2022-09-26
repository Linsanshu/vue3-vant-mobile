<script setup>
import HomeNavBar from './cpns/home-nav-bar.vue'
</script>

<template>
  <div class="home">
    <HomeNavBar />
    <div class="banner">
      banner
    </div>
    <div class="location">
      <div class="city">
        成都火锅
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  img {
    width: 100%;
  }
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>
