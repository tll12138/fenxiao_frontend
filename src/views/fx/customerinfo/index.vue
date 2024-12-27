<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="auto"
    >
      <el-form-item label="供应商编号" prop="supplierId">
        <el-input
          v-model="queryParams.supplierId"
          placeholder="请输入供应商编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="分销商编号" prop="distributorNum">
        <el-input
          v-model="queryParams.distributorNum"
          placeholder="请输入分销商编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="分销商名称" prop="distributorName">
        <el-input
          v-model="queryParams.distributorName"
          placeholder="请输入分销商名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否冻结" prop="isFreeze">
        <el-select
          v-model="queryParams.isFreeze"
          placeholder="请选择是否冻结"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属子公司" prop="subCompany">
        <el-select v-model="queryParams.subCompany" placeholder="请选择子公司" clearable filterable style="width: 240px">
          <el-option
            v-for="item in subCompanyList"
            :key="item.id"
            :label="item.companyName"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="业务归属" prop="belongTo">
        <el-select
          v-model="queryParams.belongTo"
          placeholder="请选择业务归属"
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
      <el-form-item label="是否允许超额提货" prop="isExcessOrder">
        <el-select
            v-model="queryParams.isExcessOrder"
            placeholder="请选择是否允许超额提货"
            clearable
            class="!w-240px"
        >
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
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
          v-hasPermi="['fx:customer-info:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
<!--        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:customer-info:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>-->
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="分销商编号" align="center" prop="distributorNum" />
      <el-table-column label="分销商名称" align="center" prop="distributorName" />
      <el-table-column label="所属子公司" align="center" prop="subCompany" width="220px">
        <template #default="scope">
          {{companyMap?.get(scope.row.subCompany)}}
        </template>
      </el-table-column>
      <el-table-column label="分销商等级" align="center" prop="distributorLevel">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="scope.row.distributorLevel" />
        </template>
      </el-table-column>
      <el-table-column label="是否合作" align="center" prop="isCooperate">
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isCooperate" />
        </template>
      </el-table-column>
      <el-table-column label="是否冻结" align="center" prop="isFreeze">
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isFreeze" />
        </template>
      </el-table-column>
      <el-table-column label="客户渠道属性" align="center" prop="customerChannelDistribute">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_DISTRIBUTE" :value="scope.row.customerChannelDistribute" />
        </template>
      </el-table-column>
      <el-table-column label="业务属性" align="center" prop="belong">
        <template #default="scope">
          <dict-span-tag v-if="scope.row.belong" :type="DICT_TYPE.FX_BELONG" :value="scope.row.belong" />
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column label="客户类型" align="center" prop="customerType" >
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_CUSTOMER_TYPE" :value="scope.row.customerType" />
        </template>
      </el-table-column>
      <el-table-column label="允许超额提货" align="center" prop="isExcessOrder">
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.YES_NO" :value="scope.row.isExcessOrder" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:customer-info:update']"
          >
            编辑
          </el-button>
          <el-button
              link
              type="primary"
              @click="openForm('detail', scope.row.id)"
              v-hasPermi="['fx:customer-info:query']"
          >
            查看详情
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:customer-info:delete']"
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
  <CustomerInfoForm ref="formRef" @success="getList" :sub-company-list="subCompanyList" />
  <CustomerDetailForm ref="detailRef" @success="getList" :companyMap="companyMap" />
</template>

<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { CustomerInfoApi, CustomerInfoVO } from '@/api/fx/customerinfo'
import CustomerInfoForm from './CustomerInfoForm.vue'
import CustomerDetailForm from './CustomerDetailForm.vue'
import {SubCompanyInfoApi} from "@/api/fx/subcompanyinfo";
import {SubCompany} from "@/views/fx/customerinfo/data";

/** 分销商基础信息 列表 */
defineOptions({ name: 'CustomerInfo' })
import { ref } from 'vue';
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化
const loading = ref(true) // 列表的加载中
const list = ref<CustomerInfoVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  supplierId: undefined,
  distributorNum: undefined,
  distributorName: undefined,
  subCompany: undefined,
  displayName: undefined,
  belongTo: undefined,
  distributorLevel: undefined,
  isCooperate: undefined,
  isFreeze: 0,
  customerChannelDistribute: undefined,
  brand: undefined,
  customerType: undefined,
  latestOrderDate: [],
  createTime: [],
  isExcessOrder: undefined,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 添加/修改操作 */
const formRef = ref()
const detailRef = ref()
const subCompanyList = ref<SubCompany[]>([])
const companyMap = ref(new Map<number, string>())

/** 查询列表 */
const getList = async () => {
  console.log("success")
  loading.value = true
  try {
    const data = await CustomerInfoApi.getCustomerInfoPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

const getCompanyList = async () => {
  subCompanyList.value = await SubCompanyInfoApi.getSubCompanyInfoList()
  subCompanyList.value.forEach((item) => {
    companyMap.value.set(item.id, item.companyName as string)
  })
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


const openForm = (type: string, id?: number) => {
  if (type === 'detail'){
    detailRef.value.open(type, id)
  } else {
    formRef.value.open(type, id)
  }
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await CustomerInfoApi.deleteCustomerInfo(id)
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
    const data = await CustomerInfoApi.exportCustomerInfo(queryParams)
    download.excel(data, '分销商基础信息.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getCompanyList()
  getList()
})
</script>
