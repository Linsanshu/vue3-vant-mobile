<script>
export default {
  props: {
    titles: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['tabItemClick'],
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabItemClick', index)
    },
    setCurrentIndex(index) {
      this.currentIndex = index
    },
  },
}
</script>

<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles" :key="item">
      <div
        class="tab-control-item"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary-color);
    padding: 8px;
  }
</style>

