<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="客商" prop="customerId">
        <el-input v-model="formData.customerId" placeholder="请输入客商" />
      </el-form-item>
      <el-form-item label="购方名称" prop="company">
        <el-input v-model="formData.company" placeholder="请输入购方名称" />
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="tax">
        <el-input v-model="formData.tax" placeholder="请输入纳税人识别号" />
      </el-form-item>
      <el-form-item label="开户行及账号" prop="bank">
        <el-input v-model="formData.bank" placeholder="请输入开户行及账号" />
      </el-form-item>
      <el-form-item label="地址及电话" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址及电话" />
      </el-form-item>
      <el-form-item label="是否生效" prop="isActive">
        <el-select v-model="formData.isActive" placeholder="请选择是否生效">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="发送邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入发送邮箱" />
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
import { BillingInfoApi, BillingInfoVO } from '@/api/fx/billinginfo'

/** 开票信息 表单 */
defineOptions({ name: 'BillingInfoForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  customerId: undefined,
  company: undefined,
  tax: undefined,
  bank: undefined,
  address: undefined,
  isActive: undefined,
  remark: undefined,
  email: undefined,
})
const formRules = reactive({
  customerId: [{ required: true, message: '客商不能为空', trigger: 'blur' }],
  isActive: [{ required: true, message: '是否生效不能为空', trigger: 'change' }],
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
      formData.value = await BillingInfoApi.getBillingInfo(id)
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
    const data = formData.value as unknown as BillingInfoVO
    if (formType.value === 'create') {
      await BillingInfoApi.createBillingInfo(data)
      message.success(t('common.createSuccess'))
    } else {
      await BillingInfoApi.updateBillingInfo(data)
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
    customerId: undefined,
    company: undefined,
    tax: undefined,
    bank: undefined,
    address: undefined,
    isActive: undefined,
    remark: undefined,
    email: undefined,
  }
  formRef.value?.resetFields()
}
</script>