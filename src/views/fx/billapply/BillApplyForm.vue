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
                  <div class="tags-wrapper" ref="tagsWrapper" @scroll="handleTagsScroll">
                    <el-tag
                      v-for="order in visibleOrders"
                      :key="order.id"
                      closable
                      @close="removeSaleOrder(order.id)"
                      class="mr-2 mt-2"
                    >
                      {{ order.orderId }}
                    </el-tag>
                  </div>
                  <!-- 显示滚动提示 -->
                  <div v-if="formData.saleOrder.length > visibleCount" class="scroll-tip">
                    已显示 {{ visibleOrders.length }} 条，共 {{ formData.saleOrder.length }} 条
                  </div>
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
            <el-form-item label="开票信息" prop="billingInfo" v-if="!isDetail">
              <div class="multi-select-container">
                <el-button type="primary" @click="openBillingInfoTable" :disabled="isDetail">
                  选择开票信息
                </el-button>

                <!-- 显示已选择的开票信息 -->
                <div v-if="selectedBillingInfo" class="selected-info">
                  <el-tag closable @close="clearBillingInfo">
                    {{ selectedBillingInfo.company }}
                  </el-tag>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="购方名称" prop="purchaserName">
              <el-input
                v-model="formData.purchaserName"
                placeholder="请输入购方名称"
                :disabled="isDetail"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
            <el-form-item label="发票附件" prop="document" v-if="isDetail">
              <!-- 限制最大5MB -->
              <UploadFile
                v-model="formData.document"
                width="200px"
                height="200px"
                :show-delete="true"
                disabled="false"
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
    <!-- 子表的表单 -->
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="销售商品详情" name="billApplyDetail" :lazy="false">
        <BillApplyDetailForm ref="billApplyDetailFormRef" :main-id="formData.id"  />
      </el-tab-pane>
    </el-tabs>

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
    :customer-id="formData.customerId"
    @confirm="handleSaleSelectConfirm"
  />
  <BillingInfoTable
    ref="billingInfoTableRef"
    @click-row="handleBillingInfoSelect"
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
import BillApplyDetailForm from "@/views/fx/billapply/components/BillApplyDetailForm.vue";
import BillingInfoTable from '@/views/fx/billapply/components/BillingInfoTable.vue';
import { BillingInfoVO } from "@/api/fx/billinginfo";

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
/** 子表的表单 */
const subTabsName = ref('billApplyDetail')
const billApplyDetailFormRef = ref()

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
  isSend: undefined,
  customerId: undefined,
  salespersonId: undefined,
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
    formData.value.customerId = ''
    return
  }

  // 从用户选项中找到对应的nickname
  const selectedUser = userOptions.value.find((item) => item.id === firstId)
  if (selectedUser) {
    console.log('selectedUser', selectedUser)
    formData.value.purchaserName = selectedUser.nickname
    formData.value.customerId = selectedUser.customerId
  }
}

// 销售单选择相关
const saleTableRef = ref<InstanceType<typeof SaleTable>>()
const saleOrderDisplay = ref('') // 用于显示的文本

// 控制显示的标签数量
const visibleCount = ref(20); // 初始显示20个
const tagsWrapper = ref(null);

// 只显示前N个标签
const visibleOrders = computed(() => {
  return formData.value.saleOrder.slice(0, visibleCount.value);
});

// 滚动时加载更多
const handleTagsScroll = (e) => {
  const wrapper = e.target;
  // 滚动到底部时加载更多（每次加20个）
  if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight - 10) {
    if (visibleCount.value < formData.value.saleOrder.length) {
      visibleCount.value = Math.min(
        visibleCount.value + 20,
        formData.value.saleOrder.length
      );
    }
  }
};

// 打开销售单选择表格
const openSaleTable = () => {
  console.log('formData.value.customerId', formData.value.customerId)
  saleTableRef.value?.open(formData.value.customerId)
}

