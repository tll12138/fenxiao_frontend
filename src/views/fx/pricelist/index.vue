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
      <el-form-item label="客户" prop="customer">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="queryParams.customer"
          @update:modelValue="handleChange"
        />
      </el-form-item>
      <el-form-item label="产品编码" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入产品编码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="规格" prop="category">-->
<!--        <el-input-->
<!--          v-model="queryParams.category"-->
<!--          placeholder="请输入规格"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="销售最低价" prop="saleprice">-->
<!--        <el-input-->
<!--          v-model="queryParams.saleprice"-->
<!--          placeholder="请输入销售最低价"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
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
<!--      <el-form-item label="是否基础类型" prop="isNormal">-->
<!--        <el-select-->
<!--          v-model="queryParams.isNormal"-->
<!--          placeholder="请选择是否基础类型"-->
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
    <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
<!--      <el-table-column label="序号" align="center" prop="id" />-->
      <el-table-column label="客户" align="center" prop="customer" />
      <el-table-column label="产品编码" align="center" prop="skuId" />
      <el-table-column label="规格" align="center" prop="category" />
      <el-table-column label="销售最低价" align="center" prop="saleprice" />
      <el-table-column label="客户等级" align="center" prop="distributorLevel">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="scope.row.distributorLevel" />
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="name" />
<!--      <el-table-column label="是否基础类型" align="center" prop="isNormal">-->
<!--        <template #default="scope">-->
<!--          <dict-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isNormal" />-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="品牌" align="center" prop="brandId" >
        <template #default="scope">
          <dict-span-tag v-if="scope.row.brand" :type="DICT_TYPE.FX_BRAND" :value="scope.row.brandId" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter2"
        width="180px"
      />
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
  <PriceListImportForm ref="importFormRef" @success="getList" />
</template>

<script setup lang="ts">
import {dateFormatter, dateFormatter2} from '@/utils/formatTime'
import download from '@/utils/download'
import { PricelistApi, PricelistVO } from '@/api/fx/pricelist'
import PricelistForm from './PricelistForm.vue'
import {DICT_TYPE, getIntDictOptions, getStrDictOptions} from "@/utils/dict";
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";
import {CustomerInfoApi, CustomerInfoVO} from "@/api/fx/customerinfo";
import ConsigneeSelect from "@/components/Consignee/ConsigneeSelect.vue";
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue";

/** 分销价格对照 列表 */
defineOptions({ name: 'Pricelist' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const consigneeList = ref<CustomerInfoVO[]>([])
const consigneeMap = ref<Record<number, CustomerInfoVO>>({})
const currentPage = ref(1)
const pageSize = ref(20)
const loadingMore = ref(false)
const hasMore = ref(true)
const selectRef = ref()
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
  isNormal: 0,
  brandId: undefined,
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
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

/** 导入 */
const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await PricelistApi.exportPricelist(queryParams)
    download.excel(data, '分销价格对照.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}
const consigneeSelectRef = ref()
const consigneeRef = ref()

const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.customer = data.distributorName
}
const handleChange = (row = {}) => {
  queryParams.customer = row?.distributorName //
}

/** 处理下拉框显示/隐藏 */
const handleSelectVisible = (visible: boolean) => {
  if (visible) {
    // 重置分页参数
    currentPage.value = 1
    hasMore.value = true
    consigneeList.value = []
    loadConsigneeList()

    // 添加滚动监听
    nextTick(() => {
      const popper = document.querySelector('.customer-select-popper .el-select-dropdown__wrap')
      if (popper) {
        popper.addEventListener('scroll', handleScroll)
      }
    })
  } else {
    // 移除滚动监听
    const popper = document.querySelector('.customer-select-popper .el-select-dropdown__wrap')
    if (popper) {
      popper.removeEventListener('scroll', handleScroll)
    }
  }
}
/** 处理滚动事件 */
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  // 滚动到底部时加载更多（预留5px缓冲）
  if (scrollHeight - scrollTop <= clientHeight + 5 && !loadingMore.value && hasMore.value) {
    loadConsigneeList()
  }
}

/** 加载客户列表 */
const loadConsigneeList = async () => {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true

  try {
    const res = await CustomerInfoApi.getCustomerInfoPage({
      pageNo: currentPage.value,
      pageSize: pageSize.value
    })

    // 合并数据
    consigneeList.value = [...consigneeList.value, ...res.list]
    // 更新映射表
    consigneeMap.value = consigneeList.value.reduce((map, item) => {
      map[item.id] = item
      return map
    }, new Map());
    // 判断是否还有更多
    hasMore.value = res.list.length >= pageSize.value
    currentPage.value++
  } finally {
    loadingMore.value = false
  }
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
<style>
/* 添加下拉框滚动条样式 */
.customer-select-popper .el-select-dropdown__wrap {
  max-height: 400px;
  overflow-y: auto;
}
</style>
