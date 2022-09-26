<script setup lang="ts">
import { useStore } from '@/stores'
import { localStorage } from '@/utils/local-storage'
import { setLang } from '@/i18n'
import { getLogin, getSellables } from '@/api'
import { STORAGE_TOKEN_KEY } from '@/stores/mutation-type'

const pull = (target) => {
  switch (target) {
    case 'getSellables':
      getSellables().then(res => console.log(res))
      break
    default:
      getLogin({
        'user': {
          'sign_in_type': 'user',
          'email': 'linchuan@fooyo.cg',
          'phone_number': '18583358635',
          'password': '11111111',
          'token_provider': 'ciam',
          'token': 'string',
          'device_key': 'string',
        },
      }).then((res) => {
        localStorage.set(STORAGE_TOKEN_KEY, `Bearer ${res.authorization && res.authorization.access_token}`)
      })
  }
}
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
  if (val) {
    setLang('en-us')
    localStorage.set('language', 'en')
  }
  else {
    setLang('zh-cn')
    localStorage.set('language', 'zh')
  }
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
      <van-cell title="登陆">
        <van-button round block type="primary" size="mini" @click="pull">
          请求
        </van-button>
      </van-cell>
      <van-cell title="getSellables">
        <van-button round block type="primary" size="mini" @click="pull('getSellables')">
          请求
        </van-button>
      </van-cell>
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
