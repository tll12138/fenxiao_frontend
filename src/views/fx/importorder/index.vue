<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="120px"
    >
<!--      <el-form-item label="商品数量" prop="productQuantity">-->
<!--        <el-input-->
<!--          v-model="queryParams.productQuantity"-->
<!--          placeholder="请输入商品数量"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="省份" prop="province">-->
<!--        <el-input-->
<!--          v-model="queryParams.province"-->
<!--          placeholder="请输入省份"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="城市" prop="city">-->
<!--        <el-input-->
<!--          v-model="queryParams.city"-->
<!--          placeholder="请输入城市"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="订单编号" prop="soId">
        <el-input
          v-model="queryParams.soId"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品编码" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入商品编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="区县" prop="district">-->
<!--        <el-input-->
<!--          v-model="queryParams.district"-->
<!--          placeholder="请输入区县"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="详细地址" prop="address">-->
<!--        <el-input-->
<!--          v-model="queryParams.address"-->
<!--          placeholder="请输入详细地址"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="收货人" prop="contact">
        <el-input
          v-model="queryParams.contact"
          placeholder="请输入收货人"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="收货电话" prop="mobile">-->
<!--        <el-input-->
<!--          v-model="queryParams.mobile"-->
<!--          placeholder="请输入收货电话"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="是否发货" prop="isShipped">
        <el-select
          v-model="queryParams.isShipped"
          placeholder="请选择是否发货"
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
      <el-form-item label="是否生成销售单" prop="isSalesOrderGenerated">
        <el-select
          v-model="queryParams.isSalesOrderGenerated"
          placeholder="请选择是否生成销售单"
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
      <el-form-item label="客商" prop="customerid">
        <el-input
          v-model="queryParams.customerid"
          placeholder="请输入客商"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="发货仓" prop="warehouseid">
        <el-input
          v-model="queryParams.warehouseid"
          placeholder="请输入发货仓"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="销售单号" prop="saleno">-->
<!--        <el-input-->
<!--          v-model="queryParams.saleno"-->
<!--          placeholder="请输入销售单号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="快递公司" prop="expressCompany">
        <el-input
          v-model="queryParams.expressCompany"
          placeholder="请输入快递公司"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="快递单号" prop="trackingNumber">-->
<!--        <el-input-->
<!--          v-model="queryParams.trackingNumber"-->
<!--          placeholder="请输入快递单号"-->
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
      <el-form-item label="业务归属" prop="businessAffiliation">
        <el-select
          v-model="queryParams.businessAffiliation"
          placeholder="请输入业务归属"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BELONG)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="单价" prop="price">-->
<!--        <el-input-->
<!--          v-model="queryParams.price"-->
<!--          placeholder="请输入单价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="无痕发货" prop="isTraceless">-->
<!--        <el-input-->
<!--          v-model="queryParams.isTraceless"-->
<!--          placeholder="请输入无痕发货"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="收款经销商" prop="payingDistributorId">-->
<!--        <el-input-->
<!--          v-model="queryParams.payingDistributorId"-->
<!--          placeholder="请输入收款经销商"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="快递公司ID" prop="expressCompanyId">-->
<!--        <el-input-->
<!--          v-model="queryParams.expressCompanyId"-->
<!--          placeholder="请输入快递公司ID"-->
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
          v-hasPermi="['fx:import-order:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="warning"
          plain
          @click="handleImport"
          v-hasPermi="['fx:import-order:import']"
        >
          <Icon icon="ep:upload" class="mr-5px" /> 导入
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:import-order:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
        <el-button
          type="danger"
          plain
          @click="handleGenerateSales"
          v-hasPermi="['fx:import-order:update']"
        >
          <Icon icon="ep:check" class="mr-5px" /> 生成销售单
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="false">
<!--      <el-table-column label="主键" align="center" prop="id" />-->
      <el-table-column label="订单编号" align="center" prop="soId" />
      <el-table-column label="客商" align="center" prop="customerid" />
      <el-table-column label="商品编码" align="center" prop="skuId" />
      <el-table-column label="商品数量" align="center" prop="productQuantity" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="发货仓" align="center" prop="warehouseid" />
      <!--      <el-table-column label="省份" align="center" prop="province" />-->
      <!--      <el-table-column label="城市" align="center" prop="city" />-->
      <!--      <el-table-column label="区县" align="center" prop="district" />-->
      <!--      <el-table-column label="详细地址" align="center" prop="address" />-->
      <el-table-column label="收货人" align="center" prop="contact" />
      <el-table-column
        label="业务归属"
        align="center"
        prop="businessAffiliation"
      >
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_BELONG" :value="scope.row.businessAffiliation" />
        </template>
      </el-table-column>
      <el-table-column label="收款经销商" align="center" prop="payingDistributorId" >
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.payingDistributorId" />
        </template>
      </el-table-column>
      <el-table-column label="快递公司" align="center" prop="expressCompany" />
      <el-table-column label="是否生成销售单" align="center" prop="isSalesOrderGenerated">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isSalesOrderGenerated" />
        </template>
      </el-table-column>
      <el-table-column label="销售单号" align="center" prop="saleno" />
      <el-table-column label="是否发货" align="center" prop="isShipped">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isShipped" />
        </template>
      </el-table-column>
      <el-table-column label="快递单号" align="center" prop="trackingNumber" />
      <el-table-column label="无痕发货" align="center" prop="isTraceless" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isTraceless" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
<!--      <el-table-column label="收货电话" align="center" prop="mobile" />-->
<!--      <el-table-column label="快递公司ID" align="center" prop="expressCompanyId" />-->
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:import-order:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:import-order:delete']"
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
  <ImportOrderForm ref="formRef" @success="getList" />
  <!-- 客商代发导入对话框 -->
  <OrderImportForm ref="importFormRef" @success="getList" />
</template>

<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { ImportOrderApi, ImportOrderVO } from '@/api/fx/importorder'
import ImportOrderForm from './ImportOrderForm.vue'

/** 客商代发单 列表 */
defineOptions({ name: 'ImportOrder' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<ImportOrderVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  productQuantity: undefined,
  province: undefined,
  city: undefined,
  soId: undefined,
  skuId: undefined,
  district: undefined,
  address: undefined,
  contact: undefined,
  mobile: undefined,
  isShipped: undefined,
  isSalesOrderGenerated: undefined,
  customerid: undefined,
  warehouseid: undefined,
  saleno: undefined,
  expressCompany: undefined,
  trackingNumber: undefined,
  remark: undefined,
  businessAffiliation: undefined,
  price: undefined,
  isTraceless: undefined,
  payingDistributorId: undefined,
  expressCompanyId: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中
const generateLoading = ref(false) // 生成销售单的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ImportOrderApi.getImportOrderPage(queryParams)
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

/** 用户导入 */
const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
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
    await ImportOrderApi.deleteImportOrder(id)
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
    const data = await ImportOrderApi.exportImportOrder(queryParams)
    download.excel(data, '客商代发单.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}
/** 生成销售单按钮操作 */
const handleGenerateSales = async () => {
  try {
    generateLoading.value = true
    // 二次确认
    await message.confirm(
      "1.如果存在组合商品，请先确认该组合商品已经同步OA。" +
      "2.确保客商账户余额充足或者允许超额发货")
    // 发起生成销售单
    await ImportOrderApi.generateSalesOrder()
    message.success(t('common.updateSuccess'))
  } catch {
  } finally {
    generateLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
