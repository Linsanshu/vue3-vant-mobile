<script setup lang="ts">
import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'
import { setLang } from '@/i18n'

const store = useStore()
const themeStore = localStorage.get('theme')
const checked = ref < boolean > (themeStore === 'dark')
const lanChange = ref < boolean > (false)

watch(checked, (val) => {
  if (val) {
    store.mode = 'dark'
    localStorage.set('theme', 'dark')
  }
  else {
    store.mode = 'light'
    localStorage.set('theme', 'light')
  }
})
watch(lanChange, (val) => {
  if (val)
    setLang('en-us')
  else
    setLang('zh-cn')
})
</script>

<template>
  <div class="container">
    <van-cell-group title="个人设置" inset>
      <van-cell center title="暗黑模式">
        <template #right-icon>
          <van-switch v-model="checked" size="18px" />
        </template>
      </van-cell>
      <van-cell center :title="$t('lan-change')">
        <template #right-icon>
          <van-switch v-model="lanChange" size="18px" />
        </template>
      </van-cell>
      <van-cell title="mock" to="mock" is-link />
    </van-cell-group>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  position: relative;
  .custom-title {
    margin-right: 4px;
    vertical-align: middle;
  }
}
</style>
