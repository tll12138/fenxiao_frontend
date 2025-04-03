<template>
  <Dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
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
            <el-form-item label="单据编号" prop="orderId">
              <el-input v-model="queryParams.orderId" placeholder="请输入单据编号" />
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
        ref="orderInfoRef"
        class="consignee"
        :data="list"
        style="width: 100%"
        highlight-current-row
        @row-click="handleRowClick"
      >
        <el-table-column label="单据编号" align="center" prop="orderId" />
        <el-table-column label="销售商" align="center" prop="supplierId" />
        <el-table-column label="收货经销商" align="center" prop="receiveSupplierId" />
        <el-table-column label="收货方" align="center" prop="distributorId" />
        <el-table-column label="销售金额" align="center" prop="salesAmount" />
        <el-table-column label="订单状态" align="center" prop="orderStatus" />
        <el-table-column label="发货数量" align="center" prop="totalGoods" />
        <el-table-column label="收货人" align="center" prop="manager" />
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
import {OrdersInfoApi, OrdersInfoVO} from "@/api/fx/ordersinfo";
import {DICT_TYPE} from "@/utils/dict";

defineOptions({ name: 'OrdersInfoTable' })
const  props  = defineProps({
  modelValue: Boolean,
  id: {
    type: Number,
  }
})
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 5,
  // orderStatus: 3,
  orderId: undefined,
})
const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const list = ref<OrdersInfoVO[]>([])

const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择销售单'
  // 重置查询条件
  queryParams.orderId = undefined
  // 强制刷新数据
  await getList()
}

const getList = async () => {
  formLoading.value = true
  try {
    const data = await OrdersInfoApi.getOrdersInfoPage(queryParams)
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

const orderInfoRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['update:modelValue', 'click-row']) // 定义 success 事件，用于操作成功后的回调


// 添加以下方法
const currentRow = ref<OrdersInfoVO>()

const handleRowClick = (row: OrdersInfoVO) => {
  orderInfoRef.value!.setCurrentRow(row)
  currentRow.value = row
  // 立即关闭弹窗并传递数据
  dialogVisible.value = false
  emit('click-row', {
    id: row.id,
    orderId: row.orderId,
    orderStatus: row.orderStatus,
    orderData: row
  })
}

// 在组件挂载时自动初始化数据
onMounted(() => {
  // 初始化查询参数（如果不需要默认参数可以跳过）
  // queryParams.orderStatus = 3
  queryParams.pageNo = 1
  queryParams.pageSize = 5
  // 加载初始数据
  getList()
})

defineExpose({open}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.consignee .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

