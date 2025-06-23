<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" :inline="true" label-width="80px">
      <el-form-item label="单据编号" prop="orderId">
        <el-input v-model="queryParams.orderId" placeholder="请输入单据编号" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>
      <el-form-item label="单据状态" prop="orderStatus">
        <el-select style="width: 100%" v-model="queryParams.orderStatus" placeholder="请选择是否传erp" clearable
          class="!w-240px">
          <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_ORDER_STATUS)" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="单据日期" prop="orderDate">
        <el-date-picker v-model="queryParams.orderDate" value-format="YYYY-MM-DD HH:mm:ss" type="daterange"
          start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]" class="!w-240px" />
      </el-form-item>

      <el-form-item label="原销售单" prop="originOrder">
        <el-input v-model="queryParams.originOrder" placeholder="请输入原销售单" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>
      <el-form-item label="退货方" prop="returnUserId" label-width="80px">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="queryParams.returnUserId"
          @update:modelValue="handleChange"
        />
      </el-form-item>

      <el-form-item label="物流单号" prop="logisticsNumber">
        <el-input v-model="queryParams.logisticsNumber" placeholder="请输入物流单号" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
      </el-form-item>

      <el-form-item label="传erp时间" prop="toErpTime">
        <el-date-picker v-model="queryParams.toErpTime" value-format="YYYY-MM-DD HH:mm:ss" type="daterange"
          start-placeholder="开始日期" end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]" class="!w-240px" />
      </el-form-item>
      <el-form-item label="是否传erp" prop="isToErp">
        <el-select style="width: 100%" v-model="queryParams.isToErp" placeholder="请选择是否传erp" clearable class="!w-240px">
          <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_IS_2_ERP)" :key="dict.value" :label="dict.label"
            :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery">
          <Icon icon="ep:search" class="mr-5px" /> 搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon icon="ep:refresh" class="mr-5px" /> 重置
        </el-button>
        <router-link to="/fx/returnorder/create">
          <el-button class="ml-3" type="primary" plain v-hasPermi="['fx:return-order:create']">
            <Icon icon="ep:plus" class="mr-5px" /> 新增
          </el-button>
        </router-link>
        <!--        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:return-order:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>-->
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="单据编号" align="center" prop="orderId">
        <template #default="scope">
          <router-link :to="'/fx/returnorder/detail?id=' + scope.row.id" @click.stop>
            <el-link type="primary" style="font-size: 13px">
              {{ scope.row.orderId }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="单据日期" align="center" prop="orderDate">
        <template #default="scope">
          {{ scope.row.orderDate ? scope.row.orderDate.join('-') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="单据状态" align="center" prop="orderStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_ORDER_STATUS" :value="scope.row.orderStatus" />
        </template>
      </el-table-column>
      <el-table-column label="退货类型" align="center" prop="returnType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_RETURN_TYPE" :value="scope.row.returnType" />
        </template>
      </el-table-column>
      <el-table-column label="原销售单" align="center" prop="originOrder"  min-width="120">
        <template #default="scope">
          <router-link :to="'/fx/orders/detail?orderId=' + scope.row.originOrder" @click.stop>
            <el-link type="primary" style="font-size: 13px">
              {{ scope.row.originOrder }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="退货方" align="center" prop="returnUserName" >
        <template #default="scope">
          <el-link type="primary" @click="handleViewDetail(scope.row.returnUserId)">
            {{ scope.row.returnUserName}}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="物流单号" align="center" prop="logisticsNumber" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="总退货金额" align="center" prop="totalReturnAmount" />
      <el-table-column label="总退货数量" align="center" prop="totalReturnQuantity" />
      <el-table-column label="创建者" align="center" prop="creator" />
      <el-table-column label="操作" align="center" min-width="90">
        <template #default="scope">
          <el-button
            link
            type="primary"
            v-if="scope.row.orderStatus === 0"
            @click="handleSubmit(scope.row.id)"
            v-hasPermi="['fx:return-order:update']">
            提交审核
          </el-button>
          <el-button
            v-if="scope.row.orderStatus === 1"
            link
            type="primary"
            @click.stop="handleCancel(scope.row)"
            v-hasPermi="['fx:return-order:update']"
          >
            取消审核
          </el-button>
          <el-button
            link type="danger"
            v-if="scope.row.orderStatus === 0"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:return-order:delete']">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
      @pagination="getList" />
  </ContentWrap>
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  <CustomerDetailForm
    ref="detailRef"
    v-model:visible="detailVisible"
    :customer="currentCustomer"
  />
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { ReturnOrderApi, ReturnOrderVO } from '@/api/fx/returnorder'
import ReturnOrderForm from './create.vue'
import {ElMessageBox} from "element-plus";
import {OrdersInfoApi} from "@/api/fx/ordersinfo";
import ConsigneeSelect from "@/components/Consignee/ConsigneeSelect.vue";
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue";
import {CustomerInfoVO} from "@/api/fx/customerinfo";
import CustomerDetailForm from "@/views/fx/customerinfo/CustomerDetailForm.vue";

/** FX 销售退货单 列表 */
defineOptions({ name: 'ReturnOrder' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<ReturnOrderVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  orderId: undefined,
  orderDate: [],
  originOrder: undefined,
  returnUserId: undefined,
  logisticsNumber: undefined,
  isToErp: undefined,
  orderStatus: undefined,
  toErpTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ReturnOrderApi.getReturnOrderPage(queryParams)
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
    await ReturnOrderApi.deleteReturnOrder(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch { }
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ReturnOrderApi.exportReturnOrder(queryParams)
    download.excel(data, 'FX 销售退货单.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

//取消审核
const handleCancel = async (row) => {
  // 二次确认
  const { value } = await ElMessageBox.prompt('请输入取消原因', '取消流程', {
    confirmButtonText: t('common.ok'),
    cancelButtonText: t('common.cancel'),
    inputPattern: /^[\s\S]*.*\S[\s\S]*$/, // 判断非空，且非空格
    inputErrorMessage: '取消原因不能为空'
  })
  // 发起取消
  const data = {
    id: row.processInstanceId,
    orderId: row.id,
    reason: value
  }
  console.log(data)
  await ReturnOrderApi.cancelProcessInstanceByStartUser(data)
  message.success('取消成功')
  // 刷新列表
  await getList()
}

const handleSubmit = async (id: number) => {
  try {
    // 二次确认
    await message.confirm('确定要提交审核吗？')
    // 发起流程
    await ReturnOrderApi.startProcessInstanceByStartUser(id)
    message.success(t('common.success'))
    // 刷新列表
    await getList()
  } catch { }
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

const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.returnUserId = data.id
}
const handleChange = (row = {}) => {
  queryParams.distributorId = row?.id //
}
const consigneeSelectRef = ref()
const consigneeRef = ref()

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
