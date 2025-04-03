<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="单据编号" prop="orderNo">
        <el-input v-model="formData.orderNo" placeholder="请输入单据编号" />
      </el-form-item>
      <el-form-item label="费用类型" prop="reason">
        <el-input v-model="formData.reason" placeholder="请输入费用类型" />
      </el-form-item>
      <el-form-item label="调整分销账户" prop="account">
        <el-input v-model="formData.account" placeholder="请输入调整分销账户" />
      </el-form-item>
      <el-form-item label="调整说明" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入调整说明" />
      </el-form-item>
      <el-form-item label="提交人" prop="submiter">
        <el-input v-model="formData.submiter" placeholder="请输入提交人" />
      </el-form-item>
      <el-form-item label="调整金额" prop="adjAmount">
        <el-input v-model="formData.adjAmount" placeholder="请输入调整金额" />
      </el-form-item>
      <el-form-item label="调整后账户余额" prop="afterAmount">
        <el-input v-model="formData.afterAmount" placeholder="请输入调整后账户余额" />
      </el-form-item>
      <el-form-item label="当前账户余额" prop="nowAmount">
        <el-input v-model="formData.nowAmount" placeholder="请输入当前账户余额" />
      </el-form-item>
      <el-form-item label="业务主体" prop="company">
        <el-input v-model="formData.company" placeholder="请输入业务主体" />
      </el-form-item>
      <el-form-item label="当前暂扣账户金额" prop="nowTempAmount">
        <el-input v-model="formData.nowTempAmount" placeholder="请输入当前暂扣账户金额" />
      </el-form-item>
      <el-form-item label="调整后暂扣账户金额" prop="afterTempAmount">
        <el-input v-model="formData.afterTempAmount" placeholder="请输入调整后暂扣账户金额" />
      </el-form-item>
<!--      <el-form-item label="调整类型" prop="type">-->
<!--        <el-select v-model="formData.type" placeholder="请选择调整类型">-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { AccountAdjustApi, AccountAdjustVO } from '@/api/fx/accountadjust'

/** 分销账户调整 表单 */
defineOptions({ name: 'AccountAdjustForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  orderNo: undefined,
  reason: undefined,
  account: undefined,
  remark: undefined,
  submiter: undefined,
  adjAmount: undefined,
  afterAmount: undefined,
  nowAmount: undefined,
  company: undefined,
  nowTempAmount: undefined,
  afterTempAmount: undefined,
  type: undefined,
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
      formData.value = await AccountAdjustApi.getAccountAdjust(id)
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
    const data = formData.value as unknown as AccountAdjustVO
    if (formType.value === 'create') {
      await AccountAdjustApi.createAccountAdjust(data)
      message.success(t('common.createSuccess'))
    } else {
      await AccountAdjustApi.updateAccountAdjust(data)
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
    orderNo: undefined,
    reason: undefined,
    account: undefined,
    remark: undefined,
    submiter: undefined,
    adjAmount: undefined,
    afterAmount: undefined,
    nowAmount: undefined,
    company: undefined,
    nowTempAmount: undefined,
    afterTempAmount: undefined,
    type: undefined,
  }
  formRef.value?.resetFields()
}
</script>
