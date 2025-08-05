<template>
  <div>
    <div class="flex justify-center align-center">
      <ContentWrap class="w-66%">
        <div class="header-content">
          <div class="title-section">
            <el-icon class="title-icon">
              <Document />
            </el-icon>
            <span class="page-title">账户收款单</span>
          </div>
          <img src="@/assets/imgs/pqsy.png" class="logo-image" />
        </div>

        <el-form
          ref="formRef"
          class="bg-white px-10 py-5"
          :model="formData"
          :rules="formRules"
          label-width="100px"
          size="default"
          v-loading="formLoading"
        >
          <!-- 收款信息-->
          <div class="section-header">
            <el-icon><Paperclip /></el-icon>
            <span>收款信息</span>
          </div>

          <ElRow>
            <ElCol :span="7">
              <el-form-item label="单据编号" prop="orderNo">
                <el-input
                  v-model="formData.orderNo"
                  placeholder=""
                  filterable
                  disabled
                />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
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
            </ElCol>
            <ElCol :offset="1" :span="7">
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
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="客户" prop="customer">
                <ConsigneeSelect
                  ref="consigneeSelectRef"
                  v-model="formData.customer"
                  @update:modelValue="handleChange"
                  class="search-select select-form w-188px!"
                />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="收款金额" prop="receive">
                <el-input v-model="formData.receive" placeholder="请输入收款金额" />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="客户等级" prop="custLevel">
                <el-select v-model="formData.custLevel" placeholder="" disabled>
                  <el-option
                    v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="打款账户" prop="paymentAccount"  >
                <FromAccountSelect
                  ref="fromAccountSelectRef"
                  v-model="formData.paymentAccount"
                  @update:modelValue="handleFromAccountChange"
                  class="search-select select-form w-188px!"
                  :disabled="!formData.customer"
                />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="打款账户名称" prop="paymentAccountName">
                <el-input v-model="formData.paymentAccountName" placeholder="请输入打款账户名称"  :disabled="!formData.customer"  />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="业务主体" prop="businessEntity">
                <el-select
                  v-model="formData.businessEntity"
                  placeholder="请选择业务主体"
                  :disabled="!formData.customer"
                >
                  <el-option
                    v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="实际账户" prop="accountName">
                <el-input v-model="formData.accountName" placeholder="" disabled />
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="申请日期" prop="orderDate">
                <el-date-picker
                  v-model="formData.orderDate"
                  type="date"
                  value-format="x"
                  placeholder="选择申请日期"
                  disabled
                />
              </el-form-item>
            </ElCol>
            <ElCol :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" placeholder="请输入备注" />
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="支付证明 " prop="payWarrant">
                <el-upload
                  ref="uploadRef"
                  v-model:file-list="fileList"
                  :action="importUrl"
                  :auto-upload="true"
                  :disabled="formLoading"
                  :headers="uploadHeaders"
                  :limit="1"
                  :on-error="submitFormError"
                  :on-exceed="handleExceed"
                  :on-success="submitFormSuccess"
                  drag
                >
                  <Icon icon="ep:upload" />
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
            </ElCol>
          </ElRow>

          <div class="section-header">
            <el-icon><MapLocation /></el-icon>
            <span>历史收据</span>
          </div>
          <!-- 历史收据查询表单 -->
          <!-- 历史收据查询表单 -->
          <el-form class="history-receipt-query-form" :model="queryParams" ref="queryFormRef" label-width="100px">
            <el-row :gutter="16">
              <!-- 单据编号 -->
              <el-col :span="6">
                <el-form-item label="单据编号">
                  <el-input
                    v-model="queryParams.orderNo"
                    @keyup.enter="searchReceipt"
                    placeholder="单据编号"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>

              <!-- 打款账户名称 -->
              <el-col :span="6">
                <el-form-item label="打款账户名称">
                  <el-input
                    v-model="queryParams.payoutAccountName"
                    @keyup.enter="searchReceipt"
                    placeholder="打款账户名称"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>

              <!-- 收款金额 -->
              <el-col :span="6">
                <el-form-item label="收款金额">
                  <el-input
                    v-model="queryParams.receive"
                    @keyup.enter="searchReceipt"
                    placeholder="收款金额"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>

              <!-- 客户 -->
              <el-col :span="6">
                <el-form-item label="客户" prop="customer">
                  <ConsigneeSelect
                    ref="consigneeSelectHisRef"
                    v-model="queryParams.customer"
                    @update:modelValue="handleHisChange"
                    class="w-100%"
                  />
                </el-form-item>
              </el-col>

              <!-- 业务主体 -->
              <el-col :span="6">
                <el-form-item label="业务主体">
                  <el-select
                    v-model="queryParams.mainId"
                    @keyup.enter="searchReceipt"
                    placeholder="业务主体"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <!-- 日期范围 -->
              <el-col :span="8">
                <el-form-item label="日期范围">
                  <el-date-picker
                    v-model="queryParams.orderDate"
                    @keyup.enter="searchReceipt"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="x"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>

              <!-- 查询/重置按钮 -->
              <el-col :span="20">
                <el-form-item>
                  <el-button type="primary" @click="searchReceipt">查询</el-button>
                  <el-button @click="resetSearch">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <!-- 历史收据数据表格 -->
          <el-table
            :data="receiptList"
            border
            style="width: 100%; margin: 10px 0"
            v-loading="tableLoading"
            element-loading-text="数据加载中，请稍后..."
            empty-text="未查询到相关历史收据数据"
          >
            <el-table-column label="单据编号" align="center" prop="orderNo" width="140" />
            <el-table-column label="费用类型" align="center" prop="reason">
              <template #default="scope">
                <dict-tag :type="DICT_TYPE.FX_FEE_TYPE" :value="scope.row.reason" />
              </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center" prop="payType">
              <template #default="scope">
                <dict-tag :type="DICT_TYPE.ACCOUNT_TYPE" :value="scope.row.payType" />
              </template>
            </el-table-column>
            <el-table-column label="支付证明" align="center" prop="payProof" width="auto" />
            <el-table-column label="实际账户" align="center" prop="accountName" />
            <el-table-column label="收款金额" align="center" prop="receive" />
            <el-table-column label="备注" align="center" prop="remark" min-width="140" />
            <el-table-column label="分销商" align="center" prop="customerName">
              <template #default="scope">
                <el-link type="primary" @click="handleViewDetail(scope.row.customer)">
                  {{ scope.row.customerName }}
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="业务单据" align="center" prop="soId" />
            <el-table-column label="提交人" align="center" prop="submiter" />
            <el-table-column label="打款账户名称" align="center" prop="payoutAccountName" />
            <el-table-column label="业务主体" align="center" prop="mainId">
              <template #default="scope">
                <dict-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.mainId" />
              </template>
            </el-table-column>
            <el-table-column
              label="申请日期"
              align="center"
              prop="orderDate"
              :formatter="dateFormatter2"
              width="180px"
            />
          </el-table>

          <!--分页组件 -->
          <Pagination
            :total="total"
            v-model:page="queryParams.pageNo"
            v-model:limit="queryParams.pageSize"
            @pagination="searchReceipt"
          />
        </el-form>
      </ContentWrap>
    </div>

    <!-- 右侧固定按钮 -->
    <div class="side-actions">
      <el-card class="action-card" shadow="hover">
        <div class="action-buttons">
          <el-tooltip content="返回列表" placement="left" :show-after="500">
            <el-button @click="push({ name: 'CustomerAccount' })" class="action-button" text>
              <el-icon><Back /></el-icon>
              <span>返回</span> </el-button
            >reason
          </el-tooltip>

          <div class="divider"></div>

          <el-tooltip content="提交审核" placement="left" :show-after="500">
            <el-button
              type="success"
              @click="submitForm('create')"
              class="action-button"
              text
              :loading="formLoading"
            >
              <el-icon><Check /></el-icon>
              <span>提交</span>
            </el-button>
          </el-tooltip>
        </div>
      </el-card>
    </div>
  </div>
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  <ConsigneeTable ref="consigneeHisRef" @click-row="handleClickConsigneeHisRow" />
  <CustomerDetailForm ref="detailRef" v-model:visible="detailVisible" :customer="currentCustomer" />
  <FromAccountTable ref="fromAccountRef" @click-row="handleClickFromAccountRow" />
