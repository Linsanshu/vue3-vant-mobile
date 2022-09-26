<script setup lang="ts">
import { getSellables } from '@/api'
const itemList = ref < Array<object> > ([])
const sellableRes = {
  'objects': [
    {
      'id': 5,
      'name': 'Panda T-shirt',
      'short_desc': 'Panda T-shirt made with cutton.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/21/0.jpeg',
      'price_low': '62.80',
      'price_high': '68.80',
    },
    {
      'id': 4,
      'name': 'Animal Plushie',
      'short_desc': 'Cute animal plushies.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/19/0.jpeg',
      'price_low': '32.60',
      'price_high': '32.60',
    },
    {
      'id': 4,
      'name': 'Animal Plushie',
      'short_desc': 'Cute animal plushies.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/19/0.jpeg',
      'price_low': '32.60',
      'price_high': '32.60',
    },
    {
      'id': 4,
      'name': 'Animal Plushie',
      'short_desc': 'Cute animal plushies.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/19/0.jpeg',
      'price_low': '32.60',
      'price_high': '32.60',
    },
    {
      'id': 4,
      'name': 'Animal Plushie',
      'short_desc': 'Cute animal plushies.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/19/0.jpeg',
      'price_low': '32.60',
      'price_high': '32.60',
    },
    {
      'id': 4,
      'name': 'Animal Plushie',
      'short_desc': 'Cute animal plushies.',
      'sellable_type': 'product',
      'image_url': 'https://msic2dev.blob.core.windows.net/msic2dev/core/uploads/images/image/19/0.jpeg',
      'price_low': '32.60',
      'price_high': '32.60',
    },
  ],
  'pagination': {
    'current_page': 1,
    'next_page': null,
    'prev_page': null,
    'total_pages': 1,
    'total_count': 2,
  },
}
const list = ref([])
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
const onLoad = () => {
  // getSellables().then((res) => {
  //   const { objects, pagination } = res.data
  //   if (refreshing.value) {
  //     itemList.value = []
  //     refreshing.value = false
  //   }
  //   itemList.value = objects
  //   loading.value = false

  //   if (list.value.length === pagination.total_count)
  //     finished.value = true

  //   refreshing.value = false
  // })
  const { objects, pagination } = sellableRes
  if (refreshing.value) {
    itemList.value = []
    refreshing.value = false
  }
  itemList.value = objects
  loading.value = false
  if (list.value.length === pagination.total_count)
    finished.value = true
  refreshing.value = false
  console.log(refreshing.value, finished.value, loading.value)
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true
  onLoad()
}
</script>

<template>
  <div class="itemlist">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style lang="scss" scoped>
.itemlist {
  width: 100vw;
  height: 100vh;
}
</style>
