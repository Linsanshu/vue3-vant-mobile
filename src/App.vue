<script setup lang="ts">
import type { ConfigProviderTheme, ConfigProviderThemeVars } from 'vant'
import { localStorage } from '@/utils/local-storage'
import TabBar from '@/components/tab-bar/tab-bar.vue'
import Loading from '@/components/loading/loading.vue'

import { useStore } from '@/stores/modules/theme'

const store = useStore()
const theme = ref<ConfigProviderTheme>('light')
const mode = computed(() => store.mode)
const route = useRoute()

const themeVars: ConfigProviderThemeVars = {
  buttonPrimaryBackground: 'var(--mainColor)',
  buttonPrimaryBorderColor: 'var(--mainColor)',
  buttonSmallPadding: '0 15px',
  cardPriceColor: 'var(--secondaryColor)',
}

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
  <van-config-provider :theme-vars="themeVars" :theme="theme">
    <router-view />
    <TabBar v-show="!route.meta.hideTabBar" />
    <Loading />
  </van-config-provider>
</template>