</template>
<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import { useTagsViewStore } from '@/store/modules/tagsView'
import {
  Document,
  Check,
  Back,
  Paperclip,
  MapLocation
} from '@element-plus/icons-vue'
import {CaRcptAudApi, CaRcptAudVO} from '@/api/fx/carcptaud'
import {dateFormatter2, formatDate} from '@/utils/formatTime'
import { AccountCollectionApi } from '@/api/fx/accountcollection'
import CustomerDetailForm from '@/views/fx/customerinfo/CustomerDetailForm.vue'
import ConsigneeTable from '@/views/fx/ordersinfo/components/consigneeTable.vue'
import FromAccountTable from '@/views/fx/fromaccount/components/fromAccountTable.vue'
import ConsigneeSelect from '@/components/Consignee/ConsigneeSelect.vue'
import { CustomerInfoVO } from '@/api/fx/customerinfo'
import { FromAccountVO } from '@/api/fx/fromaccount'
import { CustomerAccountApi } from '@/api/fx/customeraccount'

/** 收款单 表单 */
defineOptions({ name: 'CustomerAccountAuditForm' })

const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { push, currentRoute } = useRouter() // 路由
const uploadHeaders = ref() // 上传 Header 头
const fileList = ref([]) // 文件列表
const importUrl =
  import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_URL + '/fx/ca-rcpt-aud/import'
