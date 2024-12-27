<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :loading="formLoading"
    :fullscreen="false"
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
            <el-form-item label="商品编号" prop="distributorName">
              <el-input
                v-model="queryParams.skuId"
                placeholder="请输入分商品编号"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
          <ElCol :offset="1" :span="8">
            <el-form-item label="商品名称" prop="skuName">
              <el-input
                v-model="queryParams.skuName"
                placeholder="请输入商品名称"
                clearable
                class="!w-240px"
              />
            </el-form-item>
          </ElCol>
<!--          <ElCol :offset="1" :span="8">-->
<!--            <el-form-item label="品牌" prop="brand">-->
<!--              <el-input-->
<!--                v-model="queryParams.skuName"-->
<!--                placeholder="请输入商品名称"-->
<!--                clearable-->
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
      ref="goodsRef"
      class="goods"
      :data="goodsList"
      style="width: 100%"
      @row-click="setCurrent"
    >
      <el-table-column property="skuId" label="商品编号" width="100"/>
      <el-table-column property="skuName" label="商品名称" width="300"/>
      <el-table-column property="category" label="规格" width="200"/>
      <el-table-column property="weight" label="商品净重(kg)" width="200"/>
      <el-table-column property="price" label="价格(单价)" />
      <el-table-column property="otherAvailCount" label="可配货库存"/>
    </el-table>
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
    </ContentWrap>
  </ElDialog>

</template>

<script lang="ts" setup>
import { ElTable } from 'element-plus'
import {CustomerInfoVO} from "@/api/fx/customerinfo";
import {ref} from "vue";
import {Goods} from "@/views/fx/ordersinfo/data";

defineOptions({ name: 'GoodsTable' })
const total = ref() // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  distributorId: undefined,
  distributorName: undefined,
  distributorLevel: undefined,
  subCompany: undefined,
  belongTo: undefined,
  customerChannelDistribute: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const goodsList = ref<Goods[]>([])
const current = ref()

const handleOpen = async (index) => {
  console.log("open...")
  dialogVisible.value = true
  dialogTitle.value = '选择商品'
  current.value = index
  // goodsList.value = props.list
  await getList()
}

const getList = async () => {
  formLoading.value = true
  try {
    // const data = await CustomerInfoApi.getCustomerInfoPage(queryParams)
    // goodsList.value = data.list
    // total.value = data.total
    goodsList.value  = [
      {
        id: 1,
        skuId: '1117',
        skuName: "福来匀净美肤精华油-C",
        weight: 0.125,
        category: "125ml",
        price: 85.00,
        salePrice: 85.00,
        otherAvailCount: 119
      },
      {
        id: 2,
        skuId: '1100',
        skuName: "福来匀净美肤精华油",
        weight: 0.015,
        category: "15ml",
        price: 85.00,
        salePrice: 85.00,
        otherAvailCount: 30
      },
      {
        id: 3,
        skuId: 'D7535',
        skuName: "E-CHANGE日落晚风舒缓香氛沐浴油",
        weight: 0.26,
        category: "260ml",
        price: 45.00,
        salePrice: 45.00,
        otherAvailCount: 50
      },
      {
        id: 4,
        skuId: 'D7568',
        skuName: "E-CHANGE月初赤霞透亮香氛润肤乳",
        weight: 0.26,
        category: "260ml",
        price: 45.00,
        salePrice: 45.00,
        otherAvailCount: 200
      }
    ]
    total.value = 4
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

const goodsRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: CustomerInfoVO) => {
  dialogVisible.value = false
  emit('click-row',row, current.value)
}



defineExpose({handleOpen}) // 提供 open 方法，用于打开弹窗
</script>

<style>
.goods .el-table__body tr:hover > td{
  background-color: #d9ecff !important;
}
</style>

