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
<!--      <el-form-item label="申请人" prop="applyMan">-->
<!--        <el-select-->
<!--          v-model="queryParams.applyMan"-->
<!--          placeholder="请选择申请人"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="申请日期" prop="applyDate">-->
<!--        <el-date-picker-->
<!--          v-model="queryParams.applyDate"-->
<!--          value-format="YYYY-MM-DD HH:mm:ss"-->
<!--          type="daterange"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="开票日期" prop="billDate">
        <el-date-picker
          v-model="queryParams.billDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="地址及电话" prop="address">-->
<!--        <el-input-->
<!--          v-model="queryParams.address"-->
<!--          placeholder="请输入地址及电话"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开户行及账号" prop="bankNo">-->
<!--        <el-input-->
<!--          v-model="queryParams.bankNo"-->
<!--          placeholder="请输入开户行及账号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="金额合计" prop="amount">-->
<!--        <el-input-->
<!--          v-model="queryParams.amount"-->
<!--          placeholder="请输入金额合计"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="操作员" prop="maker">-->
<!--        <el-select-->
<!--          v-model="queryParams.maker"-->
<!--          placeholder="请选择操作员"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="备注" prop="remark">-->
<!--        <el-input-->
<!--          v-model="queryParams.remark"-->
<!--          placeholder="请输入备注"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-form-item label="金额合计(大写)" prop="totalAmount">-->
<!--        <el-input-->
<!--          v-model="queryParams.totalAmount"-->
<!--          placeholder="请输入金额合计(大写)"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-form-item label="发票附件" prop="document">-->
<!--        <el-input-->
<!--          v-model="queryParams.document"-->
<!--          placeholder="请输入发票附件"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="财务说明" prop="financialStatement">-->
<!--        <el-input-->
<!--          v-model="queryParams.financialStatement"-->
<!--          placeholder="请输入财务说明"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-form-item label="客户名称" prop="cusName">-->
<!--        <el-select-->
<!--          v-model="queryParams.cusName"-->
<!--          placeholder="请选择客户名称"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开票信息" prop="billInfo">-->
<!--        <el-select-->
<!--          v-model="queryParams.billInfo"-->
<!--          placeholder="请选择开票信息"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="开票流程" prop="rid">
        <el-input
          v-model="queryParams.rid"
          placeholder="请输入开票流程"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="是否完成" prop="isOver">-->
<!--        <el-select-->
<!--          v-model="queryParams.isOver"-->
<!--          placeholder="请选择是否完成"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否芽肌" prop="isYj">-->
<!--        <el-select-->
<!--          v-model="queryParams.isYj"-->
<!--          placeholder="请选择是否芽肌"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getDictOptions(DICT_TYPE.YES_NO)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="发票邮箱" prop="email">-->
<!--        <el-input-->
<!--          v-model="queryParams.email"-->
<!--          placeholder="请输入发票邮箱"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="关联邮箱" prop="emailId">-->
<!--        <el-select-->
<!--          v-model="queryParams.emailId"-->
<!--          placeholder="请选择关联邮箱"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="发票发送状态" prop="isSend">-->
<!--        <el-input-->
<!--          v-model="queryParams.isSend"-->
<!--          placeholder="请输入发票发送状态"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-table-column label="序号" align="center" prop="id" />-->
      <el-table-column label="申请人" align="center" prop="applyMan" />
      <el-table-column label="申请日期" align="center" prop="applyDate" />
      <el-table-column label="开票日期" align="center" prop="billDate" />
      <el-table-column label="地址及电话" align="center" prop="address" />
      <el-table-column label="开户行及账号" align="center" prop="bankNo" />
      <el-table-column label="金额合计" align="center" prop="amount" />
      <el-table-column label="操作员" align="center" prop="maker" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="发票类型" align="center" prop="billType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BILL_TYPE" :value="scope.row.billType" />
        </template>
      </el-table-column>
<!--      <el-table-column label="金额合计(大写)" align="center" prop="totalAmount" />-->
      <el-table-column label="销售单" align="center" prop="saleOrder" />
      <el-table-column label="发票抬头" align="center" prop="billHead">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.billHead" />
        </template>
      </el-table-column>
      <el-table-column label="发票附件" align="center" prop="document" />
      <el-table-column label="财务说明" align="center" prop="financialStatement" />
      <el-table-column label="购方名称" align="center" prop="purchaserName" />
      <el-table-column label="纳税人识别号" align="center" prop="taxNo" />
      <el-table-column label="客户名称" align="center" prop="cusName" />
      <el-table-column label="开票信息" align="center" prop="billInfo" />
      <el-table-column label="开票流程" align="center" prop="rid" />
<!--      <el-table-column label="是否完成" align="center" prop="isOver">-->
<!--        <template #default="scope">-->
<!--          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isOver" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="是否芽肌" align="center" prop="isYj">-->
<!--        <template #default="scope">-->
<!--          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isYj" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="发票邮箱" align="center" prop="email" />-->
<!--      <el-table-column label="关联邮箱" align="center" prop="emailId" />-->
<!--      <el-table-column label="发票发送状态" align="center" prop="isSend" />-->
      <el-table-column label="操作" align="center">
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
