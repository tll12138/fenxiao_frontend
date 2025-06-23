查询参数<template>
  <div class="flex justify-center">
    <div style="width: 75%">
      <ContentWrap class="px-10 py-0 text-center">
        <span class="title-header">销售单详情</span><br/>
        <span class="title-sub-header" >PQ Sale Order Detail</span>
      </ContentWrap>
      <div class="px-10 bg-white flex flex-col">
        <div class="title-container">
          <h2 class="fancy-title">销售抬头</h2>
        </div>
        <el-row :gutter="24" class="description-container">
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">单据编号：</span>
              <span class="item">{{ formData.orderId }}</span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">单据日期：</span>
              <span class="item">{{ formData.orderDate?.join('-') }}</span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">销售类型：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_SALE_TYPE" :value="formData.salesType" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">发货类型：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_SEND_TYPE" :value="formData.sendType" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">分销商类型：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_CUSTOMER_TYPE" :value="formData.customerType" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">无痕发货：</span>
              <span class="item"> <dict-span-tag :type="DICT_TYPE.YES_NO" :value="formData.isTraceless" /> </span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">销售商：</span>
              <span class="item"> <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="formData.supplierId" /> </span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">收款商：</span>
              <span class="item"> <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="formData.receiveSupplierId" /> </span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">渠道：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_CHANNEL" :value="formData.channel" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">收货方：</span>
              <span class="item">{{ formData.distributorName }}</span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">业务归属：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_BELONG" :value="formData.businessBelong" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">客户等级：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="formData.customerLevel" /></span>
            </div>
          </el-col>
           <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">发货仓库：</span>
              <span class="item">{{ formData.warehouse }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="px-10 bg-white flex flex-col">
        <div class="title-container">
          <h2 class="fancy-title">地址信息</h2>
        </div>
        <el-row :gutter="24" class="description-container">
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">收货人：</span>
              <span class="item">{{ formData.manager }}</span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">联系电话：</span>
              <span class="item">{{ formData.phone}}</span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">物流公司：</span>
              <span class="item"><dict-span-tag :type="DICT_TYPE.FX_WL" :value="formData.logisticsCompany" /></span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">省市区：</span>
              <span class="item">
                {{ formData.province }}/{{ formData.city }}/{{ formData.district }}
              </span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">收货地址：</span>
              <span class="item">{{formData.address}}</span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">备注内容：</span>
              <span class="item"> {{formData.remark}}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="px-10 bg-white ">
        <div class="title-container" >
          <h2 class="fancy-title">商品信息</h2>
        </div>
        <el-table
          :data="formData.ordersDetails"
          class="mt-10px"
          size="small"
          style="width: 100%; table-layout: auto"
          stripe
          border>
          <el-table-column align="center" prop="skuId" label="商品编号" min-width="70px" />
          <el-table-column align="center" prop="saleType" label="销售类型" min-width="80px" >
            <template #default="scope">
              <dict-tag :type="DICT_TYPE.FX_DETAIL_RETURN_TYPE" :value="scope.row.saleType" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="skuName" label="商品名称" min-width="120px"/>
          <el-table-column align="center" prop="category" label="规格" min-width="70px"/>
          <el-table-column align="center" prop="price" label="销售价" min-width="70px"/>
          <el-table-column align="center" prop="salePrice" label="结算价" min-width="70px"/>
          <el-table-column align="center" prop="count" label="数量" min-width="70px"/>
          <el-table-column align="center" label="销售金额" min-width="70px">
            <template #default="scope">
              <span>{{ ((scope.row.count || 0) * (scope.row.salePrice || 0))?.toFixed(2) || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="净重(kg)" min-width="70px">
            <template #default="scope">
              <span >{{ ((scope.row.count || 0) * (scope.row.weight || 0))?.toFixed(2) || 0 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="px-10 bg-white flex flex-col">
        <div class="title-container">
          <h2 class="fancy-title">汇总信息</h2>
        </div>
        <el-row :gutter="24" class="description-container">
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">销售金额：</span>
              <span class="item">{{ formData.salesAmount }} 元</span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">发货数量：</span>
              <span class="item">{{ formData.sendQuantity}} </span>
            </div>
          </el-col>
          <el-col  :span="24" :sm="12" :md="12" :lg="8" class="col-style">
            <div class="my-4 info">
              <span class="label">总重量：</span>
              <span class="item">{{ formData.totalWeight}} KG</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {DICT_TYPE} from '@/utils/dict'
import {OrdersInfoApi} from "@/api/fx/ordersinfo";
import {propTypes} from "@/utils/propTypes";

const { query } = useRoute() // 查询参数
const props = defineProps({
  id: propTypes.number.def(undefined)
})
const queryId = query.id as unknown as number // 从 URL 传递过来的 id 编号
const queryOrderId = query.orderId as unknown as string // 从 URL 传递过来的 orderId 编号

const loading = ref(false)

defineOptions({name: 'OrdersViewDetail'})

onMounted(() => {
  getDetail()
})
const formData = reactive({
  id: '',
  orderId: '',
  orderDate: [],
  salesType: '',
  customerType: '',
  isTraceless: '',
  supplierId: '',
  supplierName: '',
  receiveSupplierId: '',
  receiveSupplierName: '',
  channel: '',
  distributorId: '',
  businessBelong: '',
  customerLevel: '',
  warehouseCode: '',
  manager: '',
  phone: '',
  logisticsCompany: '',
  address: '',
  remark: '',
  sendQuantity: '',
  salesAmount: null,
  totalWeight: null,
  warehouse: '',
  isToErp: null,
  province: "",
  city: "",
  district: "",
  erpOrderNumber: null,
  orderStatus: 1,
  sendType: 0,
  logisticsNumber: null,
  bigCustomerAddress: null,
  totalGoods: null,
  requirement: null,
  brand: null,
  externalOrderNumber: null,
  orderType: null,
  commitDate: null,
  isDf: null,
  cusDfType: null,
  distributorName: null,
  ordersDetails: []
})

const getDetail = async () => {
  // 获取订单详情
  loading.value = false
  try {
    if (queryOrderId) {
      const res = await OrdersInfoApi.getOrdersInfoByOrderId(queryOrderId);
      Object.assign(formData, res);
    } else {
      const res = await OrdersInfoApi.getOrdersInfo(props.id || queryId);
      Object.assign(formData, res);
    }
  } finally {
    loading.value = false
  }
}

defineExpose({ open: getDetail }) // 提供 open 方法，用于打开弹窗

</script>
<style scoped>
*{
  font-size: 12px;
}

.label {
  font-weight: 600;
  color: #3e3e3e;
  font-size: 14px;
  min-width: 80px;
}
.item{
  min-width: 200px;
}

.title-container {
  text-align: left;
}

.fancy-title {
  font-size: 16px;
  font-weight: 800;
  color: #333;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  font-family: 'Arial', sans-serif;
}

.fancy-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #4facfe, #00f2fe); /* 渐变效果 */
  border-radius: 5px;
}

.info{
  display: flex;
  align-items: center; /* 保证标签和值垂直居中 */
  justify-content: flex-start; /* 保证标签和值是左对齐 */
  margin-bottom: 10px;
}

.col-style{
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-header{
  font-size: 26px;
  font-family: 'Microsoft YaHei';
  word-break: break-word;
  overflow-wrap: break-word;
  color: rgb(0, 112, 192);
  font-weight: bold;
}
.title-sub-header{
  margin-top: 5px;
  font-size: 13px;
  font-family: 'Microsoft YaHei';
  word-break: break-word;
  overflow-wrap: break-word;
  color: rgb(127, 127, 127);
}

@media (max-width: 1024px) {
  .title-container {
    text-align: left;
  }
}

@media (max-width: 768px) {
  .title-container {
    text-align: center;
  }
  .item{
    max-width: 90px;
    min-width: 90px;
  }
  .title-header{
    font-size: 18px;
  }
  .title-sub-header{
    font-size: 10px;
  }
}

@media (max-width: 576px) {
  .title-container {
    text-align: center;
  }
  .item{
    max-width: 90px;
    min-width: 90px;
  }
  .title-header{
    font-size: 18px;
  }
  .title-sub-header{
    font-size: 10px;
  }
}

@media (max-width: 375px) {
  .title-container {
    text-align: center;
  }
  .item{
    max-width: 90px;
    min-width: 90px;
  }
  .title-header{
    font-size: 18px;
  }
  .title-sub-header{
    font-size: 10px;
  }
}
</style>
