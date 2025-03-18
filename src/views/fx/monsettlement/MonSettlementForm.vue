<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="年月" prop="month">
        <el-input v-model="formData.month" placeholder="请输入年月" />
      </el-form-item>
      <el-form-item label="月结总余额" prop="totalAmount">
        <el-input v-model="formData.totalAmount" placeholder="请输入月结总余额" />
      </el-form-item>
      <el-form-item label="暂扣金额" prop="withheldAmount">
        <el-input v-model="formData.withheldAmount" placeholder="请输入暂扣金额" />
      </el-form-item>
      <el-form-item label="可用余额" prop="availableAmount">
        <el-input v-model="formData.availableAmount" placeholder="请输入可用余额" />
      </el-form-item>
      <el-form-item label="账户" prop="account">
        <el-input v-model="formData.account" placeholder="请输入账户" />
      </el-form-item>
      <el-form-item label="业务主体" prop="company">
        <el-input v-model="formData.company" placeholder="请输入业务主体" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { MonSettlementApi, MonSettlementVO } from '@/api/fx/monsettlement'

/** 分销账户月结 表单 */
defineOptions({ name: 'MonSettlementForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  month: undefined,
  totalAmount: undefined,
  withheldAmount: undefined,
  availableAmount: undefined,
  account: undefined,
  company: undefined,
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
      formData.value = await MonSettlementApi.getMonSettlement(id)
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
    const data = formData.value as unknown as MonSettlementVO
    if (formType.value === 'create') {
      await MonSettlementApi.createMonSettlement(data)
      message.success(t('common.createSuccess'))
    } else {
      await MonSettlementApi.updateMonSettlement(data)
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
    month: undefined,
    totalAmount: undefined,
    withheldAmount: undefined,
    availableAmount: undefined,
    account: undefined,
    company: undefined,
  }
  formRef.value?.resetFields()
}
</script>