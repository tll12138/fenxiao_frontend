<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
<!--      <el-form-item label="申请人" prop="applyMan">-->
<!--        <el-select v-model="formData.applyMan" placeholder="请选择申请人">-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="申请日期" prop="applyDate">
        <el-date-picker
          v-model="formData.applyDate"
          type="date"
          value-format="x"
          placeholder="选择申请日期"
        />
      </el-form-item>
      <el-form-item label="开票日期" prop="billDate">
        <el-date-picker
          v-model="formData.billDate"
          type="date"
          value-format="x"
          placeholder="选择开票日期"
        />
      </el-form-item>
      <el-form-item label="地址及电话" prop="address">
        <el-input v-model="formData.address" placeholder="请输入地址及电话" />
      </el-form-item>
      <el-form-item label="开户行及账号" prop="bankNo">
        <el-input v-model="formData.bankNo" placeholder="请输入开户行及账号" />
      </el-form-item>
      <el-form-item label="金额合计" prop="amount">
        <el-input v-model="formData.amount" placeholder="请输入金额合计" />
      </el-form-item>
<!--      <el-form-item label="操作员" prop="maker">-->
<!--        <el-radio-group v-model="formData.maker">-->
<!--          <el-radio-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
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
      <el-form-item label="发票类型" prop="billType">
        <el-select v-model="formData.billType" placeholder="请选择发票类型">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.FX_BILL_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="金额合计(大写)" prop="totalAmount">
        <el-input v-model="formData.totalAmount" placeholder="请输入金额合计(大写)" />
      </el-form-item>
<!--      <el-form-item label="销售单" prop="saleOrder">-->
<!--        <el-checkbox-group v-model="formData.saleOrder">-->
<!--          <el-checkbox-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.value"-->
<!--          >-->
<!--            {{ dict.label }}-->
<!--          </el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
      <el-form-item label="发票抬头" prop="billHead">
        <el-select v-model="formData.billHead" placeholder="请选择发票抬头">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发票附件" prop="document">
        <el-input v-model="formData.document" placeholder="请输入发票附件" />
      </el-form-item>
      <el-form-item label="财务说明" prop="financialStatement">
        <el-input v-model="formData.financialStatement" placeholder="请输入财务说明" />
      </el-form-item>
      <el-form-item label="购方名称" prop="purchaserName">
        <el-input v-model="formData.purchaserName" placeholder="请输入购方名称" />
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="taxNo">
        <el-input v-model="formData.taxNo" placeholder="请输入纳税人识别号" />
      </el-form-item>
<!--      <el-form-item label="客户名称" prop="cusName">-->
<!--        <el-radio-group v-model="formData.cusName">-->
<!--          <el-radio-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.value"-->
<!--          >-->
<!--            {{ dict.label }}-->
<!--          </el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开票信息" prop="billInfo">-->
<!--        <el-select v-model="formData.billInfo" placeholder="请选择开票信息">-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="开票流程" prop="rid">
        <el-input v-model="formData.rid" placeholder="请输入开票流程" />
      </el-form-item>
      <el-form-item label="是否完成" prop="isOver">
        <el-select v-model="formData.isOver" placeholder="请选择是否完成">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否芽肌" prop="isYj">
        <el-select v-model="formData.isYj" placeholder="请选择是否芽肌">
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发票邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入发票邮箱" />
      </el-form-item>
<!--      <el-form-item label="关联邮箱" prop="emailId">-->
<!--        <el-radio-group v-model="formData.emailId">-->
<!--          <el-radio-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.value"-->
<!--          >-->
<!--            {{ dict.label }}-->
<!--          </el-radio>-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <el-form-item label="发票发送状态" prop="isSend">
        <el-input v-model="formData.isSend" placeholder="请输入发票发送状态" />
      </el-form-item>
    </el-form>
    <!-- 子表的表单 -->
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="发票申请详情" name="billApplyDetail">
        <BillApplyDetailForm ref="billApplyDetailFormRef" :main-id="formData.id" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import {getStrDictOptions, DICT_TYPE, getDictOptions} from '@/utils/dict'
import { BillApplyApi, BillApplyVO } from '@/api/fx/billapply'
import BillApplyDetailForm from './components/BillApplyDetailForm.vue'

/** 发票申请 表单 */
defineOptions({ name: 'BillApplyForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  applyMan: undefined,
  applyDate: undefined,
  billDate: undefined,
  address: undefined,
  bankNo: undefined,
  amount: undefined,
  maker: undefined,
  remark: undefined,
  billType: undefined,
  totalAmount: undefined,
  saleOrder: [],
  billHead: undefined,
  document: undefined,
  financialStatement: undefined,
  purchaserName: undefined,
  taxNo: undefined,
  cusName: undefined,
  billInfo: undefined,
  rid: undefined,
  isOver: undefined,
  isYj: undefined,
  email: undefined,
  emailId: undefined,
  isSend: undefined,
})
const formRules = reactive({
  isOver: [{ required: true, message: '是否完成不能为空', trigger: 'change' }],
})
const formRef = ref() // 表单 Ref

/** 子表的表单 */
const subTabsName = ref('billApplyDetail')
const billApplyDetailFormRef = ref()

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
      formData.value = await BillApplyApi.getBillApply(id)
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
  // 校验子表单
  try {
    await billApplyDetailFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'billApplyDetail'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as BillApplyVO
    // 拼接子表的数据
    data.billApplyDetails = billApplyDetailFormRef.value.getData()
    if (formType.value === 'create') {
      await BillApplyApi.createBillApply(data)
      message.success(t('common.createSuccess'))
    } else {
      await BillApplyApi.updateBillApply(data)
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
    applyMan: undefined,
    applyDate: undefined,
    billDate: undefined,
    address: undefined,
    bankNo: undefined,
    amount: undefined,
    maker: undefined,
    remark: undefined,
    billType: undefined,
    totalAmount: undefined,
    saleOrder: [],
    billHead: undefined,
    document: undefined,
    financialStatement: undefined,
    purchaserName: undefined,
    taxNo: undefined,
    cusName: undefined,
    billInfo: undefined,
    rid: undefined,
    isOver: undefined,
    isYj: undefined,
    email: undefined,
    emailId: undefined,
    isSend: undefined,
  }
  formRef.value?.resetFields()
}
</script>
