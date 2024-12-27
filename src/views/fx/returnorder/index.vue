<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form class="-mb-15px" :model="queryParams" ref="queryFormRef" :inline="true" label-width="78px">
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
      <el-form-item label="退货方" prop="returnUserId">
        <el-input v-model="queryParams.returnUserId" placeholder="请输入退货方" clearable @keyup.enter="handleQuery"
          class="!w-240px" />
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
      <el-table-column label="原销售单" align="center" prop="originOrder" />
      <el-table-column label="退货方" align="center" prop="returnUserName" />
      <el-table-column label="物流单号" align="center" prop="logisticsNumber" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="总退货金额" align="center" prop="totalReturnAmount" />
      <el-table-column label="总退货数量" align="center" prop="totalReturnQuantity" />
      <el-table-column label="创建者" align="center" prop="creator" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <router-link :to="'/fx/returnorder/create?id=' + scope.row.id">
            <el-button @click.stop v-if="scope.row.orderStatus === 0" link type="primary"
              v-hasPermi="['fx:orders-info:update']">
              编辑
            </el-button>
          </router-link>
          <el-button link type="danger" @click="handleDelete(scope.row.id)" v-hasPermi="['fx:return-order:delete']">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :total="total" v-model:page="queryParams.pageNo" v-model:limit="queryParams.pageSize"
      @pagination="getList" />
  </ContentWrap>
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { ReturnOrderApi, ReturnOrderVO } from '@/api/fx/returnorder'
import ReturnOrderForm from './create.vue'

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

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
