<template>
  <Icon  icon="ep-search" id="search_class"/>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';

// 定义组件选项
defineComponent({
  name: 'ConsigneeIcon'
});
</script>
<style scoped lang="scss">
#search_class {
  cursor: pointer;

  &:hover {
    color: #409EFF;
  }
}
</style>

