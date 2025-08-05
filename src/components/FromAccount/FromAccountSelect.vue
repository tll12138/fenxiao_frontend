<template>
  <el-form-item prop="distributorId">
<!--    <template v-if="!disabled">-->
      <el-select
        ref="selectRef"
        class="search-select select-form w-240px!"
        :suffix-icon="disabled ? null: ConsigneeIcon"
        :model-value="modelValue"
        @update:model-value="$emit('update:modelValue', $event)"
        placeholder="请选择"
        filterable
        clearable
        :disabled="disabled"
      >
        <el-option
          v-for="dict in fromAccountList"
          :key="dict.id"
          :label="dict.accountName"
          :value="dict.id"
        />
      </el-select>
<!--    </template>-->
  </el-form-item>
</template>

<script setup lang="ts">
import ConsigneeIcon from '@/views/fx/ordersinfo/components/ConsigneeIcon.vue'
import { FromAccountApi } from '@/api/fx/fromaccount'

defineProps({
  modelValue: [Number, String],
  disabled: {
    // 接收父组件传递的 disabled 状态
    type: Boolean,
    default: false
  }
})

const fromAccountList = ref()
const selectRef = ref()

// 获取收货方列表
const loadFromAccountList = async () => {
  const res = await FromAccountApi.getFromAccountPage({ pageNo: 1, pageSize: 10000 })
  fromAccountList.value = res.list
}

// 暴露方法给父组件
defineExpose({
  selectRef,
  loadFromAccountList
})

// 初始化时自动加载
loadFromAccountList()
</script>
