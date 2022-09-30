<script setup lang="ts">
import { getAssetURL } from '@/utils/load_assets.ts'

const router = useRouter()
const onClickLeft = () => router.back()

const checked = ref('Dine in')

const contactNumber = ref<number>()
const contactEmail = ref('')
const optional = ref('')
const onClickCheck = () => {}
</script>

<template>
  <van-nav-bar class="primary-nav-bar" title="Order Confirmation">
    <template #left>
      <van-icon name="https://restaurant.fooyo.shop/static/back-l.svg" size="19" @click="onClickLeft" />
    </template>
    <template #right>
      <van-icon name="https://restaurant.fooyo.shop/static/web/set-icon.svg" size="19" />
    </template>
  </van-nav-bar>
  <div class="container">
    <div class="header-container">
      <div class="header-bg" />
      <div class="header-switch">
        <div class="header-switch-text">
          <van-radio-group v-model="checked" class="header-switch-radios">
            <van-radio name="Dine in">
              <template #icon />
              <div class="radio" :class="checked === 'Dine in' ? 'activeRadio' : 'inActiveRadio'">
                <span>Dine in</span>
              </div>
            </van-radio>
            <van-radio name="Pick up">
              <template #icon />
              <div class="radio" :class="checked === 'Pick up' ? 'activeRadio' : 'inActiveRadio'">
                <span>Pick up</span>
              </div>
            </van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="contact-container">
        <div class="contact-number">
          <van-field v-model="contactNumber" label="Contact Number" placeholder="请输入电话" right-icon="https://restaurant.fooyo.shop/static/pencil-edit.svg" />
        </div>
        <div class="contact-email">
          <van-field v-model="contactEmail" label="Contact Email" placeholder="请输入邮箱" right-icon="https://restaurant.fooyo.shop/static/pencil-edit.svg" />
        </div>
      </div>
    </div>
    <div class="cart-list-container">
      <div class="cart-list">
        <div class="cart-item">
          <van-card
            currency="S$"
            desc="aaaaaa"
            title="aaa"
            num="1"
            thumb="https://sgshop-assets.fooyotravel.com/uploads/images/image/91992/medium_e26a3298f3.jpeg"
          >
            <template #price>
              <div>S$123</div>
            </template>
          </van-card>
        </div>
        <div class="cart-info">
          <van-cell-group>
            <van-cell title="Coupon Code" value="Click to enter" />
            <van-cell title="GST(7%)" value="S$1.11" />
            <van-field v-model="optional" label="Notes to Merchant" placeholder="Optional" />
            <van-cell class="info-cell">
              <template #title />
              <template #value>
                <span>2 items, Subtotal：</span>
                <span class="price">S$17.01</span>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>
    <div class="law-container">
      <div>
        <van-image
          class="law-icon"
          width="14"
          height="14"
          :src="getAssetURL('common/download.png')"
        />
      </div>
      <div class="law-text">
        <span>I have read and agree to
          <span class="law-link">  &lt;&lt;Terms of condition&gt;&gt; </span>
          and
          <span class="law-link"> &lt;&lt;Privacy policy&gt;&gt;</span>
        </span>
      </div>
    </div>
    <div class="footer-declare">
      <van-image
        width="260"
        height="13"
        src="https://sgshop-assets.fooyotravel.com/miniapp_static/fooyo-logo.png"
      />
    </div>
  </div>
  <van-submit-bar
    class="confirm-order"
    :loading="false"
    currency="S$"
    label="&nbsp;"
    :price="3055"
    button-text="提交订单"
  >
    <template #tip>
      Delivery fee from S$5
    </template>
    <template #button>
      <van-button class="checkout-button" round size="small" type="primary" @click="onClickCheck">
        Confirm
      </van-button>
    </template>
  </van-submit-bar>
</template>

<style lang="scss" scoped>
.primary-nav-bar {
  background: rgb(253, 215, 84);
  &::after{
    content: none;
  }
}
.container {
  min-height: 100vh;
  background-color: #f1f1f1;
  padding-bottom: calc(62px + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  .header-container{
    width: 100%;
    height: auto;
    .header-bg{
      width: 100%;
      height: 162px;
      position: fixed;
      z-index: 0;
      top: auto;
      max-width: var(--maxScreenWidth);
      margin: 0 auto;
      background-image: url(https://restaurant.fooyo.shop/static/themeone/comfirm-bg.svg);
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
    }
    .header-switch{
      margin: 14px 12px 0;
      background-color: hsla(0,0%,100%,.2);
      width: 162px;
      height: 35px;
      border-radius: 17px;
      position: relative;
      z-index: 0;
      .header-switch-text{
        display: flex;
        width: 100%;
        height: 35px;
        .header-switch-radios{
          width: 100%;
          display: flex;
          justify-content: space-around;
          :deep(.van-radio){
            width: 100%;
            .van-radio__label{
              width: 100%;
              margin-left: 0px;
              display: flex;
              justify-content: center;
            }
          }
          .radio{
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .activeRadio{
            width: 95%;
            height: 31px;
            color: var(--mainColor);
            background-color: #fff;
            border-radius: 15px;
            margin: 2px
          }
          .inActiveRadio{
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
          }
        }
      }
    }
    .contact-container{
      overflow: hidden;
      margin: 14px 12px 10px 12px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      text-align: center;
      color: #888;
      height: 55px;
      background-color: #fff;
      :deep(.van-field){
        padding: 0 10px;
        flex-direction: column;
        .van-cell__title{
          width: 100%;
          label{
            font-size: 12px;
            color: #888;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
  .cart-list-container{
    min-height: 200px;
    position: relative;
    z-index: 1;
    margin: 0px 12px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 6px;
    padding: 0px 0 22px 0;
    border-radius: 8px;
    .cart-list{
      .cart-item{
        position: relative;
        width: 100%;
        overflow: hidden;
        margin-top: 14px;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 14px;
        .van-card{
          background-color: #fff;
        }
      }
      .cart-info{
        .van-cell-group::after{
          border: none;
        }
        .info-cell{
          :deep(.van-cell__title){
            flex: 0 1 auto;
          }
        }
        :deep(.van-cell__value){
          color: var(--van-field-label-color);
          font-size: 12px;
          width: 100%;
          .price{
            font-size: 16px;
            color: var(--secondaryColor);
          }
        }
      }
    }
  }
  .law-container{
    min-height: 60px;
    position: relative;
    z-index: 1;
    margin: 0px 12px;
    border-radius: 8px;
    background: #fff;
    margin-bottom: 6px;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .law-icon{
      background-color: var(--mainColor);
      margin: 10px;
      border-radius: 7px;
    }
    .law-text{
      font-size: 12px;
      color: #888;
      .law-link{
        color: var(--mainColor);
        text-decoration: underline;
        word-break: break-word;
      }
    }
  }
  .footer-declare{
    margin:30px 20px 0px;
    display: flex;
    justify-content: center;
  }
}
.confirm-order {
  :deep(.van-submit-bar__bar){
    justify-content: space-between;
    .van-submit-bar__text{
      flex: none;
    }
  }
}
</style>
