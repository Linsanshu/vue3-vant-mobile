<script setup lang="ts">
// import { getProducts } from '@/api'
// import { connectArrText } from '@/utils/utils'
// import { useCartInfoStore } from '@/stores/modules/cartInfo'
// const cartInfoStore = useCartInfoStore()

const router = useRouter()
const onClickLeft = () => router.back()
</script>

<template>
  <div class="page-container">
    <div class="page-top">
      <van-nav-bar class="primary-nav-bar" title="Order Details">
        <template #left>
          <van-icon name="https://restaurant.fooyo.shop/static/back-l.svg" size="19" @click="onClickLeft" />
        </template>
        <template #right>
          <van-icon name="https://restaurant.fooyo.shop/static/web/set-icon.svg" size="19" />
        </template>
      </van-nav-bar>
    </div>
    <div class="page-scroll">
      <div class="item-detail">
        <div class="item-detail-card">
          <h3>To Collect</h3>
          <p>The merchant has confirmed your self-pickup order, please come to the store to use it within the validity period.</p>
        </div>
        <div class="item-detail-card">
          <span>Contact Number：18583358635</span>
          <span>Collection Address: 133 New Bridge Rd, B1-16 CHINATOWN POINT, Singapore 059413</span>
          <span>Collection Time：<span class="important-text">2022-10-03 10:00-10:30</span></span>
        </div>
        <div class="item-detail-card">
          <div class="card-header">
            <h3>Verification Code</h3>
            <span class="tip-text">Valid Until：2022/10/03</span>
          </div>
          <div class="card-img">
            <van-image
              class="qrcode-img"
              width="173"
              height="173"
              fit="cover"
              src="https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=6ROBG9"
            />
            <span class="code">6ROBG9</span>
          </div>
        </div>
        <div class="item-detail-card">
          <div class="order-item-wrap">
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
            </div>
            <van-card
              class="order-item order-item-single"
              num="1"
              currency="S$"
              price="2.00"
              desc="豪味双人套餐"
              title="Set Meal for two"
              thumb="https://sgshop-assets.fooyotravel.com/uploads/images/image/42110/medium_90705c6858.png"
            />
            <van-card
              class="order-item order-item-single"
              num="1"
              currency="S$"
              price="2.00"
              desc="豪味双人套餐"
              title="Set Meal for two"
              thumb="https://sgshop-assets.fooyotravel.com/uploads/images/image/42110/medium_90705c6858.png"
            />
            <van-card
              class="order-item order-item-single"
              num="1"
              currency="S$"
              price="2.00"
              desc="豪味双人套餐"
              title="Set Meal for two"
              thumb="https://sgshop-assets.fooyotravel.com/uploads/images/image/42110/medium_90705c6858.png"
            />
            <div class="sub-info">
              <div class="split-text">
                <span class="tip-text">Subtotal</span>
                <span>S$54.70</span>
              </div>
              <div class="split-text">
                <span class="tip-text">Delivery Fee</span>
                <span>S$0.00</span>
              </div>
              <div class="split-text">
                <span class="tip-text">GST(7%)</span>
                <span>S$3.82</span>
              </div>
            </div>
            <div class="total-info">
              <span>4 Items, Total Amount to Pay:</span>
              <span class="total-price">S$58.52</span>
            </div>
          </div>
        </div>
        <!-- <div class="item-detail-card">
        </div> -->
        <div class="item-detail-card">
          <div class="card-header">
            <h3>Order Information</h3>
          </div>
          <div class="card-body">
            <span class="tip-text">Order Number: 1664509856_168370_4_c24c</span>
            <span class="tip-text">Created at: 2022/09/30 11:50:52</span>
            <span class="tip-text">Paid at: 2022/09/30 11:50:56</span>
            <span class="tip-text">Delivery: Self pickup</span>
            <span class="tip-text">Contact Merchant: none</span>
          </div>
        </div>
      </div>
    </div>
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
    .primary-nav-bar {
      background: rgb(253, 215, 84);
      &::after{
        content: none;
      }
    }
  }
  .page-scroll{
    width: 100%;
    overflow: auto;
    flex: 1 0 0;
    .item-detail{
      width: 100%;
      height: 100vh;
      .item-detail-card{
        padding: 20px 12px;
        font-size: 14px;
        color: #888;
        border-bottom: 6px solid #f1f1f1;
        h3{
          font-size: 16px;
          color: var(--mainColor);
          font-weight: 700;
          margin-bottom: 9px;
          display: flex;
          justify-content: space-between;
        }
        span{
          display: block;
          margin-bottom: 10px;
          color: #222125;
          .important-text{
            display: inline-block;
            color: var(--mainColor);
          }
          &.tip-text{
            color: #888;
          }
        }
        .order-item-wrap{
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
        .card-header,
        .split-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .total-info,
        .sub-info{
          margin-top: 20px;
        }
        .total-info{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .total-price{
            color: var(--secondaryColor);
          }
        }
        .card-img{
          margin-top: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .qrcode-img{
            width: 173px;
            height: 173px;
            display: block;
            margin: 0 auto 10px;
            background-color: #d1d1d1;
          }
          .code{
            font-size: 24px;
            color: #222125;
            text-align: center;
          }
        }
        &:last-of-type{
          border-bottom: none;
        }
      }
    }
  }
}
</style>