const queryFormRef = ref() // 搜索的表单

/**
 * 表单相关变量
 */
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('create') // 表单的类型：create - 新增；update - 修改
const formRules = reactive({
  reason: [{ required: true, message: '费用类型不能为空', trigger: 'change' }],
  payType: [{ required: true, message: '支付方式不能为空', trigger: 'change' }],
  fileList: [{ required: true, message: '支付证明不能为空', trigger: 'change' }],
  customer: [{ required: true, message: '客户不能为空', trigger: 'blur' }],
  receive: [{ required: true, message: '收款金额不能为空', trigger: 'blur' }],
  paymentAccount: [{ required: true, message: '打款账户不能为空', trigger: 'change' }],
  paymentAccountName: [{ required: true, message: '打款账户名称不能为空', trigger: 'change' }],
  businessEntity: [{ required: true, message: '业务主体不能为空', trigger: 'change' }]
})
const formData = ref<CaRcptAudVO>({
  id: undefined, // 序号
  orderNo: undefined, // 单据编号
  reason: undefined, // 费用类型
  payType: undefined, // 支付方式
  payWarrant: undefined, // 支付证明
  account: undefined, // 实际账户
  accountName: undefined, // 实际账户名称
  receive: undefined, // 收款金额
  remark: undefined, // 备注
  customer: undefined, // 分销商
  customerName: undefined, // 分销商名称
  soId: undefined, // 业务单据
  submiter: undefined, // 提交人
  paymentAccount: undefined, // 打款账户
  custLevel: undefined, // 客户等级
  paymentAccountName: undefined, // 打款账户名称
  businessEntity: undefined, // 业务主体
  orderDate: new Date().getTime() // 申请日期
} as CaRcptAudVO)

const formRef = ref() // 表单 Ref

// 记录当天已经生成的单据数量
const dailyOrderCount = ref(0)

// 生成单据编号的函数
const generateOrderNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const datePart = `${year}${month}${day}`

  // 递增单据数量
  dailyOrderCount.value++
  const countPart = String(dailyOrderCount.value).padStart(2, '0')

  return `RE${datePart}${countPart}`
}

/**
 * 打开创建表单弹窗
 * @param type
 */
const open = async (type: string) => {
  formType.value = type
  resetForm()
  formData.value.orderNo = generateOrderNo()

  // 获取费用类型选项列表
  const feeTypeOptions = getIntDictOptions(DICT_TYPE.FX_FEE_TYPE)
  if (feeTypeOptions.length > 0) {
    // 设置默认值为第一个选项的值
    formData.value.reason = feeTypeOptions[0].value
  }
}

defineExpose({ open }) // 提供 open 方法，用于打开弹窗

onMounted(async () => {
  await open('create');
});

const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
/**
 * 提交表单
 */
