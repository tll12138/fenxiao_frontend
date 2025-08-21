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
      ref="consigneeRef"
      class="consignee"
      :data="billingInfoList"
      style="width: 100%"
      @row-click="setCurrent"

    >
      <el-table-column property="company" label="购方名称" />
      <el-table-column property="tax" label="纳税人识别号" />
      <el-table-column property="email" label="发送邮箱" />
      <el-table-column property="bank" label="开户行及账号" align="center" width="220" />
      <el-table-column property="address" label="地址及电话" />
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
import { ElTable } from 'element-plus';
import {BillingInfoApi,BillingInfoVO} from "@/api/fx/billinginfo";

defineOptions({ name: 'BillingInfoTable' })
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
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const billingInfoList = ref<BillingInfoVO[]>()
const customerMap = ref(new Map<number, string>())


const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择开票信息'
  await getList()
}
const getList = async () => {
  formLoading.value = true
  try {
    const data = await BillingInfoApi.getBillingInfoPage(queryParams)
    billingInfoList.value = data.list
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
const setCurrent = (row: BillingInfoVO) => {
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

