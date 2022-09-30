<script setup lang="ts">
import { getSellables } from '@/api'
interface pageType {
  page: number
  per_page: number
}
interface sellablesItem {
  id: number
  image_url: string
  name: string
  price_high: string
  price_low: string
  sellable_type: string
  short_desc: string
}
const value = ref('')
const itemList = ref < Array<sellablesItem> > ([])
const pageData = ref <pageType> ({
  page: 1,
  per_page: 50,
})
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const getListData = async () => {
  try {
    const sellablesList = await getSellables(pageData.value)
    const { objects, pagination } = sellablesList.data
    if (refreshing.value) {
      itemList.value = []
      refreshing.value = false
    }
    itemList.value = [...itemList.value, ...objects]
    loading.value = false

    if (itemList.value.length === pagination.total_count) {
      finished.value = true
      pageData.value.page--
    }
  }
  catch (error) { pageData.value.page-- }
}
const onLoad = () => {
  getListData()
  pageData.value.page++
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  getListData()
}

const router = useRouter()
const goDetail = (item) => {
  router.push({
    name: 'productDetail',
    params: {
      id: item.id,
    },
  })
}
getListData()

const activeOrder = ref('')
const activeOrderStatus = ref('')
const onSearch = () => {
  console.log('onSearch', activeOrder.value, activeOrderStatus.value)
}
const goToOrderDetail = (item) => {
  router.push({
    name: 'orderDetail',
    params: {
      id: item.id,
    },
  })
}
</script>

<template>
  <div class="page-container">
    <div class="page-top">
      <van-nav-bar title="My Orders" />
      <div @click="onSearch">
        <van-tabs v-model:active="activeOrder">
          <van-tab title="Dine In" />
          <van-tab title="Pick Up" />
          <van-tab title="Coupon" />
        </van-tabs>
        <van-tabs v-model:active="activeOrderStatus">
          <van-tab title="All" />
          <van-tab title="To Pay" />
          <van-tab title="Confirming" />
          <van-tab title="To Ship" />
          <van-tab title="To Receive" />
          <van-tab title="To Collect" />
          <van-tab title="Cancelling" />
          <van-tab title="Fulfilled" />
          <van-tab title="Refunding" />
          <van-tab title="Refunded" />
          <van-tab title="Closed" />
        </van-tabs>
      </div>
    </div>
    <div class="page-scroll">
      <div class="item-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-if="itemList.length"
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!-- <div
              v-for="item in itemList" :key="item.id"
              class="order-item-wrap"
            > -->
            <div
              class="order-item-wrap"
              @click="goToOrderDetail({ id: 1 })"
            >
              <div class="order-item-header">
                <div class="order-item-resource">
                  <van-image
                    width="30"
                    height="30"
                    round
                    src="https://sgshop-assets.fooyotravel.com/uploads/shops/logo/382/medium_7cdccc4904.png"
                  />
                  <span class="header-text">浮游小程序</span>
                </div>
                <div class="order-item-status">
                  <span>To Collect</span>
                </div>
              </div>
              <van-card
                class="order-item order-item-single"
                num="1"
                currency="S$"
                price="2.00"
                desc="豪味双人套餐"
                title="Set Meal for two"
                thumb="https://sgshop-assets.fooyotravel.com/uploads/images/image/42110/medium_90705c6858.png"
              >
                <template #footer>
                  <div class="card-footer">
                    <span class="card-footer-text">Food & Beverage</span>
                    <span class="card-footer-btn">Pickup address</span>
                  </div>
                </template>
              </van-card>
            </div>
            <div
              class="order-item-wrap"
            >
              <div class="order-item-header">
                <div class="order-item-resource">
                  <van-image
                    width="30"
                    height="30"
                    round
                    src="https://sgshop-assets.fooyotravel.com/uploads/shops/logo/382/medium_7cdccc4904.png"
                  />
                  <span class="header-text">浮游小程序</span>
                </div>
                <div class="order-item-status">
                  <span>To Collect</span>
                </div>
              </div>
              <van-card
                class="order-item order-item-multiple"
                num="2"
                currency="S$"
                price="2.00"
              >
                <template #thumb>
                  <div class="card-thumb">
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/42114/medium_f3fb0ca51d.png"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/42114/medium_f3fb0ca51d.png"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/42114/medium_f3fb0ca51d.png"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/42114/medium_f3fb0ca51d.png"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91984/medium_59d7ba2a59.jpeg"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91984/medium_59d7ba2a59.jpeg"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91984/medium_59d7ba2a59.jpeg"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91984/medium_59d7ba2a59.jpeg"
                    />
                    <van-image
                      width="92"
                      height="92"
                      fit="cover"
                      src="https://sgshop-assets.fooyotravel.com/uploads/images/image/91984/medium_59d7ba2a59.jpeg"
                    />
                  </div>
                </template>
                <template #footer>
                  <div class="card-footer">
                    <span class="card-footer-text">Food & Beverage</span>
                    <span class="card-footer-btn">Pickup address</span>
                  </div>
                </template>
              </van-card>
            </div>
          </van-list>
          <van-empty v-else description="" class="order-item-card" />
        </van-pull-refresh>
      </div>
    </div>
    <div class="page-bottom" />
  </div>
