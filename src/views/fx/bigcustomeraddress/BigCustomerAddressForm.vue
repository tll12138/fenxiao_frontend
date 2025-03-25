<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="分销商" prop="customerId">
        <el-input v-model="formData.customerId" placeholder="请输入分销商" />
      </el-form-item>
      <el-form-item label="省" prop="province">
        <el-input v-model="formData.province" placeholder="请输入省" />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input v-model="formData.city" placeholder="请输入市" />
      </el-form-item>
      <el-form-item label="区" prop="district">
        <el-input v-model="formData.district" placeholder="请输入区" />
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="联系人" prop="person">
        <el-input v-model="formData.person" placeholder="请输入联系人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="contact">
        <el-input v-model="formData.contact" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="是否可用" prop="isActive">
        <el-select v-model="formData.isActive" placeholder="请选择是否可用">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="审批状态" prop="status">-->
<!--        <el-radio-group v-model="formData.status">-->
<!--          <el-radio-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.value"-->
<!--          >-->
<!--            {{ dict.label }}-->
<!--          </el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="所属品牌" prop="brand">
        <el-select v-model="formData.brand" placeholder="请选择所属品牌">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="使用次数" prop="count">
        <el-input v-model="formData.count" placeholder="请输入使用次数" />
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
import { BigCustomerAddressApi, BigCustomerAddressVO } from '@/api/fx/bigcustomeraddress'

/** 分销大客户地址 表单 */
defineOptions({ name: 'BigCustomerAddressForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  customerId: undefined,
  province: undefined,
  city: undefined,
  district: undefined,
  address: undefined,
  person: undefined,
  contact: undefined,
  isActive: undefined,
  status: undefined,
  remark: undefined,
  brand: undefined,
  count: undefined,
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
      formData.value = await BigCustomerAddressApi.getBigCustomerAddress(id)
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
    const data = formData.value as unknown as BigCustomerAddressVO
    if (formType.value === 'create') {
      await BigCustomerAddressApi.createBigCustomerAddress(data)
      message.success(t('common.createSuccess'))
    } else {
      await BigCustomerAddressApi.updateBigCustomerAddress(data)
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
    province: undefined,
    city: undefined,
    district: undefined,
    address: undefined,
    person: undefined,
    contact: undefined,
    isActive: undefined,
    status: undefined,
    remark: undefined,
    brand: undefined,
    count: undefined,
  }
  formRef.value?.resetFields()
}
</script>
