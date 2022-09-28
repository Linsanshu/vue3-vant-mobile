<script setup lang="ts">
import { getProducts } from '@/api'
import { connectArrText } from '@/utils/utils'
// interface productDetailType {
//   custom_attributes: Array
//   desc: string
//   id: number
//   images: Array
//   name: string
//   preference_groups: Array
//   price_high: string
//   price_low: string
//   product_skus: Array
//   shop: object
//   short_desc: Array
//   variations: Array
// }
const route = useRoute()
const product = ref({})
const show = ref(false)
const getListData = async () => {
  try {
    const productDetail = await getProducts(route.params.id)
    if (productDetail.data && productDetail.data.product)
      product.value = productDetail.data.product
  }
  catch (error) {}
}
getListData()
const router = useRouter()
const onClickLeft = () => router.back()
const onClickAdd = () => {
  show.value = true
}
const onClickCheck = () => {
  show.value = true
}
const priceRange = computed(() => {
  if (product.value.price_low === product.value.price_high)
    return product.value.price_low
  else
    return `${product.value.price_low}~${product.value.price_high}`
})
const topImg = computed(() => product.value.images && product.value.images[0])
const slectedInfo = computed(() => connectArrText(product.value.variations.map(item => item.selected), ','))

let curVariationIndex = 0
const showPicker = ref(false)
const isReadonly = ref(true)
const columnsVariation = ref([])
const customFieldName = {
  text: 'name',
  value: 'id',
}
const showVariationPicker = (index) => {
  curVariationIndex = index
  columnsVariation.value = product.value.variations[index] && product.value.variations[index].variants
  isReadonly.value = true
  showPicker.value = true
}

const onConfirm = ({ selectedOptions }) => {
  product.value.variations[curVariationIndex].selected = selectedOptions[0]?.name
  product.value.variations[curVariationIndex].selectedID = selectedOptions[0]?.id
  isReadonly.value = false
  showPicker.value = false
}
const onCancel = () => {
  isReadonly.value = false
  showPicker.value = false
}
</script>

<template>
  <van-nav-bar title="Product Details">
    <template #left>
      <van-icon name="https://restaurant.fooyo.shop/static/back-l.svg" size="19" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="https://restaurant.fooyo.shop/static/web/set-icon.svg" size="19" />
    </template>
  </van-nav-bar>
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
              :src="image.image_url"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-brief">
        <div class="name">
          {{ product.name }}
        </div>
        <div class="price">
          S${{ priceRange }}
        </div>
      </div>
    </div>

    <div class="product-detail">
      <div class="detail-title">
        Product Details
      </div>
      <div class="detail-content">
        {{ product.desc }}
      </div>
    </div>
    <div class="product-note">
      <div class="note-title">
        Must Know
      </div>
      <div class="note-content">
        Details Must Know
      </div>
    </div>
  </div>
  <van-submit-bar
    :loading="false"
    currency="S$"
    label="Total:"
    :price="3055"
    button-text="提交订单"
  >
    <van-badge :content="5">
      <van-image
        width="41"
        height="32"
        src="https://sgshop-assets.fooyotravel.com/miniapp_static/has-cart.svg"
      />
    </van-badge>
    <template #tip>
      Delivery fee from S$5
    </template>
    <template #button>
      <van-button class="add-cart-button" round size="small" type="primary" @click="onClickAdd">
        Add
      </van-button>
      <van-button class="checkout-button" round size="small" type="primary" @click="onClickCheck">
        Checkout
      </van-button>
    </template>
  </van-submit-bar>
  <van-popup
    v-model:show="show"
    round
    position="bottom"
    :style="{ height: '75%' }"
  >
    <div class="add-conten">
      <div class="add-header">
        <div class="add-card">
          <van-card
            currency="S$"
            :desc="product.short_desc"
            :title="product.name"
            :thumb="topImg.image_url"
          >
            <template #price>
              <div>S${{ priceRange }}</div>
            </template>
            <template #bottom>
              <div>{{ slectedInfo ? `已选择${slectedInfo}` : '' }}</div>
            </template>
          </van-card>
        </div>
        <div class="add-main">
          <van-form>
            <van-cell-group inset title="Product Variations">
              <div v-for="(varItem, index) in product.variations" :key="varItem.id">
                <van-field
                  v-model="varItem.selected"
                  :readonly="isReadonly"
                  clearable
                  clear-trigger="always"
                  name="Variations"
                  :label="varItem.name"
                  :placeholder="`点击选择${varItem.name}`"
                  :rules="[{ required: true, message: `请选择${varItem.name}` }]"
                  @click="showVariationPicker(index)"
                />
              </div>
            </van-cell-group>
          </van-form>
        </div>
      </div>
      <div class="add-submit">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </div>
  </van-popup>
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker
      :columns-field-names="customFieldName"
      :columns="columnsVariation"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </van-popup>
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
      height: 370px;
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
  .product-detail{
    border-bottom: 6px solid #f1f1f1;
  }
  .product-detail,
  .product-note{
    padding: 20px 12px 30px;
    .detail-title,
    .note-title {
      font-size: 16px;
      color: #222125;
      font-weight: 700;
      margin-bottom: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .detail-content,
    .note-content {
      font-size: 14px;
      color: #222125;
      word-break: break-word;
    }
  }
}
.add-cart-button{
  margin-right: 1px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.checkout-button{
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.add-conten{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .add-card{

  }
}
</style>
