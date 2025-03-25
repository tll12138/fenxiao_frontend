<template>
  <Dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
    width="1100"
  >
    <ContentWrap>
      <el-table
        ref="bigAddressRef"
        class="consignee"
        :data="list"
        style="width: 100%"
        @row-click="setCurrent"
      >
        <el-table-column label="地址" align="center" prop="address" />
        <el-table-column label="省份" align="center" prop="province" />
        <el-table-column label="市" align="center" prop="city" />
        <el-table-column label="区" align="center" prop="district" />
        <el-table-column label="联系人" align="center" prop="person" />
        <el-table-column label="联系电话" align="center" prop="contact" />
        <el-table-column label="使用次数" align="center" prop="count" />
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
import {BigCustomerAddressApi, BigCustomerAddressVO} from "@/api/fx/bigcustomeraddress";

defineOptions({ name: 'BigAddressTable' })
const  props  = defineProps({
  id: {
    type: Number,
  }
})
watch(() => props.id, () => {
  queryParams.customerId = props.id
  getList()
})
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 5,
  id: undefined,
  customerId: props.id,
  province: undefined,
  city: undefined,
  district: undefined,
  address: undefined,
  person: undefined,
  contact: undefined,
  count: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const list = ref<BigCustomerAddressVO[]>([])

const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择地址'
  list.value = undefined;
  await getList()
}

const getList = async () => {
  formLoading.value = true
  try {
    if (!queryParams.customerId){
      return
    }
    const data = await BigCustomerAddressApi.getBigCustomerAddressPage(queryParams)
    list.value = data.list
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

const bigAddressRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: BigCustomerAddressVO) => {
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

