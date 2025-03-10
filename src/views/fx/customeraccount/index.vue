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
      <el-form-item label="分销商编号" prop="distributorId">
        <el-input
          v-model="queryParams.distributorId"
          placeholder="请输入分销商编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="余额" prop="balance">-->
<!--        <el-input-->
<!--          v-model="queryParams.balance"-->
<!--          placeholder="请输入余额"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="账户编号" prop="accountId">
        <el-input
          v-model="queryParams.accountId"
          placeholder="请输入账户编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="暂扣金额" prop="detainAmount">-->
<!--        <el-input-->
<!--          v-model="queryParams.detainAmount"-->
<!--          placeholder="请输入暂扣金额"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="是否冻结" prop="isActive">
        <el-select
          v-model="queryParams.isActive"
          placeholder="请输入是否冻结"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        >
        <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
        />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="押金" prop="deposit">-->
<!--        <el-input-->
<!--          v-model="queryParams.deposit"-->
<!--          placeholder="请输入押金"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="创建时间" prop="createTime">-->
<!--        <el-date-picker-->
<!--          v-model="queryParams.createTime"-->
<!--          value-format="YYYY-MM-DD HH:mm:ss"-->
<!--          type="daterange"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="业务主体" prop="company">
        <el-select
          v-model="queryParams.company"
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
<!--      <el-form-item label="货补虚拟金额" prop="vAmount">-->
<!--        <el-input-->
<!--          v-model="queryParams.vAmount"-->
<!--          placeholder="请输入货补虚拟金额"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否允许超额提货" prop="isAllow">-->
<!--        <el-select-->
<!--          v-model="queryParams.isAllow"-->
<!--          placeholder="请输入是否允许超额提货"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--              v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"-->
<!--              :key="dict.value"-->
<!--              :label="dict.label"-->
<!--              :value="dict.value"-->
<!--          />-->
<!--          </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="超额提货额度" prop="quota">-->
<!--        <el-input-->
<!--          v-model="queryParams.quota"-->
<!--          placeholder="请输入超额提货额度"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
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
<!--      <el-form-item label="是否计算货补" prop="isRep">-->
<!--        <el-input-->
<!--          v-model="queryParams.isRep"-->
<!--          placeholder="请输入是否计算货补"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="暂扣货补金额" prop="zkVAmount">-->
<!--        <el-input-->
<!--          v-model="queryParams.zkVAmount"-->
<!--          placeholder="请输入暂扣货补金额"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="账户名" prop="name">-->
<!--        <el-input-->
<!--          v-model="queryParams.name"-->
<!--          placeholder="请输入账户名"-->
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
          v-hasPermi="['fx:customer-account:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:customer-account:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="分销商编号" align="center" prop="distributorId" />
      <el-table-column label="余额" align="center" prop="balance" />
      <el-table-column label="账户编号" align="center" prop="accountId" />
      <el-table-column label="暂扣金额" align="center" prop="detainAmount" />
      <el-table-column label="是否冻结" align="center" prop="isActive" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isActive" />
        </template>
      </el-table-column>
      <el-table-column label="押金" align="center" prop="deposit" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="业务主体" align="center" prop="company">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.company" />
        </template>
      </el-table-column>
      <el-table-column label="货补虚拟金额" align="center" prop="vAmount" />
      <el-table-column label="是否允许超额提货" align="center" prop="isAllow" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isAllow" />
        </template>
      </el-table-column>
      <el-table-column label="超额提货额度" align="center" prop="quota" />
      <el-table-column label="是否计算货补" align="center" prop="isRep" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isRep" />
        </template>
      </el-table-column>
      <el-table-column label="暂扣货补金额" align="center" prop="zkVAmount" />
<!--      <el-table-column label="账户名" align="center" prop="name" />-->
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:customer-account:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:customer-account:delete']"
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
  <CustomerAccountForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { CustomerAccountApi, CustomerAccountVO } from '@/api/fx/customeraccount'
import CustomerAccountForm from './CustomerAccountForm.vue'

/** 分销商账号 列表 */
defineOptions({ name: 'CustomerAccount' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<CustomerAccountVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  distributorId: undefined,
  balance: undefined,
  accountId: undefined,
  detainAmount: undefined,
  isActive: undefined,
  deposit: undefined,
  createTime: [],
  company: undefined,
  vAmount: undefined,
  isAllow: undefined,
  quota: undefined,
  remark: undefined,
  isRep: undefined,
  zkVAmount: undefined,
  name: undefined,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await CustomerAccountApi.getCustomerAccountPage(queryParams)
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
    await CustomerAccountApi.deleteCustomerAccount(id)
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
    const data = await CustomerAccountApi.exportCustomerAccount(queryParams)
    download.excel(data, '分销商账号.xls')
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