// 处理选择确认
const handleSaleSelectConfirm = async (selected: OrdersInfoVO[]) => {
  // 合并已选择项，避免重复
  formData.value.saleOrder = selected;
  // 找到单据时间最晚的销售单并赋值creatorId给salespersonId
  if (selected.length > 0) {
    // 按单据时间降序排序，取第一个（最晚的）
    const latestOrder = [...selected].sort((a, b) => {
      // 处理日期比较（假设orderDate为ISO格式字符串或Date对象）
      const dateA = new Date(a.orderDate as any).getTime();
      const dateB = new Date(b.orderDate as any).getTime();
      return dateB - dateA; // 降序排列
    })[0];

    // 将最晚单据的creatorId赋值给salespersonId
    formData.value.salespersonId = latestOrder.creatorId;
  } else {
    // 若未选择销售单，清空salespersonId
    formData.value.salespersonId = undefined;
  }
  // 获取选中销售单的明细并设置到商品详情
  if (selected.length > 0) {
    try {
      // 假设存在获取销售单明细的API方法
      const detailList = []
      for (const order of selected) {
        const details = await OrdersInfoApi.getOrdersDetailListByOrderId(order.id)
        // 转换明细格式为BillGoods需要的格式
        console.log(details)
        const formattedDetails = details.map(detail => markRaw({
          id: undefined,
          mainId: formData.value.id,
          vareName: detail.skuName,
          wareSpec: detail.category,
          wareUnit: detail.unit,         
          num: Number(detail.count) || 0,
          price: Number(detail.salePrice) || 0,
          amount: Number(detail.saleAmount) || 0,
          saleOrderId: order.id, // 记录当前明细所属的销售单ID
        }))
        detailList.push(...formattedDetails)
      }
      // 设置明细数据到子组件
      await billApplyDetailFormRef.value?.setData(detailList)
      // 等待子组件计算属性更新
      await nextTick()
      // 自动计算总金额并赋值到主表单
      const detailSum = detailList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      formData.value.amount = Number(detailSum || 0).toFixed(2);
    } catch (error) {
      message.error('获取销售单明细失败')
      console.error(error)
    }
  }
}

// 移除已选择的销售单
const removeSaleOrder = (id: number) => {
  console.log('移除销售单前的明细列表：', billApplyDetailFormRef.value?.getData())
  console.log('移除销售单id：', id)
  // 1. 从主表单的销售单列表中删除
  formData.value.saleOrder = formData.value.saleOrder.filter((item) => item.id !== id)
  // 清空明细数据
  // 2. 从子组件的明细列表中删除该销售单对应的明细
  if (billApplyDetailFormRef.value) {
    // 通过 getData() 获取当前明细（而非直接访问 formData）
    const currentDetails = billApplyDetailFormRef.value.getData() || [];
    // 过滤掉属于当前销售单的明细（依赖明细中的 saleOrderId）
    const filteredDetails = currentDetails.filter(detail => detail.saleOrderId !== id);

    // 通过子组件的 setData 方法更新明细
    billApplyDetailFormRef.value.setData(filteredDetails);

    // 3. 同步更新主表单金额
    formData.value.amount = Number(billApplyDetailFormRef.value.totalAmount || 0).toFixed(2);
  }
}

// 开票信息相关
const billingInfoTableRef = ref<InstanceType<typeof BillingInfoTable>>();
const selectedBillingInfo = ref<BillingInfoVO | null>(null);

// 打开开票信息选择表格
const openBillingInfoTable = () => {
  billingInfoTableRef.value?.open();
};

// 处理选择的开票信息
const handleBillingInfoSelect = (billingInfo: BillingInfoVO) => {
  if (billingInfo) {
    selectedBillingInfo.value = billingInfo;
    // 将选中的开票信息填充到表单中
    formData.value.billInfo = billingInfo.id;
    formData.value.purchaserName = billingInfo.company;
    formData.value.taxNo = billingInfo.tax;
    formData.value.email = billingInfo.email;
    formData.value.bankNo = billingInfo.bank;
    formData.value.address = billingInfo.address;
  }
};

// 清除已选择的开票信息
const clearBillingInfo = () => {
  selectedBillingInfo.value = null;
  formData.value.purchaserName = '';
  formData.value.taxNo = '';
  formData.value.email = '';
  formData.value.bankNo = '';
  formData.value.address = '';
};

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
      formData.value.customerId = defaultUser.customerId
      formData.value.cusName = defaultUser.nickname
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
    // 拼接子表的数据
    data.billApplyDetails = billApplyDetailFormRef.value.getData()
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
    isSend: undefined,
    customerId: undefined
  }
  fileList.value = []
  formRef.value?.resetFields()
}
</script>

<style scoped>
.tags-wrapper {
  max-height: 120px;
  overflow-y: auto;
  padding: 5px;
}
.scroll-tip {
  font-size: 12px;
  color: #666;
  text-align: right;
  padding: 5px;
}
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

  .selected-info {
    margin-top: 10px;
  }

  .multi-select-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
