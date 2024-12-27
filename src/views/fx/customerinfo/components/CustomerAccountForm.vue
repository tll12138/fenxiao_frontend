<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px">
      <el-table-column label="序号" type="index" width="100" />
       <el-table-column label="业务主体" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.company`" :rules="formRules.company" class="mb-0px!">
            <el-input v-model="row.company" placeholder="请输入业务主体" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="余额" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.balance`" :rules="formRules.balance" class="mb-0px!">
            <el-input v-model="row.balance" placeholder="请输入余额" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="账户编号" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.accountId`" :rules="formRules.accountId" class="mb-0px!">
            <el-input v-model="row.accountId" placeholder="请输入账户编号" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="暂扣金额" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.detainAmount`" :rules="formRules.detainAmount" class="mb-0px!">
            <el-input v-model="row.detainAmount" placeholder="请输入暂扣金额" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="是否冻结" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.isActive`" :rules="formRules.isActive" class="mb-0px!">
            <el-input v-model="row.isActive" placeholder="请输入是否冻结" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="押金" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.deposit`" :rules="formRules.deposit" class="mb-0px!">
            <el-input v-model="row.deposit" placeholder="请输入押金" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="60">
        <template #default="{ $index }">
          <el-button @click="handleDelete($index)" link>—</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <el-row justify="center" class="mt-3">
    <el-button @click="handleAdd" round>+ 添加分销商账号</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { CustomerInfoApi } from '@/api/fx/customerinfo'

const props = defineProps<{
  distributorNum: undefined // 分销商编号（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formData = ref([])
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.distributorNum,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await CustomerInfoApi.getCustomerAccountListByDistributorId(val)
    } finally {
      formLoading.value = false
    }
  },
  { immediate: true }
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    id: undefined,
    distributorNum: undefined,
    company: undefined,
    balance: undefined,
    accountId: undefined,
    detainAmount: undefined,
    isActive: undefined,
    deposit: undefined,
  }
  row.distributorNum = props.distributorNum
  formData.value.push(row)
}

/** 删除按钮操作 */
const handleDelete = (index) => {
  formData.value.splice(index, 1)
}

/** 表单校验 */
const validate = () => {
  return formRef.value.validate()
}

/** 表单值 */
const getData = () => {
  return formData.value
}

defineExpose({ validate, getData })
</script>
