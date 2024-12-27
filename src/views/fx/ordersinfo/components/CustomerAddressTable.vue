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
            <el-form-item label="联系人" prop="manager">
              <el-input v-model="queryParams.manager" placeholder="请输入联系人" />
            </el-form-item>

          </ElCol>
          <ElCol :offset="1" :span="8">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="queryParams.phone" placeholder="请输入联系电话" />
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
        ref="consigneeRef"
        class="consignee"
        :data="list"
        style="width: 100%"
        @row-click="setCurrent"
      >
        <el-table-column label="联系人" align="center" prop="manager" />
        <el-table-column label="联系电话" align="center" prop="phone" />
        <el-table-column label="省份" align="center" prop="province" />
        <el-table-column label="市" align="center" prop="city" />
        <el-table-column label="区" align="center" prop="district" />
        <el-table-column label="发货地址" align="center" prop="address" />
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
import {CustomerAddressApi} from "@/api/fx/customeraddress";

defineOptions({ name: 'CustomerAddressTable' })
const  props  = defineProps({
  id: {
    type: Number,
  }
})
watch(() => props.id, () => {
  queryParams.distributorId = props.id
  getList()
})
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 5,
  distributorId: props.id,
  manager: undefined,
  phone: undefined,
  province: undefined,
  city: undefined,
  district: undefined,
  address: undefined,
})
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中
const list = ref<CustomerInfoVO[]>([])

const open = async () => {
  dialogVisible.value = true
  dialogTitle.value = '选择地址'
  list.value = undefined;
  await getList()
}

const getList = async () => {
  formLoading.value = true
  try {
    if (!queryParams.distributorId){
      return
    }
    const data = await CustomerAddressApi.getCustomerAddressPage(queryParams)
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

const consigneeRef = ref<InstanceType<typeof ElTable>>()
const emit = defineEmits(['click-row']) // 定义 success 事件，用于操作成功后的回调
const setCurrent = (row: CustomerInfoVO) => {
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

