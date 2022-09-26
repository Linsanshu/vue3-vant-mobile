<script setup lang="ts">
import type { ConfigProviderTheme } from 'vant'
import { localStorage } from '@/utils/local-storage'
import TabBar from '@/components/tab-bar/tab-bar.vue'

import { useStore } from '@/stores'

const store = useStore()
const theme = ref<ConfigProviderTheme>('light')
const mode = computed(() => store.mode)

watch(mode, (val) => {
  if (val === 'dark' || localStorage.get('theme') === 'dark') {
    theme.value = 'dark'
    document.querySelector('html')
      .setAttribute('data-theme', 'dark')
  }
  else {
    theme.value = 'light'
    document.querySelector('html')
      .setAttribute('data-theme', 'light')
  }
}, { immediate: true })
</script>

<template>
  <van-config-provider :theme="theme">
    <router-view />
    <TabBar />
  </van-config-provider>
</template>
