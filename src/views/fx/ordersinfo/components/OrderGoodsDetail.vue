<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { OrdersInfoApi } from '@/api/fx/ordersinfo'

const props = defineProps<{
  orderId: undefined // 主表订单id（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formData = ref([])
const formRules = reactive({
  orderId: [{ required: true, message: '主表订单id不能为空', trigger: 'blur' }],
  skuId: [{ required: true, message: '商品编码不能为空', trigger: 'blur' }],
  skuName: [{ required: true, message: '商品名称不能为空', trigger: 'blur' }],
  category: [{ required: true, message: '商品规格不能为空', trigger: 'blur' }],
  price: [{ required: true, message: '销售价不能为空', trigger: 'blur' }],
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.orderId,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await OrdersInfoApi.getOrdersDetailListByOrderId(val)
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
    orderId: undefined,
    saleType: undefined,
    skuId: undefined,
    skuName: undefined,
    category: undefined,
    price: undefined,
    salePrice: undefined,
    count: undefined,
    priceAmount: undefined,
    goodsWeight: undefined,
    otherAvailCount: undefined,
  }
  row.orderId = props.orderId
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
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="商品编码" min-width="120">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.skuId`" :rules="formRules.skuId" class="mb-0px!">
            <el-input v-model="row.skuId" placeholder="商品编码" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="销售类型" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.saleType`" :rules="formRules.saleType" class="mb-0px!">
            <el-select v-model="row.saleType" placeholder="类型">
              <el-option
                v-for="dict in getIntDictOptions(DICT_TYPE.FX_DETAIL_RETURN_TYPE)"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.skuName`" :rules="formRules.skuName" class="mb-0px!">
            <el-input v-model="row.skuName" placeholder="请输入商品名称" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品规格" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.category`" :rules="formRules.category" class="mb-0px!">
            <el-input v-model="row.category" placeholder="请输入商品规格" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="销售价" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.price`" :rules="formRules.price" class="mb-0px!">
            <el-input v-model="row.price" placeholder="销售价" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="结算价" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.salePrice`" :rules="formRules.salePrice" class="mb-0px!">
            <el-input v-model="row.salePrice" placeholder="结算价" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="数量" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.count`" :rules="formRules.count" class="mb-0px!">
            <el-input v-model="row.count" placeholder="请输入数量" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="销售金额" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.priceAmount`" :rules="formRules.priceAmount" class="mb-0px!">
            <el-input v-model="row.priceAmount" placeholder="销售金额" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="商品净重(kg)" min-width="120">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.goodsWeight`" :rules="formRules.goodsWeight" class="mb-0px!">
            <el-input v-model="row.goodsWeight" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="其他仓库可用库存" min-width="120">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.otherAvailCount`" :rules="formRules.otherAvailCount" class="mb-0px!">
            <el-input v-model="row.otherAvailCount"  />
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
    <el-button @click="handleAdd" round>+ 添加商品明细</el-button>
  </el-row>
</template>

<style scoped lang="scss">

</style>
