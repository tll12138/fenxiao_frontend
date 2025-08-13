<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="100px"
    >
      <el-form-item label="申请日期" prop="applyDate">
        <el-date-picker
          v-model="queryParams.applyDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="地址及电话" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入地址及电话"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="开户行及账号" prop="bankNo">
        <el-input
          v-model="queryParams.bankNo"
          placeholder="请输入开户行及账号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="发票类型" prop="billType">
        <el-select
          v-model="queryParams.billType"
          placeholder="请选择发票类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.FX_BILL_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发票抬头" prop="billHead">
        <el-select
          v-model="queryParams.billHead"
          placeholder="请选择发票抬头"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="购方名称" prop="purchaserName">
        <el-input
          v-model="queryParams.purchaserName"
          placeholder="请输入购方名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="纳税人识别号" prop="taxNo">
        <el-input
          v-model="queryParams.taxNo"
          placeholder="请输入纳税人识别号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['fx:bill-apply:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:bill-apply:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="申请日期" align="center" prop="applyDate" min-width="120" />
      <el-table-column label="开票日期" align="center" prop="billDate" min-width="120"/>
      <el-table-column label="地址及电话" align="center" prop="address" min-width="180" />
      <el-table-column label="开户行及账号" align="center" prop="bankNo" min-width="200" />
      <el-table-column label="金额合计" align="center" prop="amount" min-width="80"/>
      <el-table-column label="发票类型" align="center" prop="billType" min-width="155">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BILL_TYPE" :value="scope.row.billType" />
        </template>
      </el-table-column>
      <el-table-column label="发票抬头" align="center" prop="billHead" min-width="120">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.billHead" />
        </template>
      </el-table-column>
      <el-table-column label="发票邮箱" align="center" prop="email" min-width="180" />
      <el-table-column label="备注" align="center" prop="remark" min-width="150" />
      <el-table-column label="操作" align="center" min-width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:bill-apply:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:bill-apply:delete']"
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
  <BillApplyForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import {getStrDictOptions, DICT_TYPE, getDictOptions} from '@/utils/dict'
import download from '@/utils/download'
import { BillApplyApi, BillApplyVO } from '@/api/fx/billapply'
import BillApplyForm from './BillApplyForm.vue'

/** 发票申请 列表 */
defineOptions({ name: 'BillApply' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<BillApplyVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  applyMan: undefined,
  applyDate: [],
  billDate: [],
  address: undefined,
  bankNo: undefined,
  amount: undefined,
  maker: undefined,
  remark: undefined,
  billType: undefined,
  totalAmount: undefined,
  saleOrder: undefined,
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
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await BillApplyApi.getBillApplyPage(queryParams)
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
    await BillApplyApi.deleteBillApply(id)
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
    const data = await BillApplyApi.exportBillApply(queryParams)
    download.excel(data, '发票申请.xls')
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
