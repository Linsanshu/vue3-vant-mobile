import { defineStore } from 'pinia'
import { getQuotation } from '@/api'

export const useCartInfoStore = defineStore('main', {
  state: () => ({
    cartInfoArr: [],
    quotationInfo: {},
  }),
  getters: {
    cartInfoArrLeng: state => state.cartInfoArr.length,
  },
  actions: {
    addToCart(newCartInfo) {
      this.cartInfoArr.push(newCartInfo)
    },
    getQuotation(fulfillment_method) {
      const params = {
        'cart_checkout': true,
        'sellables': this.cartInfoArr,
        'fulfillment': {
          'fulfillment_method': fulfillment_method,
          'fulfillment_date': 'string',
          'fulfillment_time_slot_id': 0,
        },
        'receiver_information': {
          'receiver_name': 'string',
          'receiver_email': 'string',
          'receiver_phone_number': 'string',
          'address_line_1': 'string',
          'address_line_2': 'string',
          'address_line_3': 'string',
          'address_postal_code': 'string',
          'table_no': 'string',
        },
        'voucher_ids': [
          0,
        ],
      }
      getQuotation(params).then((res) => {
        this.quotationInfo = res.data.quotation
      }).catch ((error) => { console.log(error) })
    },
  },
})