const submitForm = async () => {
  // 1. 校验表单
  try {
    await formRef.value?.validate?.() // 可选链防止formRef不存在时报错
  } catch (error) {
    message.warning('表单校验失败，请检查必填项')
    return // 校验失败直接返回
  }

  // 2. 构建请求参数（根据接口实际需要调整字段）
  const params = {
    // 基础信息
    orderNo: formData.value.orderNo, // 单据编号
    reason: formData.value.reason, // 费用类型
    payType: formData.value.payType, // 支付方式
    receive: formData.value.receive, // 收款金额
    remark: formData.value.remark, // 备注
    orderDate: formatDate(formData.value.orderDate,'YYYY-MM-DD'), // 申请日期

    // 关联对象
    customer: formData.value.customer, // 客户ID
    customerName: formData.value.customerName, // 客户ID
    paymentAccount: formData.value.paymentAccount, // 打款账户ID
    paymentAccountName: formData.value.paymentAccountName, // 打款账户名称
    businessEntity: formData.value.businessEntity, // 业务主体
    account: formData.value.account, // 实际账户
    accountName: formData.value.accountName, // 实际账户名称
    custLevel: formData.value.custLevel, // 客户等级

    // 支付证明（从上传文件中提取，假设文件上传后返回fileId）
    payWarrant: fileList.value.length > 0 ? fileList.value[0]?.response?.data?.fileId : null // 根据实际上传接口返回调整
  }

  // 3. 提交请求
  formLoading.value = true
  try {
    await CaRcptAudApi.startProcessInstanceByStartUser(params)
    message.success('发起审核成功')

    // 4. 成功后操作（关闭当前标签+跳转列表）
    delView(unref(currentRoute)) // 关闭当前标签页
    emit('success') // 通知父组件操作成功
    await push({ name: 'CustomerAccount' }) // 跳转回列表页
  } catch (error) {
    // 捕获接口异常并提示
    const errorMsg = error instanceof Error ? error.message : '发起审核失败'
    message.error(errorMsg)
  } finally {
    formLoading.value = false // 无论成功/失败都重置加载状态
  }
}

/**
 *  重置表单
 */
const resetForm = () => {
  formData.value = {
    id: undefined, // 序号
    orderNo: undefined, // 单据编号
    reason: undefined, // 费用类型
    payType: undefined, // 支付方式
    payWarrant: undefined, // 支付证明
    account: undefined, // 实际账户
    accountName: undefined, // 实际账户名称
    receive: undefined, // 收款金额
    remark: undefined, // 备注
    customer: undefined, // 分销商
    customerName: undefined, // 分销商名称
    soId: undefined, // 业务单据
    submiter: undefined, // 提交人
    paymentAccount: undefined, // 打款账户
    custLevel: undefined, // 客户等级
    paymentAccountName: undefined, // 打款账户名称
    businessEntity: undefined, // 业务主体
    orderDate: new Date().getTime() // 申请日期
  }
  formRef.value?.resetFields()
}
const submitFormSuccess = (response: any) => {
  if (response.code !== 0) {
    message.error(response.msg)
    formLoading.value = false
    return
  }else {
    formData.value.payWarrant = response.data.fileId;
    message.success('支付证明上传成功');
  }
  formLoading.value = false
  dialogVisible.value = false
  // 发送操作成功的事件
  emit('success')
}

/** 上传错误提示 */
const submitFormError = (): void => {
  message.error('上传失败，请您重新上传！')
  formLoading.value = false
}

/** 文件数超出提示 */
const handleExceed = (): void => {
  message.error('最多只能上传一个文件！')
}

// 历史收据查询参数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  orderNo: undefined,
  receive: undefined,
  customer: undefined,
  customerName: undefined,
  payoutAccountId: undefined,
  payoutAccountName: undefined,
  mainId: undefined,
  orderDate: []
})

// 历史收据列表数据
const receiptList = ref([])
const total = ref(0) // 总条数
const currentPage = ref(1)
const pageSize = ref(10)

// 查询历史收据
const searchReceipt = async () => {
  formLoading.value = true
  try {
    const res = await AccountCollectionApi.getAccountCollectionPage(queryParams)
    receiptList.value = res.list
    total.value = res.total
  } finally {
    formLoading.value = false
  }
}

