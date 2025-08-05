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

        <div class="bg-white px-10 py-5">
          <!-- 收款信息 -->
          <div class="section-header">
            <el-icon><Paperclip /></el-icon>
            <span>收款信息</span>
          </div>

          <ElRow>
            <ElCol :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">单据编号</span>
                <span>{{ formData.orderNo || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">费用类型</span>
                <span>{{ getDictLabel(DICT_TYPE.FX_FEE_TYPE, formData.reason) || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">支付方式</span>
                <span>{{ getDictLabel(DICT_TYPE.FX_PAYMENT_METHOD, formData.payType) || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">客户</span>
                <span>{{ formData.customerName || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">收款金额</span>
                <span>{{ formData.receive || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">客户等级</span>
                <span>{{ getDictLabel(DICT_TYPE.FX_CUSTOMER_LEVEL, formData.custLevel) || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">打款账户</span>
                <span>{{ formData.paymentAccountName || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">打款账户名称</span>
                <span>{{ formData.paymentAccountName || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">业务主体</span>
                <span>{{ getDictLabel(DICT_TYPE.FX_BUSINESS_ENTITY, formData.businessEntity) || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">实际账户</span>
                <span>{{ formData.accountName || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">申请日期</span>
                <span>{{ dateFormatter2(formData.orderDate) || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :span="24">
              <div class="el-form-item">
                <span class="el-form-item__label">备注</span>
                <span>{{ formData.remark || '无' }}</span>
              </div>
            </ElCol>
            <ElCol :span="7">
              <div class="el-form-item">
                <span class="el-form-item__label">支付证明</span>
                <el-link v-if="formData.payWarrant" type="primary" @click="openPayWarrantModal">已上传</el-link>
                <span v-else>无</span>
              </div>
            </ElCol>
          </ElRow>

          <div class="section-header">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span>历史收据</span>
          </div>
          <!-- 历史收据查询表单 -->
          <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" label-width="100px">
            <el-row :gutter="16">
              <!-- 单据编号 -->
              <el-col :span="6">
                <el-form-item label="单据编号">
                  <el-input
                    v-model="queryParams.orderNo"
                    @keyup.enter="searchReceipt"
                    placeholder="单据编号"
                    style="width: 100%"
                    disabled
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
                    disabled
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
                    disabled
                  />
                </el-form-item>
              </el-col>

              <!-- 客户 -->
              <el-col :span="6">
                <el-form-item label="客户">
                  <ConsigneeSelect
                    ref="consigneeSelectHisRef"
                    v-model="queryParams.customer"
                    @update:model-value="handleHisChange"
                    class="w-100%"
                    disabled
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
                    disabled
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
                    disabled
                  />
                </el-form-item>
              </el-col>

              <!-- 查询/重置按钮 -->
              <el-form-item>
                <el-button type="primary" @click="searchReceipt" disabled>查询</el-button>
                <el-button @click="resetSearch" disabled>重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>

          <!-- 历史收据数据表格 -->
          <el-table :data="receiptList" border style="width: 100%; margin: 10px 0">
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
                <el-link type="primary" @click="handleViewDetail(scope.row.customer)" disabled>
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

          <!-- 分页组件 -->
          <Pagination
            :total="total"
            v-model:page="queryParams.pageNo"
            v-model:limit="queryParams.pageSize"
            @pagination="searchReceipt"
            disabled
          />
        </div>
      </ContentWrap>
    </div>
  </div>
  <ConsigneeTable ref="consigneeHisRef" @click-row="handleClickConsigneeHisRow" />
  <CustomerDetailForm ref="detailRef" v-model:visible="detailVisible" :customer="currentCustomer" />
  <el-dialog v-model:visible="payWarrantModalVisible" title="支付证明">
    <template #content>
      <img :src="formData.payWarrant" alt="支付证明" style="max-width: 100%;"/>
    </template>
    <template #footer>
      <el-button @click="payWarrantModalVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions, getStrDictOptions } from '@/utils/dict'
import { AccountCollectionApi } from '@/api/fx/accountcollection'
import { useRouter } from 'vue-router'
import { dateFormatter2, formatDate } from '@/utils/formatTime'
import CustomerDetailForm from '@/views/fx/customerinfo/CustomerDetailForm.vue'
import ConsigneeTable from '@/views/fx/ordersinfo/components/consigneeTable.vue'
import ConsigneeSelect from '@/components/Consignee/ConsigneeSelect.vue'
import { CustomerInfoVO } from '@/api/fx/customerinfo'
import {propTypes} from "@/utils/propTypes";
import {CaRcptAudApi} from "@/api/fx/carcptaud";
import { Document, Paperclip, MapLocation } from "@element-plus/icons-vue";

/** 销售单 表单 */
defineOptions({ name: 'CustomerAccountViewForm' })

const { query } = useRoute() // 查询参数
const props = defineProps({
  id: propTypes.number.def(undefined)
})
const queryId = query.id as unknown as string // 从 URL 传递过来的 id 编号

const message = useMessage() // 消息弹窗
const { push } = useRouter() // 路由

// 表单数据
const formData = ref({
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
})

// 获取字典标签
const getDictLabel = (dictType: string, value: string | number) => {
  const dictList = getIntDictOptions(dictType)
  const item = dictList.find(item => item.value === value)
  return item ? item.label : ''
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

// 查询历史收据
const searchReceipt = async () => {
  try {
    const res = await AccountCollectionApi.getAccountCollectionPage(queryParams)
    receiptList.value = res.list
    total.value = res.total
  } catch (error) {
    message.error('查询历史收据失败')
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

const consigneeHisRef = ref() // 收货方表格引用
const consigneeSelectHisRef = ref()

const handleHisChange = (row) => {
  queryParams.customer = row.id
}

/**
 * 选择收货方表格数据并回显到表单中
 */
const handleClickConsigneeHisRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.customer = data.id
}
// 添加响应式变量，用于控制图片详情弹窗的显示和隐藏
const payWarrantModalVisible = ref(false);

// 打开支付证明图片详情弹窗的方法
const openPayWarrantModal = () => {
  payWarrantModalVisible.value = true;
};
const loading = ref(false)
const getDetail = async () => {
  // 获取收款单详情
  loading.value = false
  try {
    const res = await CaRcptAudApi.getAccountCollectionByProcessInstanceId(queryId)
    Object.assign(formData.value, res);
    // 如果 formData.payWarrant 只是文件名，需要拼接完整路径
    if (formData.value.payWarrant) {
      const basePath = '/data/uploads/pay-warrants/2025-07-17/'; // 替换为实际的基础路径
      formData.value.payWarrant = basePath + formData.value.payWarrant;
      console.log(formData.value.payWarrant)
    }
  } finally {
    loading.value = false
  }
}
defineExpose({ open: getDetail }) // 提供 open 方法，用于打开弹窗

// 初始化加载历史收据（可选）
onMounted(() => {
  getDetail()
  searchReceipt()
})
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
</style>
