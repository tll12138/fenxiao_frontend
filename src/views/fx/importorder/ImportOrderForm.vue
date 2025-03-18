<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="商品数量" prop="productQuantity">
        <el-input v-model="formData.productQuantity" placeholder="请输入商品数量" />
      </el-form-item>
      <el-form-item label="省份" prop="province">
        <el-input v-model="formData.province" placeholder="请输入省份" />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="formData.city" placeholder="请输入城市" />
      </el-form-item>
      <el-form-item label="订单编号" prop="soId">
        <el-input v-model="formData.soId" placeholder="请输入订单编号" />
      </el-form-item>
      <el-form-item label="商品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入商品编码" />
      </el-form-item>
      <el-form-item label="区县" prop="district">
        <el-input v-model="formData.district" placeholder="请输入区县" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入详细地址" />
      </el-form-item>
      <el-form-item label="收货人" prop="contact">
        <el-input v-model="formData.contact" placeholder="请输入收货人" />
      </el-form-item>
      <el-form-item label="收货电话" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入收货电话" />
      </el-form-item>
      <el-form-item label="是否发货" prop="isShipped">
        <el-select v-model="formData.isShipped" placeholder="请选择是否发货">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否生成销售单" prop="isSalesOrderGenerated">
        <el-select v-model="formData.isSalesOrderGenerated" placeholder="请选择是否生成销售单">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客商" prop="customerid">
        <el-input v-model="formData.customerid" placeholder="请输入客商" />
      </el-form-item>
      <el-form-item label="发货仓" prop="warehouseid">
        <el-input v-model="formData.warehouseid" placeholder="请输入发货仓" />
      </el-form-item>
      <el-form-item label="销售单号" prop="saleno">
        <el-input v-model="formData.saleno" placeholder="请输入销售单号" />
      </el-form-item>
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input v-model="formData.expressCompany" placeholder="请输入快递公司" />
      </el-form-item>
      <el-form-item label="快递单号" prop="trackingNumber">
        <el-input v-model="formData.trackingNumber" placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="业务归属" prop="businessAffiliation">
        <el-input v-model="formData.businessAffiliation" placeholder="请输入业务归属" />
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input v-model="formData.price" placeholder="请输入单价" />
      </el-form-item>
      <el-form-item label="无痕发货" prop="isTraceless">
        <el-input v-model="formData.isTraceless" placeholder="请输入无痕发货" />
      </el-form-item>
      <el-form-item label="收款经销商" prop="payingDistributorId">
        <el-input v-model="formData.payingDistributorId" placeholder="请输入收款经销商" />
      </el-form-item>
      <el-form-item label="快递公司ID" prop="expressCompanyId">
        <el-input v-model="formData.expressCompanyId" placeholder="请输入快递公司ID" />
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
import { ImportOrderApi, ImportOrderVO } from '@/api/fx/importorder'

/** 客商代发单 表单 */
defineOptions({ name: 'ImportOrderForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  productQuantity: undefined,
  province: undefined,
  city: undefined,
  soId: undefined,
  skuId: undefined,
  district: undefined,
  address: undefined,
  contact: undefined,
  mobile: undefined,
  isShipped: undefined,
  isSalesOrderGenerated: undefined,
  customerid: undefined,
  warehouseid: undefined,
  saleno: undefined,
  expressCompany: undefined,
  trackingNumber: undefined,
  remark: undefined,
  businessAffiliation: undefined,
  price: undefined,
  isTraceless: undefined,
  payingDistributorId: undefined,
  expressCompanyId: undefined,
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
      formData.value = await ImportOrderApi.getImportOrder(id)
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
    const data = formData.value as unknown as ImportOrderVO
    if (formType.value === 'create') {
      await ImportOrderApi.createImportOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await ImportOrderApi.updateImportOrder(data)
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
    productQuantity: undefined,
    province: undefined,
    city: undefined,
    soId: undefined,
    skuId: undefined,
    district: undefined,
    address: undefined,
    contact: undefined,
    mobile: undefined,
    isShipped: undefined,
    isSalesOrderGenerated: undefined,
    customerid: undefined,
    warehouseid: undefined,
    saleno: undefined,
    expressCompany: undefined,
    trackingNumber: undefined,
    remark: undefined,
    businessAffiliation: undefined,
    price: undefined,
    isTraceless: undefined,
    payingDistributorId: undefined,
    expressCompanyId: undefined,
  }
  formRef.value?.resetFields()
}
</script>