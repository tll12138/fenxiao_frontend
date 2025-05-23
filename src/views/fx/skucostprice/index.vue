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
      <el-form-item label="品牌" prop="brand">
        <el-input
          v-model="queryParams.brand"
          placeholder="请输入品牌"
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
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="规格" prop="value">-->
<!--        <el-input-->
<!--          v-model="queryParams.value"-->
<!--          placeholder="请输入规格"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="品类" prop="type">
        <el-select
          v-model="queryParams.type"
          placeholder="请选择品类"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_GOODS_ATTRIBUTES)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="属性" prop="paid">
        <el-select
          v-model="queryParams.paid"
          placeholder="请输入属性"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_GOODS_NATURE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="财务结算价" prop="costPrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.costPrice"-->
<!--          placeholder="请输入财务结算价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="采购成本" prop="costOtherprice">-->
<!--        <el-input-->
<!--          v-model="queryParams.costOtherprice"-->
<!--          placeholder="请输入采购成本"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="出库成本" prop="outCost">-->
<!--        <el-input-->
<!--          v-model="queryParams.outCost"-->
<!--          placeholder="请输入出库成本"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
          v-hasPermi="['fx:sku-costprice:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="warning"
          plain
          @click="handleImport"
        >
          <Icon icon="ep:upload" class="mr-5px" /> 导入
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:sku-costprice:export']"
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
      <el-table-column label="品牌" align="center" prop="brand"/>
      <el-table-column label="商品编码" align="center" prop="skuId" />
      <el-table-column label="名称" align="center" prop="name" width="300"/>
      <el-table-column label="规格" align="center" prop="value" />
      <el-table-column label="品类" align="center" prop="type" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_GOODS_ATTRIBUTES" :value="scope.row.type" />
        </template>
      </el-table-column>
      <el-table-column label="属性" align="center" prop="paid" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_GOODS_NATURE" :value="scope.row.paid" />
        </template>
      </el-table-column>
      <el-table-column label="财务结算价" align="center" prop="costPrice" />
      <el-table-column label="采购成本" align="center" prop="costOtherprice" />
      <el-table-column label="出库成本" align="center" prop="outCost" />
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
            v-hasPermi="['fx:sku-costprice:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:sku-costprice:delete']"
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
  <SkuCostpriceForm ref="formRef" @success="getList" />
  <SkuCostPriceImportForm ref="importFormRef" @success="getList" />
</template>

<script setup lang="ts">
import {getStrDictOptions, DICT_TYPE, getIntDictOptions} from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { SkuCostpriceApi, SkuCostpriceVO } from '@/api/fx/skucostprice'
import SkuCostpriceForm from './SkuCostpriceForm.vue'

/** 商品成本 列表 */
defineOptions({ name: 'SkuCostprice' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<SkuCostpriceVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  brand: undefined,
  skuId: undefined,
  name: undefined,
  value: undefined,
  type: undefined,
  paid: undefined,
  costPrice: undefined,
  costOtherprice: undefined,
  outCost: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 导入 */
const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await SkuCostpriceApi.getSkuCostpricePage(queryParams)
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
    await SkuCostpriceApi.deleteSkuCostprice(id)
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
    const data = await SkuCostpriceApi.exportSkuCostprice(queryParams)
    download.excel(data, '商品成本.xls')
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
