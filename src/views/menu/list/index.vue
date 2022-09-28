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
</script>

<template>
  <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
  <div class="item-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-if="itemList.length"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in itemList" :key="item.id" class="shop-item-row-card-container" @click="goDetail(item)">
          <div class="shop-item">
            <div class="image">
              <div class="bg-img">
                <van-image
                  width="96"
                  height="96"
                  radius="8"
                  fit="cover"
                  :src="item.image_url"
                />
              </div>
            </div>
            <div class="info">
              <div class="name">
                <text class="shop-item-name-body">
                  {{ item.name }}
                </text>
              </div>
              <div class="bottom-info">
                <div class="bottom-left">
                  <div class="bottom-info-price">
                    <span>S${{ item.price_high }}</span>
                  </div>
                  <div class="bottom-info-sold-count">
                    <span>59 Sold</span>
                  </div>
                </div>
                <div class="bottom-right">
                  <div class="has-authorized">
                    <div class="add-cart">
                      <!-- <van-image
                        width="24"
                        height="24"
                        src="https://restaurant.fooyo.shop/static/themeone/add-cart.svg"
                      /> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <van-empty v-else description="暂无商品列表" />
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.item-list {
  width: 100%;
  height: 100%;
  flex: 1 1;
  padding: 0 12px 0 10px;
  .shop-item-row-card-container {
    box-sizing: border-box;
    font-family: PingFang SC,Tahoma,Microsoft Yahei,Helvetica,Arial,宋体,sans-serif;
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
</style>
