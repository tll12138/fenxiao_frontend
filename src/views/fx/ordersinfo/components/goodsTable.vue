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
      <el-table-column property="inventory" label="可配货库存"/>
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
import {GoodsArchivesApi} from "@/api/fx/goodsarchives";

defineOptions({ name: 'GoodsTable' })
const props = defineProps({
  repositoryCode: String
});
const total = ref() // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  skuId: undefined,
  skuName: undefined,
  customerChannelDistribute: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const goodsList = ref<Goods[]>([])
const current = ref()

const handleOpen = async (index) => {
  dialogTitle.value = '选择商品'
  current.value = index
  await getList()
  dialogVisible.value = true
}


const getList = async () => {
  formLoading.value = true;
  try {
    // 调用 API 并等待响应
    const response = await GoodsArchivesApi.getGoodsArchivesByWarehouseCodePage({
      pageNo: queryParams.pageNo,
      pageSize: queryParams.pageSize,
      enabled: 1,
      skuId: queryParams.skuId,
      skuName: queryParams.skuName,
      warehouseCode: props.repositoryCode
    });

    // 调试输出：检查 API 返回数据结构
    console.log('[API Response]', response);

    // 正确映射数据到 goodsList
    goodsList.value = response.list.map((item: any) => ({
      id: item.id,
      skuId: item.skuId,
      skuName: item.name,
      weight: item.weight,
      category: item.category,
      price: item.salePrice,
      inventory: item.inventory,
    }));

    total.value = response.total;

  } catch (error) {
    console.error('[加载商品失败]', error);
    // 可选：显示错误提示
    ElMessage.error('商品数据加载失败，请稍后重试');
  } finally {
    formLoading.value = false;
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

