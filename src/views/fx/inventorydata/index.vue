<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="90px"
    >
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
      <el-form-item label="商品编码" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入商品编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="条形码" prop="scanCode">-->
<!--        <el-input-->
<!--          v-model="queryParams.scanCode"-->
<!--          placeholder="请输入条形码"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="商品资料id" prop="goodId">
        <el-input
          v-model="queryParams.goodId"
          placeholder="请输入商品资料id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-260px"
        />
      </el-form-item>
<!--      <el-form-item label="良品库存" prop="qty">-->
<!--        <el-input-->
<!--          v-model="queryParams.qty"-->
<!--          placeholder="请输入良品库存"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="次品库存" prop="defectiveQty">-->
<!--        <el-input-->
<!--          v-model="queryParams.defectiveQty"-->
<!--          placeholder="请输入次品库存"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input
          v-model="queryParams.warehouseName"
          placeholder="请输入仓库名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="仓库类型" prop="type">-->
<!--        <el-select-->
<!--          v-model="queryParams.type"-->
<!--          placeholder="请选择仓库类型"-->
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
      <el-form-item label="所属仓库" prop="warehouseId">
        <el-input
          v-model="queryParams.warehouseId"
          placeholder="请输入所属仓库"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="仓库编码" prop="warehouseCode">
        <el-input
          v-model="queryParams.warehouseCode"
          placeholder="请输入仓库编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="销售出库数" prop="saleQty">-->
<!--        <el-input-->
<!--          v-model="queryParams.saleQty"-->
<!--          placeholder="请输入销售出库数"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="数据渠道" prop="channel">
        <el-input
          v-model="queryParams.channel"
          placeholder="请输入数据渠道"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入商品品牌"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="规格" prop="value">
        <el-input
          v-model="queryParams.value"
          placeholder="请输入规格"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          @click="openForm('create')"-->
<!--          v-hasPermi="['fx:inventory-data:create']"-->
<!--        >-->
<!--          <Icon icon="ep:plus" class="mr-5px" /> 新增-->
<!--        </el-button>-->
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:inventory-data:export']"
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
<!--      <el-table-column label="创建时间" align="center" prop="createTime" />-->
      <el-table-column label="商品编码" align="center" prop="skuId" />
      <el-table-column label="商品名称" align="center" prop="name" />
<!--      <el-table-column label="条形码" align="center" prop="scanCode" />-->
<!--      <el-table-column label="商品资料id" align="center" prop="goodId" />-->
<!--      <el-table-column label="良品库存" align="center" prop="qty" />-->
<!--      <el-table-column label="次品库存" align="center" prop="defectiveQty" />-->
      <el-table-column label="仓库编码" align="center" prop="warehouseCode" />
      <el-table-column label="仓库名称" align="center" prop="warehouseName" />
      <el-table-column label="仓库类型" align="center" prop="type" />
<!--      <el-table-column label="所属仓库" align="center" prop="warehouseId" />-->
<!--      <el-table-column label="销售出库数" align="center" prop="saleQty" />-->
      <el-table-column label="数据渠道" align="center" prop="channel" />
      <el-table-column label="商品品牌" align="center" prop="brand" />
      <el-table-column label="规格" align="center" prop="value" />
<!--      <el-table-column label="操作" align="center">-->
<!--        <template #default="scope">-->
<!--          <el-button-->
<!--            link-->
<!--            type="primary"-->
<!--            @click="openForm('update', scope.row.id)"-->
<!--            v-hasPermi="['fx:inventory-data:update']"-->
<!--          >-->
<!--            编辑-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            link-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.row.id)"-->
<!--            v-hasPermi="['fx:inventory-data:delete']"-->
<!--          >-->
<!--            删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
  <InventoryDataForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { InventoryDataApi, InventoryDataVO } from '@/api/fx/inventorydata'
import InventoryDataForm from './InventoryDataForm.vue'

/** 分销商品库存 列表 */
defineOptions({ name: 'InventoryData' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<InventoryDataVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  createTime: [],
  skuId: undefined,
  scanCode: undefined,
  goodId: undefined,
  qty: undefined,
  defectiveQty: undefined,
  warehouseName: undefined,
  type: undefined,
  warehouseId: undefined,
  warehouseCode: undefined,
  saleQty: undefined,
  channel: undefined,
  brand: undefined,
  value: undefined,
  name: undefined,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await InventoryDataApi.getInventoryDataPage(queryParams)
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
    await InventoryDataApi.deleteInventoryData(id)
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
    const data = await InventoryDataApi.exportInventoryData(queryParams)
    download.excel(data, '分销商品库存.xls')
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
