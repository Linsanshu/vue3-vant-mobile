<script setup lang="ts">
import { getSellables } from '@/api'
const itemList = ref < Array<sellablesItem> > ([])
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

getListData()
</script>

<template>
  <div class="itemlist">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-if="itemList.length"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in itemList" :key="item.id" :title="item.name" /> -->
        <div v-for="item in itemList" :key="item.id" class="shop-item-row-card-container">
          <div class="shop-item">
            <div class="image">
              <div class="bg-img">
                <van-image
                  width="100"
                  height="100"
                  src="item.image_url"
                />
              </div>
            </div>
            <div class="info">
              <div class="name">
                <text class="shop-item-name-body">
                  {{ item.name }}
                </text>
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
.itemlist {
  width: 100vw;
  height: 100vh;
  .shop-item-row-card-container .shop-item {
	display: flex;
	color: #000000;
	margin-bottom: 40rpx;
	overflow: hidden;
	will-change: transform;
}

.shop-item-row-card-container .shop-item .image {
	position: relative;
	width: 192rpx;
	height: 192rpx;
	will-change: transform;
	overflow: hidden;
	border-radius: 16rpx;
	flex: 0 0 auto;
}

.shop-item-row-card-container .item-card .image .image-mask {
	height: 56rpx;
}

.shop-item-row-card-container .shop-item .image .flash-tag {
	position: absolute;
	left: 0;
	top: 20rpx;
	padding: 6rpx;
	background-color: var(--mainColor);
	border-radius: 0 4rpx 0 4rpx;
	color: #ffffff;
	font-size: 18rpx;
}

.shop-item-row-card-container .shop-item .image .bg-img {
	width: 100%;
	height: 100%;
	border-radius: 8rpx;
	will-change: transform;
}

.shop-item-row-card-container .shop-item .image .mask-layer {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 140rpx;
	z-index: 10;
	border-radius: 8rpx;
	background-image: linear-gradient(to top, rgba(34, 33, 37, 0.8), rgba(34, 33, 37, 0));
}

.shop-item-row-card-container .shop-item .info {
	flex: 1 1 20rpx;
	margin-left: 20rpx;
	position: relative;
	/*下面这行必须保留，flexbox的bug*/
	min-width: 0rpx;
}

.shop-item-row-card-container .shop-item .info .name {
    max-width: 100%;
    font-size: 32rpx;
    color: #222125;
	font-weight: 500;
    margin-top: 12rpx;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
}
.shop-item-row-card-container .shop-item .info .activity-label {
	padding: 2rpx 4rpx;
	border-radius: 4rpx;
	background-color: var(--mainColor);
	font-size: 18rpx;
	color: #fff;
	margin-right: 6rpx;
	display: inline-block;
	position: relative;
	top: -4rpx;
}

.shop-item-row-card-container .shop-item .info .other-info {
	max-width: 87%;
	font-size: 24rpx;
	margin-top: 12rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	color: #888888;
}

.shop-item-row-card-container .shop-item .info .bottom-info {
	display: flex;
	align-items: center;
	position: absolute;
	width: 100%;
	bottom: 0;
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-left {
	flex: 1 1;
	align-items: baseline;
	display: flex;
	max-height: 80rpx;
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-left .bottom-info-price {
	/* #ifdef APP-MORI */
	font-size: 32rpx;
	/* #endif */
	/* #ifndef APP-MORI */
	font-size: 28rpx;
	/* #endif */
	color: var(--secondaryColor);
	/* #ifdef APP-FORYOU */
	font-weight: 500;
	/* #endif */
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-left .bottom-info-price text {
	font-size: 20rpx;
	/* #ifdef APP-FORYOU */
	font-weight: normal;
	/* #endif */
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-left .bottom-info-sold-count {
	font-size: 18rpx;
	color: #888888;
	margin-left: 24rpx;
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-right {
	flex: 0 0 48rpx;
}

.shop-item-row-card-container .shop-item .info .bottom-info .bottom-right image {
	width: 48rpx;
	height: 48rpx;
}
.shop-item-row-card-container .shop-item .info .tag {
    display: flex;
    align-items: center;
    padding-top: 14rpx;
}
.shop-item-row-card-container .shop-item .info .tag .tagItem {
    display: flex;
    align-items: center;
	justify-content: center;
    padding: 0 6rpx;
    height: 34rpx;
	line-height: 34rpx;
    border-radius: 6rpx;
    margin-right: 6rpx;
    border: solid 1px var(--mainColor);
    max-width: 140rpx;
}

.original-price-common{
    position: relative;
    font-size: 20rpx;
    color: #aaaaaa;
    margin-left: 10rpx;
}
.original-price-common.no-margin {
	margin-left: 0;
	margin-top: 2rpx;
	text-decoration: line-through;
}
.original-price-common .cross-line{
    /*border-bottom: 2rpx solid #aaaaaa;*/
    position: absolute;
    top: calc(50% - 1rpx);
    right: 0;
    width: 100%;
    height: 2rpx;
    background-color: #aaaaaa;
}
.group-label {
	font-size: 18rpx;
	padding: 2rpx 4rpx;
	color: var(--secondaryColor);
	border: 2rpx solid var(--secondaryColor);
	border-radius: 4rpx;
	margin-bottom: 8rpx;
}

.image-mask {
	position: absolute;
	bottom: 0;
	width: 100%;
	border-radius: 0 0 16rpx 16rpx;
	padding: 10rpx 0;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 28rpx;
	font-weight: 500;
}

.image-mask.unbuyeable {
	background-color: rgba(248, 169, 9, 0.65);
}

.image-mask.sold-out {
	background-color: rgba(51, 51, 51, 0.65);
}

.shop-item-column-card-container .item-card .image .bg-img .flexi-combo-label{
	position: absolute;
	bottom: 0;
	width: 100%;
}
.shop-item-column-card-container .item-card .image .bg-img .flexi-combo-label .bg{
	width: 100%;
	height: 66rpx;
	border-radius: 0;
	position: absolute;
	bottom: 0;
}
.shop-item-column-card-container .item-card .image .bg-img .flexi-combo-label .label-text{
	color: white;
	font-size: 24rpx;
	position: absolute;
	bottom: 8rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	text-align: center;
}
.shop-item-column-card-container .item-card .image .bg-img .flexi-combo-label .label-text text {
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: -o-ellipsis-lastline;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.shop-item-row-card-container .shop-item .image .flexi-combo-label{
	position: absolute;
	bottom: 0;
	width: 100%;
}
.shop-item-row-card-container .shop-item .image .flexi-combo-label .bg{
	width: 100%;
	height: 44rpx;
	border-radius: 0;
	position: absolute;
	bottom: 0;
}
.shop-item-row-card-container .shop-item .image .flexi-combo-label .label-text{
	color: white;
	font-size: 20rpx;
	position: absolute;
	bottom: 0rpx;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	text-align: center;
}
.shop-item-row-card-container .shop-item .image .flexi-combo-label .label-text text {
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: -o-ellipsis-lastline;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}
}
</style>