// 重置查询
const resetSearch = () => {
  queryParams.orderNo = undefined
  queryParams.receive = undefined
  queryParams.customer = undefined
  queryParams.payoutAccountName = undefined
  queryParams.mainId = undefined
  queryParams.orderDate = undefined
  searchReceipt()
}

// 添加响应式变量
const detailVisible = ref(false)
const currentCustomer = ref('')
const detailRef = ref()

// 添加查看详情方法
const handleViewDetail = (customer: string) => {
  currentCustomer.value = customer
  detailVisible.value = true
  // 如果需要主动加载数据，可以调用：
  detailRef.value.openById(customer)
}

const fromAccountRef = ref() //收款账户表格引用
const consigneeRef = ref() //收货方表格引用
const consigneeHisRef = ref() //收货方表格引用
const fromAccountSelectRef = ref()
const consigneeSelectRef = ref()
const consigneeSelectHisRef = ref()

const handleFromAccountChange = (row) => {
  formData.paymentAccount = row.id
}
const handleChange = (row) => {
  formData.customer = row.id
}
const handleHisChange = (row) => {
  queryParams.value.customer = row.id
}
/**
 选择收款账户表格数据并回显到表单中
 */
const handleClickFromAccountRow = (data: FromAccountVO) => {
  //@ts-ignore
  formData.value.paymentAccount = data.id
  formData.value.paymentAccountName = data.accountName
}
/**
 选择收货方表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  formData.value.customer = data.id
  formData.value.customerName = data.distributorName
  formData.value.custLevel = data.distributorLevel
}
const handleClickConsigneeHisRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.customer = data.id
}

// 初始化加载历史收据（可选）
onMounted(() => {
  searchReceipt()
  nextTick(() => {
    if (consigneeSelectRef.value) {
      const select = consigneeSelectRef.value.selectRef?.suffixRef
      select.onclick = (event: Event) => {
        event.stopPropagation()
        consigneeRef.value.open()
      }
    }
    if (consigneeSelectHisRef.value) {
      const select = consigneeSelectHisRef.value.selectRef?.suffixRef
      select.onclick = (event: Event) => {
        event.stopPropagation()
        consigneeHisRef.value.open()
      }
    }
    if (fromAccountSelectRef.value) {
      const select = fromAccountSelectRef.value.selectRef?.suffixRef
      select.onclick = async (event: Event) => {
        event.stopPropagation()
        const currentCustomerId = formData.value.customer
        await fromAccountRef.value.open(currentCustomerId)
      }
    }
  })
})
// 监听客户和业务主体变化
watch(
  [() => formData.value.customer, () => formData.value.businessEntity], // 监听源
  async ([newCustomer, newEntity]) => {
    // 若任一参数为空，清空实际账户信息
    if (!newCustomer || !newEntity) {
      formData.value.account = undefined
      formData.value.accountName = undefined
      return
    }

    try {
      // 调用接口查询实际账户（参数需与后端一致）
      const res = await CustomerAccountApi.getCustomerAccountByCusAndEntity(newCustomer, newEntity)

      if (res) {
        // 填充实际账户名称和ID（若需要）
        formData.value.accountName = res.name
        formData.value.account = res.id
      } else {
        message.warning('未找到对应实际账户')
        formData.value.accountName = undefined
        formData.value.account = undefined
      }
    } catch (error) {
      message.error('查询实际账户失败')
      formData.value.account = undefined
      formData.value.accountName = undefined
    }
  },
  { immediate: false } // 初始加载时不触发（可选）
)
</script>

<style scoped>
@import '/src/styles/fx/siderActions.scss';
@import '/src/styles/fx/siderTotal.scss';

.search-select .el-select__caret {
  transform: rotate(0) !important;
}

.search-select .el-select__caret.is-reverse {
  transform: rotate(0) !important;
}

* {
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 10px 0;
  padding: 0 12px;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 24px;
  color: var(--el-color-primary);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.logo-image {
  height: 40px;
  object-fit: contain;
}

.main-content {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0;
}

.section-header .el-icon {
  font-size: 18px;
  color: var(--el-color-primary);
}
.history-receipt-query-form {
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
