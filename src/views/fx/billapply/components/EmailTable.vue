<template>
  <Dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
    :is="false"
    width="1100"
  >
<!--    <ContentWrap>-->
<!--      <el-form-->
<!--        class="-mb-15px"-->
<!--        :model="queryParams"-->
<!--        ref="queryFormRef"-->
<!--        :inline="true"-->
<!--        label-width="88px"-->
<!--      >-->
<!--        <ElRow>-->
<!--          <ElCol :span="8">-->
<!--            <el-form-item label="单据编号" prop="orderId">-->
<!--              <el-input-->
<!--                v-model="queryParams.orderId"-->
<!--                placeholder="请输入单据编号"-->
<!--                clearable-->
<!--                class="!w-240px"-->
<!--              />-->
<!--            </el-form-item>-->
<!--          </ElCol>-->
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
<!--          <ElCol :offset="1" :span="8">-->
<!--            <el-form-item label="收货经销商" prop="receiveSupplierId">-->
<!--              <el-select-->
<!--                v-model="queryParams.receiveSupplierId"-->
<!--                placeholder="请选择收货经销商"-->
<!--                clearable-->
<!--                class="select-form"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"-->
<!--                  :key="dict.value"-->
<!--                  :label="dict.label"-->
<!--                  :value="dict.value"-->
<!--                />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
<!--          </ElCol>-->
<!--          <ElCol :offset="1" :span="6">-->
<!--              <el-form-item>-->
<!--                <el-button @click="handleQuery">-->
<!--                  <Icon icon="ep:search" class="mr-5px"/>-->
<!--                  搜索-->
<!--                </el-button>-->
<!--                <el-button @click="resetQuery">-->
<!--                  <Icon icon="ep:refresh" class="mr-5px"/>-->
<!--                  重置-->
<!--                </el-button>-->
<!--            </el-form-item>-->
<!--          </ElCol>-->
<!--        </ElRow>-->
<!--      </el-form>-->
<!--    </ContentWrap>-->
    <ContentWrap>
    <el-table
      ref="consigneeRef"
      class="consignee"
      :data="EmailAddressVO"
      style="width: 100%"
      @row-click="setCurrent"

    >
      <el-table-column property="orderId" label="开票抬头" />
      <el-table-column property="orderDate" label="分销商" />
      <el-table-column property="supplierId" label="税号" />
      <el-table-column property="receiveSupplierId" label="开户行及账号" align="center" width="220" />
      <el-table-column property="distributorId" label="地址及电话" />
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
import {DICT_TYPE, getIntDictOptions} from "@/utils/dict";
import {ref} from "vue";
import {SubCompanyInfoApi} from "@/api/fx/subcompanyinfo";
import {OrdersInfoApi, OrdersInfoVO} from "@/api/fx/ordersinfo";
import {EmailAddressApi, EmailAddressVO} from "@/api/fx/emailaddress";
import {CustomerInfoApi} from "@/api/fx/customerinfo";

defineOptions({ name: 'EmailTable' })
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
const emailList = ref<EmailAddressVO[]>()
const customerMap = ref(new Map<number, string>())


const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择邮箱发票'
  // consigneeList.value = props.list
  await getList()
  await getCustomerList()
}
const getList = async () => {
  formLoading.value = true
  try {
    const data = await EmailAddressApi.getEmailAddressPage(queryParams)
    emailList.value = data.list
    total.value = data.total
  } finally {
    formLoading.value = false
  }
}
//获取客商信息
const getCustomerList = async () => {
  const customerList = await CustomerInfoApi.getCustomerInfo()
  customerList.forEach((item) => {
    customerMap.value.set(item.id, item.distributorName as string)
  })
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
const setCurrent = (row: EmailAddressVO) => {
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

