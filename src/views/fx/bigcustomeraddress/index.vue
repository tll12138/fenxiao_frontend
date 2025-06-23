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
      <el-form-item label="分销商" prop="customerId">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="queryParams.customerId"
          @update:modelValue="handleChange"
        />
      </el-form-item>
<!--      <el-form-item label="省" prop="province">-->
<!--        <el-input-->
<!--          v-model="queryParams.province"-->
<!--          placeholder="请输入省"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="市" prop="city">-->
<!--        <el-input-->
<!--          v-model="queryParams.city"-->
<!--          placeholder="请输入市"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="区" prop="district">-->
<!--        <el-input-->
<!--          v-model="queryParams.district"-->
<!--          placeholder="请输入区"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="地址" prop="address">-->
<!--        <el-input-->
<!--          v-model="queryParams.address"-->
<!--          placeholder="请输入地址"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="联系人" prop="person">
        <el-input
          v-model="queryParams.person"
          placeholder="请输入联系人"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="联系电话" prop="contact">-->
<!--        <el-input-->
<!--          v-model="queryParams.contact"-->
<!--          placeholder="请输入联系电话"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-form-item label="审批状态" prop="status">-->
<!--        <el-select-->
<!--          v-model="queryParams.status"-->
<!--          placeholder="请选择审批状态"-->
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
<!--      <el-form-item label="备注" prop="remark">-->
<!--        <el-input-->
<!--          v-model="queryParams.remark"-->
<!--          placeholder="请输入备注"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="所属品牌" prop="brand">
        <el-select
          v-model="queryParams.brand"
          placeholder="请选择所属品牌"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="使用次数" prop="count">-->
<!--        <el-input-->
<!--          v-model="queryParams.count"-->
<!--          placeholder="请输入使用次数"-->
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
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['fx:big-customer-address:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:big-customer-address:export']"
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
      <el-table-column label="分销商" align="center" prop="customerName" :show-overflow-tooltip="false" width="200">
        <template #default="scope">
          <el-link type="primary" @click="handleViewDetail(scope.row.customerId)">
            {{ scope.row.customerName}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="省" align="center" prop="province" />
      <el-table-column label="市" align="center" prop="city" />
      <el-table-column label="区" align="center" prop="district" />
      <el-table-column
        label="地址"
        align="center"
        prop="address"
        width="200px"
        :show-overflow-tooltip="false"
        :cell-style="{ whiteSpace: 'normal', wordBreak: 'break-all' }"
      />
      <el-table-column label="联系人" align="center" prop="person" />
      <el-table-column label="联系电话" align="center" prop="contact" />
      <el-table-column label="是否可用" align="center" prop="isActive">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isActive" />
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="status" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_AUDIT_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
<!--      <el-table-column label="备注" align="center" prop="remark" />-->
      <el-table-column label="所属品牌" align="center" prop="brand">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BRAND" :value="scope.row.brand" />
        </template>
      </el-table-column>
      <el-table-column label="使用次数" align="center" prop="count" />
<!--      <el-table-column-->
<!--        label="创建时间"-->
<!--        align="center"-->
<!--        prop="createTime"-->
<!--        :formatter="dateFormatter"-->
<!--        width="180px"-->
<!--      />-->
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:big-customer-address:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:big-customer-address:delete']"
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
  <BigCustomerAddressForm ref="formRef" @success="getList" />
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  <CustomerDetailForm
    ref="detailRef"
    v-model:visible="detailVisible"
    :customer="currentCustomer"
  />
</template>

<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { BigCustomerAddressApi, BigCustomerAddressVO } from '@/api/fx/bigcustomeraddress'
import BigCustomerAddressForm from './BigCustomerAddressForm.vue'
import ConsigneeSelect from "@/components/Consignee/ConsigneeSelect.vue";
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue";
import {CustomerInfoVO} from "@/api/fx/customerinfo";
import CustomerDetailForm from "@/views/fx/customerinfo/CustomerDetailForm.vue";

/** 分销大客户地址 列表 */
defineOptions({ name: 'BigCustomerAddress' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<BigCustomerAddressVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  customerId: undefined,
  customerName: undefined,
  province: undefined,
  city: undefined,
  district: undefined,
  address: undefined,
  person: undefined,
  contact: undefined,
  isActive: undefined,
  status: undefined,
  remark: undefined,
  brand: undefined,
  count: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await BigCustomerAddressApi.getBigCustomerAddressPage(queryParams)
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
    await BigCustomerAddressApi.deleteBigCustomerAddress(id)
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
    const data = await BigCustomerAddressApi.exportBigCustomerAddress(queryParams)
    download.excel(data, '分销大客户地址.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}
/**
 * 分销商表格
 */
const consigneeRef = ref() //收货方表格引用
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeSelectRef = ref()

const handleChange = (row) => {
  queryParams.customerId = row.id
}
/**
 选择分销商表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.customerId = data.id
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
