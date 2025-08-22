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
              <el-input
                v-model="queryParams.orderId"
                placeholder="请输入单据编号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
<!--          <ElCol :offset="1" :span="8">-->
<!--            <el-form-item label="单据时间" prop="orderDate">-->
<!--              <el-date-picker-->
<!--                v-model="queryParams.orderDate"-->
<!--                value-format="YYYY-MM-DD HH:mm:ss"-->
<!--                type="daterange"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"-->
<!--                class="!w-240px"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </ElCol>-->
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
        ref="tableRef"
        class="consignee"
        :data="ordersInfoList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="orderId" label="单据编号" />
        <el-table-column property="orderDate" label="单据日期" />
        <el-table-column property="supplierId" label="销售商" >
          <template #default="scope">
            <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.supplierId" />
          </template>
        </el-table-column>
        <el-table-column property="receiveSupplierId" label="收货经销商" align="center" width="220">
          <template #default="scope">
            <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="scope.row.receiveSupplierId" />
          </template>
        </el-table-column>
<!--        <el-table-column property="distributorId" label="收货方" />-->
        <el-table-column property="salesAmount" label="销售金额" />
        <el-table-column property="sendQuantity" label="发货数量" />
      </el-table>
      <Pagination
        :total="total"
        v-model:page="queryParams.pageNo"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </ContentWrap>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import {DICT_TYPE, getIntDictOptions} from "@/utils/dict";
import {SubCompanyInfoApi} from "@/api/fx/subcompanyinfo";
import {OrdersInfoApi, OrdersInfoVO} from "@/api/fx/ordersinfo";

defineOptions({ name: 'SaleTable' })
const props = defineProps<{
  total?: number
  selectedIds?: number[] // 已选择的ID列表
  customerId?: number
}>()

const emit = defineEmits<{
  (e: 'confirm', selected: OrdersInfoVO[]): void
}>()

const total = ref(props.total || 0)
const queryParams = reactive({
  pageNo: 1,
  pageSize: 100,
  orderId: undefined,
  orderDate: undefined,
  receiveSupplierId: undefined,
  customerId: undefined
})
const dialogVisible = ref(false)
const dialogTitle = ref('选择销售单')
const formLoading = ref(false)
const ordersInfoList = ref<OrdersInfoVO[]>([])
const companyMap = ref(new Map<number, string>())
const tableRef = ref<InstanceType<typeof ElTable>>()
const selectedRows = ref<OrdersInfoVO[]>([])

// 打开弹窗并初始化已选数据
const open = async () => {
  dialogVisible.value = true
  await getCompanyList()
  await getList()
  // 回显已选择的数据
  nextTick(() => {
    if (props.selectedIds?.length && ordersInfoList.value.length) {
      ordersInfoList.value.forEach(row => {
        if (props.selectedIds?.includes(row.id as number)) {
          tableRef.value?.toggleRowSelection(row, true)
        }
      })
    }
  })
}
// 处理已选行勾选
const handleSelectedRows = () => {
  if (!tableRef.value || !props.selectedIds?.length) return;

  // 清空现有选择
  tableRef.value.clearSelection();

  // 勾选已选择的行
  ordersInfoList.value.forEach(row => {
    if (props.selectedIds?.includes(row.id as number)) {
      tableRef.value?.toggleRowSelection(row, true);
    }
  });
};

const getCompanyList = async () => {
  const subCompanyLis = await SubCompanyInfoApi.getSubCompanyInfoList()
  subCompanyLis.forEach((item) => {
    companyMap.value.set(item.id, item.companyName as string)
  })
}

const getList = async () => {
  formLoading.value = true;
  try {
    console.log('props.customerId', props.customerId)
    queryParams.customerId = props.customerId
    const data = await OrdersInfoApi.getOrdersInfoPage(queryParams);
    console.log(data);
    ordersInfoList.value = data.list;
    total.value = data.total;
    // 数据加载完成后执行勾选
    nextTick(handleSelectedRows);
  } finally {
    formLoading.value = false;
  }
};
watch(
  () => props.selectedIds,
  () => {
    queryParams.customerId = props.customerId
    nextTick(handleSelectedRows);
  },
  { deep: true }
);

const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

const resetQuery = () => {
  queryParams.orderId = undefined
  queryParams.orderDate = undefined
  queryParams.receiveSupplierId = undefined
  handleQuery()
}

// 处理选择变化
const handleSelectionChange = (rows: OrdersInfoVO[]) => {
  selectedRows.value = rows
}

// 确认选择
const handleConfirm = () => {
  emit('confirm', selectedRows.value)
  dialogVisible.value = false
}

defineExpose({ open })
</script>

<style>
.consignee .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>
