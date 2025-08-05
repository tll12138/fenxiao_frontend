<template>
  <Dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
    :is="false"
    width="1100"
  >
    <ContentWrap>
      <el-table
        ref="fromAccountRef"
        :data="fromAccountList"
        style="width: 100%"
        @row-click="setCurrent"

      >
        <el-table-column label="打款账户号" align="center" prop="account" />
        <el-table-column label="打款方名称" align="center" prop="accountName" />
        <el-table-column label="所属分销商" align="center" prop="customerName" >
          <template #default="scope">
            <el-link type="primary" @click="handleViewDetail(scope.row.customerId)">
              {{ scope.row.customerName}}
            </el-link>
          </template>
        </el-table-column>
        <el-table-column label="账户类型" align="center" prop="accountType" >
          <template #default="scope">
            <dict-tag :type="DICT_TYPE.ACCOUNT_TYPE" :value="scope.row.isActive" />
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
import {FromAccountApi, FromAccountVO} from "@/api/fx/fromaccount";

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
  account: undefined,
  customerId: undefined,
  customerName: undefined,
  accountType: undefined,
  remark: undefined,
  isActive: undefined,
  totalNum: undefined,
  totalAmt: undefined,
  accountName: undefined,
  accountId: undefined,
  createTime: [],
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const fromAccountList = ref<FromAccountVO[]>()
const companyMap = ref(new Map<number, string>())


const open = async (customerId?: string) => {
  dialogVisible.value = true;
  dialogTitle.value = '选择打款账户';
  queryParams.customerId = customerId;
  await getList();
};
const getList = async () => {
  formLoading.value = true
  try {
    const data = await FromAccountApi.getFromAccountPage(queryParams)
    fromAccountList.value = data.list
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

const fromAccountRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: FromAccountVO) => {
  dialogVisible.value = false
  emit('click-row',row)
}

// 添加响应式变量
const detailVisible = ref(false)
const currentCustomer = ref('')
const detailRef = ref()

// 添加查看详情方法
const handleViewDetail = (customer: string) => {
  currentCustomer.value = customer
  detailVisible.value = true
  // 如果需要主动加载数据，可以调用：
  detailRef.value.openById(customer)
}


defineExpose({open}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.consignee .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

