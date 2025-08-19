<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" class="bill-apply-dialog">
    <!-- 表单主体 -->
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
      class="bill-apply-form"
    >
      <!-- 表单分组：基础信息 -->
      <div class="form-section">
        <h3 class="section-title">基础信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请人" prop="applyMan">
              <el-select
                v-model="formData.applyMan"
                multiple
                placeholder="请选择申请人"
                :disabled="true"
                @change="handleApplyManChange"
              >
                <el-option
                  v-for="item in userOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售单" prop="saleOrder">
              <div class="multi-select-container">
                <el-button type="primary" @click="openSaleTable" :disabled="isDetail"
                  >选择</el-button
                >

                <!-- 显示已选择的销售单 -->
                <div class="tags-container">
                  <el-tag
                    v-for="order in formData.saleOrder"
                    :key="order.id"
                    closable
                    @close="removeSaleOrder(order.id)"
                    class="mr-2 mt-2"
                  >
                    {{ order.orderId }}
                  </el-tag>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" prop="applyDate" v-if="isDetail">
              <el-date-picker
                v-model="formData.applyDate"
                type="date"
                value-format="x"
                placeholder="选择申请日期"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期" prop="billDate" v-if="isDetail">
              <el-date-picker
                v-model="formData.billDate"
                type="date"
                value-format="x"
                placeholder="选择开票日期"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 表单分组：发票信息 -->
      <div class="form-section">
        <h3 class="section-title">发票信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发票抬头" prop="billHead">
              <el-select
                v-model="formData.billHead"
                placeholder="请选择发票抬头"
                :disabled="isDetail"
              >
                <el-option
                  v-for="dict in getStrDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="billType">
              <el-select
                v-model="formData.billType"
                placeholder="请选择发票类型"
                :disabled="isDetail"
              >
                <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.FX_BILL_TYPE)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额合计" prop="amount">
              <el-input
                v-model="formData.amount"
                placeholder="请输入金额合计"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="开票流程"
              prop="rid"
              v-if="formType == 'detail'"
              :disabled="isDetail"
            >
              <el-input v-model="formData.rid" placeholder="请输入开票流程" :disabled="isDetail" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 表单分组：购方信息 -->
      <div class="form-section">
        <h3 class="section-title">购方信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购方名称" prop="purchaserName">
              <el-input
                v-model="formData.purchaserName"
                placeholder="请输入购方名称"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxNo">
              <el-input
                v-model="formData.taxNo"
                placeholder="请输入纳税人识别号"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址及电话" prop="address">
              <el-input
                v-model="formData.address"
                placeholder="请输入地址及电话"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开户行及账号" prop="bankNo">
              <el-input
                v-model="formData.bankNo"
                placeholder="请输入开户行及账号"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发票邮箱" prop="email">
              <el-input
                v-model="formData.email"
                placeholder="请输入发票邮箱"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发票附件" prop="document" :disabled="isDetail" v-if="isDetail">
              <!-- 限制最大5MB -->
              <UploadFile
                v-model="formData.document"
                width="200px"
                height="200px"
                :show-delete="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="formData.remark"
                placeholder="请输入备注"
                type="textarea"
                rows="3"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false" class="cancel-btn">取 消</el-button>
      <el-button
        @click="submitForm"
        type="primary"
        :disabled="formLoading || isDetail"
        class="confirm-btn"
        v-if="!isDetail"
        >保 存</el-button
      >
    </template>
  </Dialog>
  <SaleTable
    ref="saleTableRef"
    :selected-ids="formData.saleOrder.map((item) => item.id)"
    @confirm="handleSaleSelectConfirm"
  />
</template>

<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions, getStrDictOptions } from '@/utils/dict'
// 导入UploadImg组件
import { UploadFile } from '@/components/UploadFile'
import { BillApplyApi, BillApplyVO } from '@/api/fx/billapply'
import * as UserApi from '@/api/system/user'
import { useUserStore } from '@/store/modules/user'
import { formatToDate } from '@/utils/dateUtil'
import SaleTable from '@/views/fx/billapply/components/SaleTable.vue'
import {OrdersInfoApi, OrdersInfoVO} from '@/api/fx/ordersinfo'

defineOptions({ name: 'BillApplyForm' })

const { t } = useI18n()
const message = useMessage()

