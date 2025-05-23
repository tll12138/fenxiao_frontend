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
      <el-form-item label="产品编码" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入产品编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="客户等级" prop="distributorLevel">
        <el-select
          v-model="queryParams.distributorLevel"
          placeholder="请选择客户等级"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入产品名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="品牌" prop="brandId">
        <el-select
          v-model="queryParams.brandId"
          placeholder="请选择品牌"
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
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['fx:pricelist:create']"
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
          v-hasPermi="['fx:pricelist:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="产品编码" align="center" prop="skuId" />
      <el-table-column label="规格" align="center" prop="category" />
      <el-table-column label="销售最低价" align="center" prop="saleprice" />
      <el-table-column label="客户等级" align="center" prop="distributorLevel">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="scope.row.distributorLevel" />
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="name" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:pricelist:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:pricelist:delete']"
          >
            删除
          </el-button>
          <el-button
            link
            type="primary"
            @click="handleUpdateAllCustomers(scope.row.id)"
            v-hasPermi="['fx:pricelist:update']"
          >
            更新到所有客商
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
  <PricelistForm ref="formRef" @success="getList" />
  <PriceBaseListImportForm ref="importFormRef" @success="getList" />
</template>

<script setup lang="ts">
import download from '@/utils/download'
import { PricelistApi, PricelistVO } from '@/api/fx/pricelist'
import PricelistForm from './PricelistBaseForm.vue'
import {DICT_TYPE, getIntDictOptions, getStrDictOptions} from "@/utils/dict";

/** 分销价格对照 列表 */
defineOptions({ name: 'Pricelist' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

/** 导入 */
const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
}


const currentPage = ref(1)
const pageSize = ref(20)
const loading = ref(true) // 列表的加载中
const list = ref<PricelistVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  customer: undefined,
  skuId: undefined,
  category: undefined,
  saleprice: undefined,
  distributorLevel: undefined,
  name: undefined,
  isNormal: undefined,
  brand: undefined,
  brandId: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  queryParams.isNormal=1
  try {
    const data = await PricelistApi.getPricelistPage(queryParams)
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
    await PricelistApi.deletePricelist(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 更新到所有客商按钮操作 */
const handleUpdateAllCustomers = async (id: number) => {
  try {
    // 开始更新
    await PricelistApi.processPriceUpdate(id)
    message.success('更新成功')
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
    const data = await PricelistApi.exportPricelist(queryParams)
    download.excel(data, '分销商品基础价格.xls')
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
