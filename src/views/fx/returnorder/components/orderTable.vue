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
            <el-form-item label="单据编号" prop="orderId">
              <el-input
                v-model="queryParams.orderId"
                placeholder="请输入单据编号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
<!--          <ElCol :span="8">-->
<!--            <el-form-item label="收货方" prop="distributorName">-->
<!--              <el-input-->
<!--                v-model="queryParams.distributorName"-->
<!--                placeholder="请输入收货方"-->
<!--                clearable-->
<!--                class="!w-240px"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </ElCol>-->
          <ElCol :span="8">
            <el-form-item label="单据日期" prop="orderDate">
              <el-date-picker v-model="queryParams.orderDate" value-format="YYYY-MM-DD HH:mm:ss" type="daterange"
                              start-placeholder="开始日期" end-placeholder="结束日期"
                              :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]" class="!w-240px" />
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
      ref="orderRef"
      class="order"
      :data="orderList"
      style="width: 100%"
      @row-click="setCurrent"

    >
      <el-table-column property="orderId" label="单据编号" />
      <el-table-column property="orderDate" label="单据日期" >
        <template #default="scope">
          {{scope.row.orderDate.join('-')}}
        </template>
      </el-table-column>
      <el-table-column property="supplierName" label="销售方" />
      <el-table-column property="distributorName" label="收货方" align="center" width="220"/>
      <el-table-column property="orderStatus" label="状态">
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_ORDER_STATUS" :value="scope.row.orderStatus" />
        </template>
      </el-table-column>
      <el-table-column property="manager" label="收货人"/>
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
import {ReturnOrderVO} from "@/api/fx/returnorder";
import OrdersInfo from "@/views/fx/ordersinfo/index.vue";
import {OrdersInfoApi} from "@/api/fx/ordersinfo";

defineOptions({ name: 'OrderTable' })
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
const orderList = ref<OrdersInfo[]>()
const companyMap = ref(new Map<number, string>())


const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '待退货销售单'
  await getList()
}
const getCompanyList = async () => {
  // const subCompanyLis = await SubCompanyInfoApi.getSubCompanyInfoList()
  // subCompanyLis.forEach((item) => {
  //   companyMap.value.set(item.id, item.companyName as string)
  // })
}
const getList = async () => {
  formLoading.value = true
  try {
    const data = await OrdersInfoApi.getReturnOrdersInfoPage(queryParams)
    orderList.value = data.list
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

const orderRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: CustomerInfoVO) => {
  dialogVisible.value = false
  emit('click-row',row)
}

defineExpose({open}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.order .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

