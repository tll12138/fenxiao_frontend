<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="单据编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入单据编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="费用类型" prop="reason">
        <el-select
          v-model="queryParams.reason"
          placeholder="请选择费用类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_FEE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付方式" prop="payType">
        <el-select
          v-model="queryParams.payType"
          placeholder="请选择支付方式"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_PAYMENT_METHOD)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="支付证明 " prop="payWarrant">
        <el-input
          v-model="queryParams.payWarrant"
          placeholder="请输入支付证明 "
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="实际账户" prop="account">
        <el-input
          v-model="queryParams.account"
          placeholder="请输入实际账户"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="收款金额" prop="receive">
        <el-input
          v-model="queryParams.receive"
          placeholder="请输入收款金额"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="分销商" prop="customer">
        <el-input
          v-model="queryParams.customer"
          placeholder="请输入分销商"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="分销商名称" prop="customerName">
        <el-input
          v-model="queryParams.customerName"
          placeholder="请输入分销商名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="业务单据" prop="soId">
        <el-input
          v-model="queryParams.soId"
          placeholder="请输入业务单据"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提交人" prop="submiter">
        <el-input
          v-model="queryParams.submiter"
          placeholder="请输入提交人"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提交人姓名" prop="submiterName">
        <el-input
          v-model="queryParams.submiterName"
          placeholder="请输入提交人姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="打款账户" prop="paymentAccount">
        <el-input
          v-model="queryParams.paymentAccount"
          placeholder="请输入打款账户"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="客户等级" prop="custLevel">
        <el-select
          v-model="queryParams.custLevel"
          placeholder="请选择客户等级"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="打款账户名称" prop="paymentAccountName">
        <el-input
          v-model="queryParams.paymentAccountName"
          placeholder="请输入打款账户名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否重复" prop="isRepeat">
        <el-select
          v-model="queryParams.isRepeat"
          placeholder="请选择是否重复"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务主体" prop="businessEntity">
        <el-select
          v-model="queryParams.businessEntity"
          placeholder="请选择业务主体"
          clearable
          class="!w-240px"
        >
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
          v-model="queryParams.orderDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否节假日" prop="isWeek">
        <el-select
          v-model="queryParams.isWeek"
          placeholder="请选择是否节假日"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['fx:ca-rcpt-aud:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:ca-rcpt-aud:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="单据编号" align="center" prop="orderNo" />
      <el-table-column label="费用类型" align="center" prop="reason">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_FEE_TYPE" :value="scope.row.reason" />
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center" prop="payType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_PAYMENT_METHOD" :value="scope.row.payType" />
        </template>
      </el-table-column>
      <el-table-column label="支付证明 " align="center" prop="payWarrant" />
      <el-table-column label="实际账户" align="center" prop="account" />
      <el-table-column label="收款金额" align="center" prop="receive" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="分销商" align="center" prop="customer" />
      <el-table-column label="分销商名称" align="center" prop="customerName" />
      <el-table-column label="业务单据" align="center" prop="soId" />
      <el-table-column label="提交人" align="center" prop="submiter" />
      <el-table-column label="提交人姓名" align="center" prop="submiterName" />
      <el-table-column label="打款账户" align="center" prop="paymentAccount" />
      <el-table-column label="客户等级" align="center" prop="custLevel">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="scope.row.custLevel" />
        </template>
      </el-table-column>
      <el-table-column label="打款账户名称" align="center" prop="paymentAccountName" />
      <el-table-column label="是否重复" align="center" prop="isRepeat">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isRepeat" />
        </template>
      </el-table-column>
      <el-table-column label="业务主体" align="center" prop="businessEntity">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.businessEntity" />
        </template>
      </el-table-column>
      <el-table-column label="申请日期" align="center" prop="orderDate" />
      <el-table-column label="是否节假日" align="center" prop="isWeek">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isWeek" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:ca-rcpt-aud:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:ca-rcpt-aud:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <CaRcptAudForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { CaRcptAudApi, CaRcptAudVO } from '@/api/fx/carcptaud'
import CaRcptAudForm from './CaRcptAudForm.vue'

/** 客商账户收款审核 列表 */
defineOptions({ name: 'CaRcptAud' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<CaRcptAudVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  orderDate: [],
  isWeek: undefined,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await CaRcptAudApi.getCaRcptAudPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await CaRcptAudApi.deleteCaRcptAud(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await CaRcptAudApi.exportCaRcptAud(queryParams)
    download.excel(data, '客商账户收款审核.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>