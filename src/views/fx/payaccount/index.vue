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
      <el-form-item label="类型" prop="payType">
        <el-select
          v-model="queryParams.payType"
          placeholder="请选择类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.ACCOUNT_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="分销商账户" prop="customerId">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="queryParams.customerId"
          @update:modelValue="handleChange"
        />
      </el-form-item>
      <el-form-item label="付款账户" prop="accountNo">
        <el-input
          v-model="queryParams.accountNo"
          placeholder="请输入付款账户"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否可用" prop="isActive">
        <el-select
          v-model="queryParams.isActive"
          placeholder="请选择是否可用"
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
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
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
          v-hasPermi="['fx:pay-account:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:pay-account:export']"
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
      <el-table-column label="类型" align="center" prop="payType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.ACCOUNT_TYPE" :value="scope.row.payType" />
        </template>
      </el-table-column>
      <el-table-column label="分销商账户" align="center" prop="customerId" >
        <template #default="scope">
          <el-link type="primary" @click="handleViewDetail(scope.row.customerId)">
            {{ scope.row.customerName}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="付款账户" align="center" prop="accountNo" />
      <el-table-column label="说明" align="center" prop="description" />
      <el-table-column label="是否可用" align="center" prop="isActive">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isActive" />
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:pay-account:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:pay-account:delete']"
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
  <PayAccountForm ref="formRef" @success="getList" />
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  <CustomerDetailForm
    ref="detailRef"
    v-model:visible="detailVisible"
    :customer="currentCustomer"
  />
</template>

<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { PayAccountApi, PayAccountVO } from '@/api/fx/payaccount'
import PayAccountForm from './PayAccountForm.vue'
import ConsigneeSelect from "@/components/Consignee/ConsigneeSelect.vue";
import CustomerDetailForm from "@/views/fx/customerinfo/CustomerDetailForm.vue";
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue";
import {CustomerInfoVO} from "@/api/fx/customerinfo";

/** 分销支付账户 列表 */
defineOptions({ name: 'PayAccount' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<PayAccountVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  payType: undefined,
  customerId: undefined,
  customerName: undefined,
  accountNo: undefined,
  description: undefined,
  isActive: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await PayAccountApi.getPayAccountPage(queryParams)
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
    await PayAccountApi.deletePayAccount(id)
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
    const data = await PayAccountApi.exportPayAccount(queryParams)
    download.excel(data, '分销支付账户.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
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

/**
 * 分销商表格
 */
const consigneeRef = ref() //收货方表格引用
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeSelectRef = ref()

const handleChange = (row) => {
  queryParams.customer = row.id
}
/**
 选择分销商表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.customer = data.id
}

/** 初始化 **/
onMounted(() => {
  getList()
  nextTick(() => {
    if (consigneeSelectRef.value) {
      const select = consigneeSelectRef.value.selectRef?.suffixRef
      select.onclick = (event: Event) => {
        event.stopPropagation()
        consigneeRef.value.open()
      }
    }
  })
})
</script>
