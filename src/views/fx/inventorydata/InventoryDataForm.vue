<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="商品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入商品编码" />
      </el-form-item>
<!--      <el-form-item label="条形码" prop="scanCode">-->
<!--        <el-input v-model="formData.scanCode" placeholder="请输入条形码" />-->
<!--      </el-form-item>-->
      <el-form-item label="商品id" prop="goodId">
        <el-input v-model="formData.goodId" placeholder="请输入商品资料id" />
      </el-form-item>
<!--      <el-form-item label="良品库存" prop="qty">-->
<!--        <el-input v-model="formData.qty" placeholder="请输入良品库存" />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="次品库存" prop="defectiveQty">-->
<!--        <el-input v-model="formData.defectiveQty" placeholder="请输入次品库存" />-->
<!--      </el-form-item>-->
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input v-model="formData.warehouseName" placeholder="请输入仓库名称" />
      </el-form-item>
<!--      <el-form-item label="仓库类型" prop="type">-->
<!--        <el-select v-model="formData.type" placeholder="请选择仓库类型">-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="所属仓库" prop="warehouseId">
        <el-input v-model="formData.warehouseId" placeholder="请输入所属仓库" />
      </el-form-item>
      <el-form-item label="仓库编码" prop="warehouseCode">
        <el-input v-model="formData.warehouseCode" placeholder="请输入仓库编码" />
      </el-form-item>
<!--      <el-form-item label="销售出库数" prop="saleQty">-->
<!--        <el-input v-model="formData.saleQty" placeholder="请输入销售出库数" />-->
<!--      </el-form-item>-->
      <el-form-item label="数据渠道" prop="channel">
        <el-input v-model="formData.channel" placeholder="请输入数据渠道" />
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <el-input v-model="formData.brand" placeholder="请输入商品品牌" />
      </el-form-item>
      <el-form-item label="规格" prop="value">
        <el-input v-model="formData.value" placeholder="请输入规格" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入商品名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { InventoryDataApi, InventoryDataVO } from '@/api/fx/inventorydata'

/** 分销商品库存 表单 */
defineOptions({ name: 'InventoryDataForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  skuId: undefined,
  scanCode: undefined,
  goodId: undefined,
  qty: undefined,
  defectiveQty: undefined,
  warehouseName: undefined,
  type: undefined,
  warehouseId: undefined,
  warehouseCode: undefined,
  saleQty: undefined,
  channel: undefined,
  brand: undefined,
  value: undefined,
  name: undefined
})
const formRules = reactive({})
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
      formData.value = await InventoryDataApi.getInventoryData(id)
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
    const data = formData.value as unknown as InventoryDataVO
    if (formType.value === 'create') {
      await InventoryDataApi.createInventoryData(data)
      message.success(t('common.createSuccess'))
    } else {
      await InventoryDataApi.updateInventoryData(data)
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
    skuId: undefined,
    scanCode: undefined,
    goodId: undefined,
    qty: undefined,
    defectiveQty: undefined,
    warehouseName: undefined,
    type: undefined,
    warehouseId: undefined,
    warehouseCode: undefined,
    saleQty: undefined,
    channel: undefined,
    brand: undefined,
    value: undefined,
    name: undefined
  }
  formRef.value?.resetFields()
}
</script>
