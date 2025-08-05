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
        <el-select v-model="formData.reason" placeholder="请选择费用类型">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_FEE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="payType">
        <el-select v-model="formData.payType" placeholder="请选择支付方式">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_PAYMENT_METHOD)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付证明 " prop="payWarrant">
        <el-input v-model="formData.payWarrant" placeholder="请输入支付证明 " />
      </el-form-item>
      <el-form-item label="实际账户" prop="account">
        <el-input v-model="formData.account" placeholder="请输入实际账户" />
      </el-form-item>
      <el-form-item label="收款金额" prop="receive">
        <el-input v-model="formData.receive" placeholder="请输入收款金额" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="分销商" prop="customer">
        <el-input v-model="formData.customer" placeholder="请输入分销商" />
      </el-form-item>
      <el-form-item label="分销商名称" prop="customerName">
        <el-input v-model="formData.customerName" placeholder="请输入分销商名称" />
      </el-form-item>
      <el-form-item label="业务单据" prop="soId">
        <el-input v-model="formData.soId" placeholder="请输入业务单据" />
      </el-form-item>
      <el-form-item label="提交人" prop="submiter">
        <el-input v-model="formData.submiter" placeholder="请输入提交人" />
      </el-form-item>
      <el-form-item label="提交人姓名" prop="submiterName">
        <el-input v-model="formData.submiterName" placeholder="请输入提交人姓名" />
      </el-form-item>
      <el-form-item label="打款账户" prop="paymentAccount">
        <el-input v-model="formData.paymentAccount" placeholder="请输入打款账户" />
      </el-form-item>
      <el-form-item label="客户等级" prop="custLevel">
        <el-select v-model="formData.custLevel" placeholder="请选择客户等级">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="打款账户名称" prop="paymentAccountName">
        <el-input v-model="formData.paymentAccountName" placeholder="请输入打款账户名称" />
      </el-form-item>
      <el-form-item label="是否重复" prop="isRepeat">
        <el-select v-model="formData.isRepeat" placeholder="请选择是否重复">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务主体" prop="businessEntity">
        <el-select v-model="formData.businessEntity" placeholder="请选择业务主体">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="申请日期" prop="orderDate">
        <el-date-picker
          v-model="formData.orderDate"
          type="date"
          value-format="x"
          placeholder="选择申请日期"
        />
      </el-form-item>
      <el-form-item label="是否节假日" prop="isWeek">
        <el-select v-model="formData.isWeek" placeholder="请选择是否节假日">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { CaRcptAudApi, CaRcptAudVO } from '@/api/fx/carcptaud'

/** 客商账户收款审核 表单 */
defineOptions({ name: 'CaRcptAudForm' })

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
  payType: undefined,
  payWarrant: undefined,
  account: undefined,
  receive: undefined,
  remark: undefined,
  customer: undefined,
  customerName: undefined,
  soId: undefined,
  submiter: undefined,
  submiterName: undefined,
  paymentAccount: undefined,
  custLevel: undefined,
  paymentAccountName: undefined,
  isRepeat: undefined,
  businessEntity: undefined,
  orderDate: undefined,
  isWeek: undefined,
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
      formData.value = await CaRcptAudApi.getCaRcptAud(id)
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
    const data = formData.value as unknown as CaRcptAudVO
    if (formType.value === 'create') {
      await CaRcptAudApi.createCaRcptAud(data)
      message.success(t('common.createSuccess'))
    } else {
      await CaRcptAudApi.updateCaRcptAud(data)
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
    payType: undefined,
    payWarrant: undefined,
    account: undefined,
    receive: undefined,
    remark: undefined,
    customer: undefined,
    customerName: undefined,
    soId: undefined,
    submiter: undefined,
    submiterName: undefined,
    paymentAccount: undefined,
    custLevel: undefined,
    paymentAccountName: undefined,
    isRepeat: undefined,
    businessEntity: undefined,
    orderDate: undefined,
    isWeek: undefined,
  }
  formRef.value?.resetFields()
}
</script>