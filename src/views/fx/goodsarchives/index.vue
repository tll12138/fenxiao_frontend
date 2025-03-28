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
      <el-form-item label="商品编码" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入商品编码"
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
<!--      <el-form-item label="商品简称" prop="shortName">-->
<!--        <el-input-->
<!--          v-model="queryParams.shortName"-->
<!--          placeholder="请输入商品简称"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="标准价" prop="salePrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.salePrice"-->
<!--          placeholder="请输入标准价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="成本价" prop="costPrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.costPrice"-->
<!--          placeholder="请输入成本价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="规格" prop="propertiesValue">
        <el-input
          v-model="queryParams.propertiesValue"
          placeholder="请输入规格"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="分类" prop="category">-->
<!--        <el-input-->
<!--          v-model="queryParams.category"-->
<!--          placeholder="请输入分类"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="虚拟分类" prop="vcName">-->
<!--        <el-input-->
<!--          v-model="queryParams.vcName"-->
<!--          placeholder="请输入虚拟分类"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="商品属性" prop="itemType">
        <el-input
          v-model="queryParams.itemType"
          placeholder="请输入商品属性"
          clearable
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="单位" prop="unit">-->
<!--        <el-input-->
<!--          v-model="queryParams.unit"-->
<!--          placeholder="请输入单位"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="商品类型" prop="skuType">
        <el-input
          v-model="queryParams.skuType"
          placeholder="请输入商品类型"
          clearable
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="修改时间" prop="modified">-->
<!--        <el-date-picker-->
<!--          v-model="queryParams.modified"-->
<!--          value-format="YYYY-MM-DD"-->
<!--          type="date"-->
<!--          placeholder="选择修改时间"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开票名称" prop="billingName">-->
<!--        <el-input-->
<!--          v-model="queryParams.billingName"-->
<!--          placeholder="请输入开票名称"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="品牌" prop="brand">
        <el-select
          v-model="queryParams.brand"
          placeholder="请选择关联品牌"
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
<!--      <el-form-item label="商品图片" prop="picBig">-->
<!--        <el-input-->
<!--          v-model="queryParams.picBig"-->
<!--          placeholder="请输入商品图片"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="款式编码" prop="iId">-->
<!--        <el-input-->
<!--          v-model="queryParams.iId"-->
<!--          placeholder="请输入款式编码"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="市场价" prop="marketPrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.marketPrice"-->
<!--          placeholder="请输入市场价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否启用" prop="enabled">-->
<!--        <el-select-->
<!--          v-model="queryParams.enabled"-->
<!--          placeholder="请选择是否启用"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否分销商品" prop="isFx">-->
<!--        <el-select-->
<!--          v-model="queryParams.isFx"-->
<!--          placeholder="请选择是否分销商品"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="实际成本价" prop="actualCostPrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.actualCostPrice"-->
<!--          placeholder="请输入实际成本价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="销售成本价" prop="saleCostPrice">-->
<!--        <el-input-->
<!--          v-model="queryParams.saleCostPrice"-->
<!--          placeholder="请输入销售成本价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="一级分类" prop="level1Category">-->
<!--        <el-input-->
<!--          v-model="queryParams.level1Category"-->
<!--          placeholder="请输入一级分类"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="二级分类" prop="level2Category">-->
<!--        <el-input-->
<!--          v-model="queryParams.level2Category"-->
<!--          placeholder="请输入二级分类"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="是否参与计算" prop="isCount">
        <el-select
          v-model="queryParams.isCount"
          placeholder="请选择是否参与计算"
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
      <el-form-item label="是否正装" prop="isFormal">
        <el-select
          v-model="queryParams.isFormal"
          placeholder="请选择是否正装"
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
<!--      <el-form-item label="净重(kg)" prop="weight">-->
<!--        <el-input-->
<!--          v-model="queryParams.weight"-->
<!--          placeholder="请输入净重(kg)"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="国标码" prop="scancode">-->
<!--        <el-input-->
<!--          v-model="queryParams.scancode"-->
<!--          placeholder="请输入国标码"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="是否组合商品" prop="isGroup">-->
<!--        <el-select-->
<!--          v-model="queryParams.isGroup"-->
<!--          placeholder="请选择是否组合商品"-->
<!--          clearable-->
<!--          class="!w-240px"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
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
<!--      <el-form-item label="聚水潭唯一id" prop="autoId">-->
<!--        <el-input-->
<!--          v-model="queryParams.autoId"-->
<!--          placeholder="请输入聚水潭唯一id"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          @click="openForm('create')"-->
<!--          v-hasPermi="['fx:goods-archives:create']"-->
<!--        >-->
<!--          <Icon icon="ep:plus" class="mr-5px" /> 新增-->
<!--        </el-button>-->
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:goods-archives:export']"
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
      <el-table-column label="商品编码" align="center" prop="skuId" width="130" />
      <el-table-column label="商品名称" align="center" prop="name" width="300"/>
      <el-table-column label="商品简称" align="center" prop="shortName" />
