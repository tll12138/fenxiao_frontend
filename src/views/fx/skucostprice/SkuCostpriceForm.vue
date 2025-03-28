<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="品牌" prop="brand">
        <el-select v-model="formData.brand" placeholder="请选择品牌">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入商品编码" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="规格" prop="value">
        <el-input v-model="formData.value" placeholder="请输入规格" />
      </el-form-item>
<!--      <el-form-item label="品类" prop="type">-->
<!--        <el-select v-model="formData.type" placeholder="请选择品类">-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="属性" prop="paid">
        <el-input v-model="formData.paid" placeholder="请输入属性" />
      </el-form-item>
      <el-form-item label="财务结算价" prop="costPrice">
        <el-input v-model="formData.costPrice" placeholder="请输入财务结算价" />
      </el-form-item>
      <el-form-item label="采购成本" prop="costOtherprice">
        <el-input v-model="formData.costOtherprice" placeholder="请输入采购成本" />
      </el-form-item>
      <el-form-item label="出库成本" prop="outCost">
        <el-input v-model="formData.outCost" placeholder="请输入出库成本" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { SkuCostpriceApi, SkuCostpriceVO } from '@/api/fx/skucostprice'

/** 商品成本 表单 */
defineOptions({ name: 'SkuCostpriceForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  brand: undefined,
  skuId: undefined,
  name: undefined,
  value: undefined,
  type: undefined,
  paid: undefined,
  costPrice: undefined,
  costOtherprice: undefined,
  outCost: undefined,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await SkuCostpriceApi.getSkuCostprice(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as SkuCostpriceVO
    if (formType.value === 'create') {
      await SkuCostpriceApi.createSkuCostprice(data)
      message.success(t('common.createSuccess'))
    } else {
      await SkuCostpriceApi.updateSkuCostprice(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    brand: undefined,
    skuId: undefined,
    name: undefined,
    value: undefined,
    type: undefined,
    paid: undefined,
    costPrice: undefined,
    costOtherprice: undefined,
    outCost: undefined,
  }
  formRef.value?.resetFields()
}
</script>
