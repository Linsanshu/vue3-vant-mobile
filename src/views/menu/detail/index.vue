<script setup lang="ts">
import { getProducts } from '@/api'

const route = useRoute()
const product = ref({})
console.log('router.params.id', route.params)
const getListData = async () => {
  try {
    const productDetail = await getProducts(route.params.id)
    if (productDetail.data && productDetail.data.product)
      product.value = productDetail.data.product
  }
  catch (error) {}
}
getListData()
</script>

<template>
  <div class="item-detail">
    <div class="item-main-content">
      <div class="item-images">
        <van-swipe :autoplay="3000" lazy-render>
          <van-swipe-item v-for="image in product.images" :key="image.image_url">
            <!-- <img :src="image.image_url"> -->
            <van-image
              width="100%"
              height="370"
              fit="cover"
              src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91983/medium_ae1f20570d.jpeg"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-brief">
        <div class="name">
          {{ product.name }}
        </div>
        <div class="price">
          S$10.9
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-detail{
  width: 100%;
  height: 100vh;
  .item-main-content{
    width: 100%;
    height: 450px;
    .item-images{
      width: 100%;
      // height: 375px;
    }
    .product-brief{
      border-bottom: 6px solid #f1f1f1;
      padding: 10px 12px 18px;
      .name {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
        color: #222125;
      }
      .price{
        font-size: 16px;
        color: var(--secondaryColor);
        font-weight: 700;
        margin-top: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
