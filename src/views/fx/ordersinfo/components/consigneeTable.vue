<template>
  <Dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
    :is="false"
    width="1100"
  >
    <ContentWrap>
      <el-form
        class="-mb-15px"
        :model="queryParams"
        ref="queryFormRef"
        :inline="true"
        label-width="88px"
      >
        <ElRow>
          <ElCol :span="8">
            <el-form-item label="分销商名称" prop="distributorName">
              <el-input
                v-model="queryParams.distributorName"
                placeholder="请输入分销商名称"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
          <ElCol :offset="1" :span="8">
            <el-form-item label="分销商编号" prop="distributorNum">
              <el-input
                v-model="queryParams.distributorNum"
                placeholder="请输入分销商编号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
          <ElCol :offset="1" :span="6">
              <el-form-item>
                <el-button @click="handleQuery">
                  <Icon icon="ep:search" class="mr-5px"/>
                  搜索
                </el-button>
                <el-button @click="resetQuery">
                  <Icon icon="ep:refresh" class="mr-5px"/>
                  重置
                </el-button>
            </el-form-item>
          </ElCol>
        </ElRow>
      </el-form>
    </ContentWrap>
    <ContentWrap>
    <el-table
      ref="consigneeRef"
      class="consignee"
      :data="consigneeList"
      style="width: 100%"
      @row-click="setCurrent"

    >
      <el-table-column property="distributorName" label="分销商名称" />
      <el-table-column property="distributorLevel" label="分销商等级" >
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="scope.row.distributorLevel" />
        </template>
      </el-table-column>
      <el-table-column property="distributorNum" label="分销商编号" />
      <el-table-column property="subCompany" label="所属子公司" align="center" width="220">
        <template #default="scope">
          {{ companyMap.get(scope.row.subCompany) }}
        </template>
      </el-table-column >
      <el-table-column property="belongTo" label="业务归属">
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_BELONG" :value="scope.row.belongTo" />
        </template>
      </el-table-column>
      <el-table-column property="customerChannelDistribute" label="渠道" >
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_CHANNEL" :value="scope.row.customerChannelDistribute" />
        </template>
      </el-table-column>
      <el-table-column property="latestOrderDate" label="最近下单日期" />
    </el-table>
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    </ContentWrap>
  </Dialog>

</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import {CustomerInfoApi, CustomerInfoVO} from "@/api/fx/customerinfo";
import {DICT_TYPE} from "@/utils/dict";
import {ref} from "vue";
import Create from "diagram-js/lib/features/create/Create";
import {SubCompanyInfoApi} from "@/api/fx/subcompanyinfo";

defineOptions({ name: 'ConsigneeTable' })
const props = defineProps({
  total:{
    type: Number,
    default: 0
  }
})
const total = ref(props.total) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  distributorNum: undefined,
  distributorName: undefined,
  distributorLevel: undefined,
  subCompany: undefined,
  belongTo: undefined,
  customerChannelDistribute: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const consigneeList = ref<CustomerInfoVO[]>()
const companyMap = ref(new Map<number, string>())


const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择收货方'
  await getCompanyList()
  // consigneeList.value = props.list
  await getList()
}
const getCompanyList = async () => {
  const subCompanyLis = await SubCompanyInfoApi.getSubCompanyInfoList()
  subCompanyLis.forEach((item) => {
    companyMap.value.set(item.id, item.companyName as string)
  })
}
const getList = async () => {
  formLoading.value = true
  try {
    const data = await CustomerInfoApi.getCustomerInfoPage(queryParams)
    consigneeList.value = data.list
    total.value = data.total
  } finally {
    formLoading.value = false
  }
}

const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}
const queryFormRef = ref()
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

const consigneeRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: CustomerInfoVO) => {
  dialogVisible.value = false
  emit('click-row',row)
}



defineExpose({open}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.consignee .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