</template>

<style lang="scss" scoped>
  .page-container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .page-top{
      width: 100%;
      flex: none;
    }
    .page-scroll{
      width: 100%;
      overflow: auto;
      flex: 1 0 0;
      .item-list {
        width: 100%;
        height: 100%;
        flex: 1 1;
        padding: 0 12px 0 10px;
        .van-pull-refresh{
          overflow: unset;
        }
        .order-item-wrap{
          border-radius: 6px;
          box-shadow: 0 0 8px 0 rgb(34 34 21 / 20%);
          margin-top: 12px;
          padding: 12px;
          .order-item-header{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .order-item-resource{
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .header-text{
                font-size: 14px;
                color: #222125;
                padding: 0 10px;
              }
            }
            .order-item-status{
              color: #e26956;
              font-size: 12px;
              text-align: right;
            }
          }
          .order-item{
            padding: 0px;
            background-color: #fff;
            .card-footer{
              width: 100%;
              display: flex;
              justify-content: space-between;
              padding-top: 10px;
              align-items: center;
              .card-footer-text,
              .card-footer-btn {
                font-size: 12px;
                color: #888;
              }
              .card-footer-btn{
                min-width: 70px;
                height: 24px;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #888;
                line-height: 1em;
                margin-left: 10px;
                padding: 0 5px;
              }
            }
          }
          .order-item-multiple{
            :deep(.van-card__header){
              flex-direction: column;
              .van-card__content{
                padding: 10px;
                min-height: 0px;
              }
              .van-card__thumb{
                width: 100%;
                margin-bottom: 10px;
                .card-thumb{
                  display: flex;
                  justify-content: flex-start;
                  width: 100%;
                  overflow-x: auto;
                  padding: 10px 0px;
                  .van-image{
                    flex: none;
                    margin: 0px 5px;
                    width: 92px;
                    height: 92px;
                  }
                }
              }
            }
          }
        }
        .shop-item-row-card-container {
          box-sizing: border-box;
          word-break: break-word;
          .shop-item {
            display: flex;
            color: #000000;
            margin-bottom: 20px;
            overflow: hidden;
            will-change: transform;
            .image {
              position: relative;
              width: 96px;
              height: 96px;
              will-change: transform;
              overflow: hidden;
              flex: 0 0 auto;
              .bg-img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              flex: 1 1 10px;
              margin-left: 10px;
              position: relative;
              min-width: 0px;
              .name {
                max-width: 100%;
                font-size: 16px;
                color: #222125;
                font-weight: 500;
                margin-top: 6px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .bottom-info {
                display: flex;
                align-items: center;
                position: absolute;
                width: 100%;
                bottom: 0;
                .bottom-left {
                  flex: 1 1;
                  align-items: baseline;
                  display: flex;
                  max-height: 40px;
                  .bottom-info-price{
                    font-size: 14px;
                    color: var(--secondaryColor);
                  }
                  .bottom-info-sold-count {
                    font-size: 9px;
                    color: #888;
                    margin-left: 12px;
                  }
                }
                .bottom-right {
                  flex: 0 0 24px;
                }
              }
            }
          }
        }
      }
    }
    .page-bottom{
      height: 55px;
    }
  }
</style>