const dialogVisible = ref(false)
const dialogTitle = ref('')
const formLoading = ref(false)
const formType = ref('')
const fileList = ref([])
const userOptions = ref([])
const userId = useUserStore().getUser.id
const initialApplyMan = [userId]

/** 表单数据 */
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
  isSend: undefined
})

/** 表单校验规则 */
const formRules = reactive({
  applyMan: [{ required: true, message: '申请人不能为空', trigger: 'blur' }],
  isOver: [{ required: true, message: '是否完成不能为空', trigger: 'change' }],
  // applyDate: [{ required: true, message: '申请日期不能为空', trigger: 'change' }],
  billType: [{ required: true, message: '发票类型不能为空', trigger: 'change' }],
  email: [
    { required: true, message: '发票邮箱不能为空', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱格式',
      trigger: ['blur', 'change']
    }
  ],
  taxNo: [
    { required: true, message: '纳税人识别号不能为空', trigger: 'blur' },
    {
      pattern: /^[A-Z0-9]{15,20}$/,
      message: '纳税人识别号应为15-20位字母或数字',
      trigger: 'blur'
    }
  ],
  bankNo: [
    { required: true, message: '开户行及账号不能为空', trigger: 'blur' },
    {
      pattern: /^.{5,100}$/,
      message: '开户行及账号长度应在5-100之间',
      trigger: 'blur'
    }
  ],
  address: [
    { required: true, message: '地址及电话不能为空', trigger: 'blur' },
    {
      pattern: /^.{5,200}$/,
      message: '地址及电话长度应在5-200之间',
      trigger: 'blur'
    }
  ],
  amount: [
    { required: true, message: '金额合计不能为空', trigger: 'blur' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: '请输入正确的金额格式（最多两位小数）',
      trigger: 'blur'
    }
  ],
  saleOrder: [
    {
      required: true,
      message: '销售单不能为空',
      trigger: 'change'
    }
  ]
  // document: [{ required: true, message: '证明附件不能为空', trigger: 'change' }]
})

/** 表单引用 */
const formRef = ref()

// 在组件初始化时提前加载用户列表，而非onMounted
const initUserOptions = async () => {
  try {
    userOptions.value = await UserApi.getSimpleUserList()
  } catch (error) {
    message.error('获取用户列表失败')
    console.error(error)
  }
}

// 优先加载用户列表
initUserOptions()
/** 初始化获取用户列表 */
onMounted(async () => {})

/**
 * 处理文件上传成功
 */
const handleFileSuccess = (response, file, fileList) => {
  if (response.code === 0) {
    formData.value.document = response.data
    message.success('文件上传成功')
  } else {
    message.error('文件上传失败：' + response.msg)
  }
}

const handleApplyManChange = (selectedIds) => {
  // 如果是单选场景取第一个选中的ID
  const firstId = Array.isArray(selectedIds) ? selectedIds[0] : selectedIds
  if (!firstId) {
    formData.value.purchaserName = ''
    return
  }

  // 从用户选项中找到对应的nickname
  const selectedUser = userOptions.value.find((item) => item.id === firstId)
  if (selectedUser) {
    formData.value.purchaserName = selectedUser.nickname
  }
}

// 销售单选择相关
const saleTableRef = ref<InstanceType<typeof SaleTable>>()
const saleOrderDisplay = ref('') // 用于显示的文本

// 打开销售单选择表格
const openSaleTable = () => {
  saleTableRef.value?.open()
}

// 处理选择确认
const handleSaleSelectConfirm = (selected: OrdersInfoVO[]) => {
  // 合并已选择项，避免重复
  formData.value.saleOrder = selected;
}

// 移除已选择的销售单
const removeSaleOrder = (id: number) => {
  formData.value.saleOrder = formData.value.saleOrder.filter((item) => item.id !== id)
}

// 判断是否为详情模式
const isDetail = computed(() => formType.value === 'detail')

/**
 * 打开表单弹窗
 * @param type 表单类型（create/update/detail）
 * @param id 数据ID（修改时需要）
 */

