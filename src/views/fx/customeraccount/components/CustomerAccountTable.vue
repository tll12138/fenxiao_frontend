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
          <ElCol :offset="1" :span="8">
            <el-form-item label="分销商序号" prop="id">
              <el-input
                v-model="queryParams.id"
                placeholder="请输入分销商序号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
          <ElCol :offset="1" :span="8">
            <el-form-item label="分销商编号" prop="distributorId">
              <el-input
                v-model="queryParams.distributorId"
                placeholder="请输入分销商编号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
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
        ref="cusAccountRef"
        class="cusAccount"
        :data="customerAccountList"
        style="width: 100%"
        @row-click="setCurrent"

      >
        <el-table-column property="id" label="分销商序号" />
        <el-table-column property="distributorId" label="分销商编号" />
        <el-table-column property="distributorName" label="分销商名称" />
        <el-table-column property="company" label="业务归属">
          <template #default="scope">
            <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.company" />
          </template>
        </el-table-column>
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
import {DICT_TYPE} from "@/utils/dict";
import {CustomerAccountApi, CustomerAccountVO} from "@/api/fx/customeraccount";

defineOptions({ name: 'CustomerAccountTable' })
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
  distributorId: undefined,
  distributorName: undefined,
  id: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const customerAccountList = ref<CustomerAccountVO[]>()


const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择客商账户'
  await getList()
}
const getList = async () => {
  formLoading.value = true
  try {
    const data = await CustomerAccountApi.getCustomerAccountPage(queryParams)
    customerAccountList.value = data.list
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

const cusAccountRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: CustomerAccountVO) => {
  dialogVisible.value = false
  emit('click-row',row)
}



defineExpose({open}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.cusAccount .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

