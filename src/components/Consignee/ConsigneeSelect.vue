<template>
  <el-form-item prop="distributorId" >
    <el-select
      ref="selectRef"
      class="search-select select-form w-240px!"
      :suffix-icon="ConsigneeIcon"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      placeholder="请选择"
      filterable
      clearable
    >
      <el-option
        v-for="dict in consigneeList"
        :key="dict.id"
        :label="dict.distributorName"
        :value="dict.id"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import { CustomerInfoApi } from '@/api/fx/customerinfo'
import ConsigneeIcon from '@/views/fx/ordersinfo/components/ConsigneeIcon.vue'

defineProps({
  modelValue: [Number, String]
})

const consigneeList = ref()
const selectRef = ref()

// 获取收货方列表
const loadConsigneeList = async () => {
  const res = await CustomerInfoApi.getCustomerInfoPage({ pageNo: 1, pageSize: 100 })
  consigneeList.value = res.list
}

// 暴露方法给父组件
defineExpose({
  selectRef,
  loadConsigneeList
})

// 初始化时自动加载
loadConsigneeList()
</script>