const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm() // 先重置

  if (type === 'create') {
    formData.value.applyMan = [userId] // 新建时默认数组
    // 新增时同步设置购方名称
    const defaultUser = userOptions.value.find((item) => item.id === userId)
    if (defaultUser) {
      formData.value.purchaserName = defaultUser.nickname
    }
    // formData.value.applyDate = Date.now() // 新建时默认当前时间
    console.log('默认绑定的审核人数据：', formData.value.applyMan) // 确认前端绑定正确
  }

  if (id) {
    formLoading.value = true
    try {
      const res = await BillApplyApi.getBillApply(id)

      // 处理 document 字符串转为数组
      let documentList: string[] = []
      if (res.document) {
        // 1. 去除前后中括号 2. 按逗号分割 3. 去除每个元素的空格
        documentList = res.document
          .replace(/^\[|\]$/g, '') // 移除前后的中括号
          .split(',') // 按逗号分割
          .map((item) => item.trim()) // 去除每个URL的前后空格
          .filter((item) => item) // 过滤空字符串
      }

      let saleOrderArr: OrdersInfoVO[] = []
      if (res.saleOrder) {
        // 若接口返回的是字符串（如 "1,2,3"），需要转换为数组对象（根据实际接口结构调整）
        // 这里假设需要将 id 字符串拆分为数组，实际应根据后端返回格式处理
        if (typeof res.saleOrder === 'string') {
          const ids = res.saleOrder.split(',').map(Number).filter(Boolean)
          if (ids.length > 0) {
            // 调用接口批量查询销售单详情（假设接口支持批量查询）
            saleOrderArr = await OrdersInfoApi.getOrdersInfoByIds(ids) // 此时 orders 应包含 orderId
          }
        } else if (Array.isArray(res.saleOrder)) {
          // 若后端返回的是数组对象，直接使用
          saleOrderArr = res.saleOrder
        }
      }

      formData.value = {
        ...res,
        applyMan: Array.isArray(res.applyMan) ? res.applyMan : res.applyMan ? [res.applyMan] : [],
        document: documentList, // 赋值为处理后的数组
        saleOrder: saleOrderArr // 确保是数组
      }

      // 初始化文件列表（用于展示已上传的文件）
      if (formData.value.document.length > 0) {
        fileList.value = formData.value.document.map((url) => ({
          name: '已上传文件',
          url: url
        }))
      }
    } finally {
      formLoading.value = false
    }
  }
}

/** 暴露open方法供外部调用 */
defineExpose({ open })

/** 定义成功回调事件 */
const emit = defineEmits(['success'])

/** 提交表单 */
const submitForm = async () => {
  console.log('开始提交', formData.value)
  // 校验主表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = { ...formData.value } as unknown as BillApplyVO
    data.applyMan = data.applyMan?.[0] || undefined
    data.document = data.document?.toString() || ''
    // if (data.applyDate) {
    //   data.applyDate = formatToDate(data.applyDate)
    // }
    if (data.billDate) {
      data.billDate = formatToDate(data.billDate)
    }
    data.saleOrder = formData.value.saleOrder.map((item) => item.id).join(',')
    console.log('提交数据', data)
    if (formType.value === 'create') {
      await BillApplyApi.createBillApply(data)
      message.success(t('common.createSuccess'))
    } else if (formType.value === 'update') {
      await BillApplyApi.updateBillApply(data)
      message.success(t('common.updateSuccess'))
    }
    // 触发成功事件
    emit('success')
    // 关闭弹窗
    dialogVisible.value = false
  } finally {
    formLoading.value = false
  }
}

/** 重置表单数据 */
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
    isSend: undefined
  }
  fileList.value = []
  formRef.value?.resetFields()
}
</script>

<style scoped>
/* 弹窗样式优化 */
.bill-apply-dialog {
  --el-dialog-width: 900px;
  --el-dialog-padding: 20px;
}

/* 表单样式优化 */
.bill-apply-form {
  padding: 10px 0;
}

/* 表单分组样式 */
.form-section {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #eee;
}

.section-title {
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  font-size: 16px;
  color: #1f2329;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  margin-right: 8px;
  border-radius: 2px;
}

.el-form-item {
  margin-bottom: 18px;
}

.el-input,
.el-select,
.el-date-picker {
  width: 100%;
}

.el-textarea__inner {
  resize: vertical;
}

/* 按钮样式优化 */
:deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #e5e7eb;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.cancel-btn {
  margin-right: 10px;
}

.confirm-btn {
  margin-left: 0;
}

/* 上传组件样式 */
:deep(.el-upload__tip) {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .bill-apply-dialog {
    --el-dialog-width: 95%;
  }

  .form-section {
    padding: 10px;
    margin-bottom: 15px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .el-form-item {
    margin-bottom: 12px;
  }

  .el-col {
    --el-col-span: 24 !important;
  }
}
</style>