<!--      <el-table-column label="标准价" align="center" prop="salePrice" />-->
<!--      <el-table-column label="成本价" align="center" prop="costPrice" />-->
      <el-table-column label="规格" align="center" prop="propertiesValue" width="80"/>
      <el-table-column label="分类" align="center" prop="category" width="200"/>
      <el-table-column label="虚拟分类" align="center" prop="vcName" width="200"/>
      <el-table-column label="商品属性" align="center" prop="itemType" width="80"/>
<!--      <el-table-column label="单位" align="center" prop="unit" />-->
<!--      <el-table-column label="商品类型" align="center" prop="skuType" />-->
<!--      <el-table-column-->
<!--        label="修改时间"-->
<!--        align="center"-->
<!--        prop="modified"-->
<!--        :formatter="dateFormatter"-->
<!--        width="180px"-->
<!--      />-->
<!--      <el-table-column label="开票名称" align="center" prop="billingName" />-->
      <el-table-column label="品牌" align="center" prop="brand" width="150" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_BRAND" :value="scope.row.brand" />
        </template>
      </el-table-column>
<!--      <el-table-column label="商品图片" align="center" prop="picBig" />-->
<!--      <el-table-column label="款式编码" align="center" prop="iId" />-->
<!--      <el-table-column label="市场价" align="center" prop="marketPrice" />-->
<!--      <el-table-column label="是否启用" align="center" prop="enabled">-->
<!--        <template #default="scope">-->
<!--          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.enabled" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="是否分销商品" align="center" prop="isFx">-->
<!--        <template #default="scope">-->
<!--          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isFx" />-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="实际成本价" align="center" prop="actualCostPrice" />-->
<!--      <el-table-column label="销售成本价" align="center" prop="saleCostPrice" />-->
      <el-table-column label="一级分类" align="center" prop="level1Category" />
      <el-table-column label="二级分类" align="center" prop="level2Category" />
      <el-table-column label="是否参与计算" align="center" prop="isCount">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isCount" />
        </template>
      </el-table-column>
      <el-table-column label="是否正装" align="center" prop="isFormal">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isFormal" />
        </template>
      </el-table-column>
<!--      <el-table-column label="净重(kg)" align="center" prop="weight" />-->
<!--      <el-table-column label="国标码" align="center" prop="scancode" width="150"/>-->
      <el-table-column label="是否组合商品" align="center" prop="isGroup">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isGroup" />
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        label="创建时间"-->
<!--        align="center"-->
<!--        prop="createTime"-->
<!--        :formatter="dateFormatter"-->
<!--        width="180px"-->
<!--      />-->
<!--      <el-table-column label="聚水潭唯一id" align="center" prop="autoId" />-->
<!--      <el-table-column label="操作" align="center">-->
<!--        <template #default="scope">-->
<!--          <el-button-->
<!--            link-->
<!--            type="primary"-->
<!--            @click="openForm('update', scope.row.id)"-->
<!--            v-hasPermi="['fx:goods-archives:update']"-->
<!--          >-->
<!--            编辑-->
<!--          </el-button>-->
<!--          <el-button-->
<!--            link-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.row.id)"-->
<!--            v-hasPermi="['fx:goods-archives:delete']"-->
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
  <GoodsArchivesForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import { GoodsArchivesApi, GoodsArchivesVO } from '@/api/fx/goodsarchives'
import GoodsArchivesForm from './GoodsArchivesForm.vue'

/** 分销商品资料 列表 */
defineOptions({ name: 'GoodsArchives' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<GoodsArchivesVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  skuId: undefined,
  name: undefined,
  shortName: undefined,
  salePrice: undefined,
  costPrice: undefined,
  propertiesValue: undefined,
  category: undefined,
  vcName: undefined,
  itemType: undefined,
  unit: undefined,
  skuType: undefined,
  modified: undefined,
  modified: [],
  billingName: undefined,
  brand: undefined,
  picBig: undefined,
  iId: undefined,
  marketPrice: undefined,
  enabled: undefined,
  isFx: undefined,
  actualCostPrice: undefined,
  saleCostPrice: undefined,
  level1Category: undefined,
  level2Category: undefined,
  isCount: undefined,
  isFormal: undefined,
  weight: undefined,
  scancode: undefined,
  isGroup: undefined,
  createTime: [],
  autoId: undefined,
  warehouseCode: 1,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await GoodsArchivesApi.getGoodsArchivesPage(queryParams)
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
    await GoodsArchivesApi.deleteGoodsArchives(id)
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
    const data = await GoodsArchivesApi.exportGoodsArchives(queryParams)
    download.excel(data, '分销商品资料.xls')
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
