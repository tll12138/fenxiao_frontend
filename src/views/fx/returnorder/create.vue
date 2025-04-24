<template>
  <div class="flex flex-col items-center" style="width: 100%">
  
    <ContentWrap class="w-66%">
      <div class="header-content">
        <div class="title-section">
          <el-icon class="title-icon">
            <Document />
          </el-icon>
          <span class="page-title">销售退货单</span>
        </div>
        <img src="@/assets/imgs/pqsy.png" class="logo-image" />
      </div>      
      <!-- 表单区域 -->
      <div class="form-section">
        <div class="section-header">
          <el-icon>
            <Edit />
          </el-icon>
          <span>基本信息</span>
        </div>
        <el-form
          ref="formRef"
          :model="formData"
          :rules="formRules"
          label-width="110px"
          label-position="left"
          v-loading="formLoading"
          class="main-form"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="退货类型" prop="returnType">
                <el-select
                  v-model="formData.returnType"
                  placeholder="请选择退货类型"
                  class="w-full"
                >
                  <el-option
                    v-for="dict in getIntDictOptions(DICT_TYPE.FX_RETURN_TYPE)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原销售单" prop="originOrder">
                <el-select
                  ref="originRef"
                  class="search-select w-full"
                  :suffix-icon="ConsigneeIcon as any"
                  v-model="formData.originOrder"
                  @change="handleChangeOrder"
                  placeholder="请选择销售单"
                  filterable
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货方" prop="returnUserId">
                <el-select
                  ref="selectRef"
                  class="search-select w-full"
                  :suffix-icon="ConsigneeIcon as any"
                  v-model="formData.returnUserId"
                  @change="handleChange"
                  placeholder="请选择退货方"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="dict in consigneeList"
                    :key="dict.id"
                    :label="dict.distributorName"
                    :value="Number(dict.id)"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货经销商" prop="returnDealer">
                <el-select
                  v-model="formData.returnDealer"
                  placeholder="请选择退货经销商"
                  clearable
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in subCompanyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货仓库" prop="warehouseCode">
                <el-select
                  v-model="formData.warehouseCode"
                  placeholder="请选择收货仓库"
                  filterable
                  @change="handleWarehouseChange"
                >
                  <el-option
                    v-for="dict in warehouseOptions"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库功能" prop="warehouseFeature">
                <el-select v-model="formData.warehouseFeature" placeholder="请选择仓库功能" class="w-full">
                  <el-option
                    v-for="dict in getStrDictOptions(DICT_TYPE.FX_WAREHOUSE_FEATURE)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="收货经销商" prop="receiveDealer">
                <el-select
                  v-model="formData.receiveDealer"
                  placeholder="请选择收售经销商"
                  clearable
                  filterable
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in subCompanyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="物流单号" prop="logisticsNumber">
                <el-input v-model="formData.logisticsNumber" placeholder="请输入物流单号" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物流公司" prop="logisticsCompany">
                <el-select
                  v-model="formData.logisticsCompany"
                  placeholder="请选择物流公司"
                  filterable
                >
                  <el-option
                    v-for="dict in getStrDictOptions(DICT_TYPE.FX_WL)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="备注内容" prop="remark">
                <el-input v-model="formData.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货业务类型" prop="returnBusinessType" >
                <el-select v-model="formData.returnBusinessType" placeholder="请选择退货业务类型" :disabled="true">
                  <el-option
                    v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_TYPE)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>      

      <!-- 商品信息区域 -->
      <div class="section-header goods-header">
        <el-icon><SoldOut /></el-icon>
        <span>退货明细</span>
      </div>

      <div class="goods-table-section">
        <ReturnOrdersDetailForm ref="ordersDetailFormRef" :initial-data="originData" />
      </div>
    </ContentWrap>

    <!-- 左侧固定汇总信息 -->
    <div class="side-summary">
      <el-card class="summary-card" shadow="hover">
        <div class="summary-items">
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><ShoppingCart /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">原单数量</div>
              <div class="item-value">{{ ordersDetailFormRef?.totalCount || 0 }}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><Wallet /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">总退货金额</div>
              <div class="item-value">¥{{ ordersDetailFormRef?.totalReturnAmount?.toFixed(2) || '0.00' }}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><SoldOut /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">总退货数量</div>
              <div class="item-value">{{ ordersDetailFormRef?.totalReturnCount || 0 }}</div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    

    <!-- 右侧固定按钮 -->
    <div class="side-actions">
      <el-card class="action-card" shadow="hover">
        <div class="action-buttons">
          <el-tooltip
            content="返回列表"
            placement="left"
            :show-after="500"
          >
            <el-button @click="handleCancel" class="action-button" text>
              <el-icon><Back /></el-icon>
              <span>返回</span>
            </el-button>
          </el-tooltip>
          
          <div class="divider"></div>
          
          <el-tooltip
            content="保存草稿"
            placement="left"
            :show-after="500"
          >
            <el-button type="primary" @click="handleSave" class="action-button" text :loading="formLoading">
              <el-icon><DocumentAdd /></el-icon>
              <span>保存</span>
            </el-button>
          </el-tooltip>
          
          <div class="divider"></div>
          
          <el-tooltip
            content="提交审核"
            placement="left"
            :show-after="500"
          >
            <el-button type="success" @click="handleSubmit" class="action-button" text :loading="formLoading">
              <el-icon><Check /></el-icon>
              <span>提交</span>
            </el-button>
          </el-tooltip>
        </div>
      </el-card>
    </div>

    <OrderTable ref="orderRef" @click-row="handleClickOrderRow" />
    <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
  </div>
</template>

<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { ReturnOrderApi, ReturnOrderVO } from '@/api/fx/returnorder'
import { SubCompanyInfoApi } from '@/api/fx/subcompanyinfo'
import ConsigneeIcon from '@/views/fx/ordersinfo/components/ConsigneeIcon.vue'
import { CustomerInfoApi, CustomerInfoVO } from '@/api/fx/customerinfo'
import ConsigneeTable from '@/views/fx/ordersinfo/components/consigneeTable.vue'
import OrderTable from '@/views/fx/returnorder/components/orderTable.vue'
import { SendRepositoryApi } from '@/api/fx/sendrepository'
import { OrdersInfoApi, OrdersInfoVO } from '@/api/fx/ordersinfo'
import ReturnOrdersDetailForm from '@/views/fx/returnorder/components/returnOrdersDetailForm.vue'
import {
  SoldOut,
  Document,
  Edit,
  ShoppingCart,
  Wallet,
  DocumentAdd,
  Check,
  Back
} from '@element-plus/icons-vue'
import { useTagsViewStore } from '@/store/modules/tagsView'
import {Goods} from "@/views/fx/ordersinfo/data";

/** FX 销售退货单 表单 */
defineOptions({ name: 'ReturnOrderForm' })
const { push, currentRoute } = useRouter() // 路由
const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref<ReturnOrderVO>({} as ReturnOrderVO)
const formRules = reactive({
  orderId: [{ required: true, message: '单据编号不能为空', trigger: 'blur' }],
  orderDate: [{ required: true, message: '单据日期不能为空', trigger: 'blur' }],
  orderStatus: [{ required: true, message: '单据状态不能为空', trigger: 'change' }],
  returnType: [{ required: true, message: '退货类型不能为空', trigger: 'change' }],
  originOrder: [{ required: true, message: '原销售单不能为空', trigger: 'blur' }],
  returnUserId: [{ required: true, message: '退货方不能为空', trigger: 'blur' }],
  returnDealer: [{ required: true, message: '退货经销商不能为空', trigger: 'blur' }],
  receiveDealer: [{ required: true, message: '收货经销商不能为空', trigger: 'blur' }],
  warehouseCode: [{ required: true, message: '收货仓库不能为空', trigger: 'change' }],
  warehouseFeature: [{ required: true, message: '仓库功能不能为空', trigger: 'change' }],
  logisticsNumber: [{ required: true, message: '物流单号不能为空', trigger: 'blur' }],
  logisticsCompany: [{ required: true, message: '物流公司不能为空', trigger: 'change' }],
  returnBusinessType: [{ required: true, message: '退货业务类型不能为空', trigger: 'change' }]
})
const formRef = ref() // 表单 Ref
const originData = ref<Goods[]>([])

/**
 * 引用
 */
const consigneeRef = ref() //收货方表格引用
const orderRef = ref() //销售单原单引用
const ordersDetailFormRef = ref()
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeMap = ref<Map<number, CustomerInfoVO>>(new Map<number, CustomerInfoVO>())
const consigneeTotal = ref<number>() //收货方数据

/**
 * 输入框变更
 * @param id
 */
const handleChange = (id: number) => {
  if (!id) {
    return
  }
  console.log(consigneeMap.value)
  const data = consigneeMap.value[id]
  handleClickConsigneeRow(data as CustomerInfoVO)
}

const handleChangeOrder = (id: number) => {
  if (!id) {
    return
  }
  console.log(consigneeMap.value)
  const data = consigneeMap.value[id]
  handleClickOrderRow(data as CustomerInfoVO)
}

/**
 选择退货方表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  console.log(data)
  formData.value.returnUserId = data.id // 退货方ID
}

/**
 选择销售单表格数据并回显到表单中
 */
const handleClickOrderRow = (data: OrdersInfoVO) => {
  OrdersInfoApi.getOrdersInfo(data.id as number).then((res) => {
    console.log(res)
    formData.value.returnDealer = res.receiveSupplierId as number
    formData.value.originOrder = res.orderId as string
    formData.value.receiveDealer = res.supplierId as number
    formData.value.warehouse = res.warehouse as string
    formData.value.returnType = 0
    formData.value.warehouseFeature = '0'
    formData.value.originQuantity = res.sendQuantity as number
    originData.value = res.ordersDetails

    // 直接使用接口返回的经销商信息
    if (res.distributorId) {
      formData.value.returnUserId = Number(res.distributorId)
      const selectedConsignee = {
        id: res.distributorId,
        distributorName: res.distributorName
      } as CustomerInfoVO

      // 更新consigneeList和consigneeMap
      if (!consigneeList.value?.some(item => item.id === res.distributorId)) {
        consigneeList.value?.push(selectedConsignee)
        consigneeMap.value?.set(selectedConsignee.id, selectedConsignee)
      }

      nextTick(() => {
        if (selectRef.value) {
          selectRef.value.selectedLabel = res.distributorName
        }
      })
    }
    console.log(formData.value.returnUserId)
    console.log(originData.value)
  })
}

watch(
  () => ordersDetailFormRef.value?.totalCount,
  (newVal) => {
    if (newVal < 20) {
      formData.value.returnBusinessType = 0
    } else {
      formData.value.returnBusinessType = 1
    }
  },
  { immediate: true, deep: true }
)

/**
 * 获取经销商列表
 */
const subCompanyList = ref([])
const querySubCompanyList = async () => {
  SubCompanyInfoApi.getSubCompanyInfoList().then((res) => {
    subCompanyList.value = res.map((item) => {
      return {
        label: item.companyName,
        value: item.id
      }
    })
  })
}

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async (type: string) => {
  formType.value = type
  // 校验表单
  await formRef.value.validate()
  // 校验子表单
  try {
    await ordersDetailFormRef.value.validate()
  } catch (e) {
    return
  }
  const detailList = ordersDetailFormRef.value.getData()
  if (detailList.length === 0) {
    message.warning('商品明细不能为空')
    return
  }


  const param = {
     ...formData.value,
     totalReturnAmount: ordersDetailFormRef.value?.totalReturnAmount || 0,
     totalReturnQuantity: ordersDetailFormRef.value?.totalReturnCount || 0,
     // 商品明细
     ordersDetails: detailList,
   }


  // 提交请求
  formLoading.value = true
  try {
    if (formType.value === 'submit') {
      await ReturnOrderApi.submitReturnOrder(param)
      message.success('提交成功') 
    } else {
      await ReturnOrderApi.saveReturnOrder(param)
      message.success('保存成功')
    }
    // 关闭当前 Tab
    delView(unref(currentRoute))
    emit('success')
    await push({ name: 'ReturnOrder' })
  } finally {
    formLoading.value = false
  }
}
/**
 * 获取收货方列表
 */
const getConsigneeList = async () => {
  CustomerInfoApi.getCustomerInfoPage({ pageNo: 1, pageSize: 100 }).then((res) => {
    consigneeList.value = res.list
    consigneeMap.value = res.list.reduce((map, item) => {
      map.set(item.id, item);  // 修改为使用Map的set方法
      return map
    }, new Map<number, CustomerInfoVO>())  // 明确指定Map类型
    consigneeTotal.value = res.total
  })
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {} as ReturnOrderVO
  formRef.value?.resetFields()
}

/**
 * 获取发货仓库列表
 */
const warehouseOptions = ref([]) //发货仓库列表
const queryWarehouseList = async () => {
  SendRepositoryApi.getSendRepositoryPage({ pageNo: 1, pageSize: 100 }).then((res) => {
    warehouseOptions.value = res.list.map((item) => {
      return {
        label: item.name,
        value: item.code
      }
    })
  })
}
const handleWarehouseChange = (val: number) => {
  console.log(val)
  const item = warehouseOptions.value.find((option) => option.value === val)
  console.log(item)
  console.log(item.label)
  if (item.label && item.value) {
    formData.value.warehouse = item.label
    formData.value.warehouseCode = item.value
    console.log(formData.value)
  }
}

const addressRef = ref() //接收方引用

/**
 * 子表单
 * @param str
 */
const openForm = (str: string) => {
  if (str === 'address') {
    console.log(addressRef.value)
    addressRef.value.open()
  } else if (str === 'consignee') {
    console.log(consigneeRef.value)
    consigneeRef.value.open()
  } else if (str === 'orders') {
    console.log(orderRef.value)
    orderRef.value.open()
  }
}


/** 取消操作 */
const handleCancel = () => {
  ElMessageBox.confirm('确认要返回吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    resetForm()
    push('/fx/return-order')
  })
}

/** 保存操作 */
const handleSave = async () => {
  await submitForm("save")
  message.success('保存成功')
}

/** 提交操作 */
const handleSubmit = async () => {
  await submitForm("submit")
  message.success('提交成功')
}

const { query } = useRoute() // 查询参数
const queryId = query.id as unknown as number // 从 URL 传递过来的 id 编号

const getDetail = async () => {
  console.log(query)
  if (queryId) {
    // 获取订单详情
    formLoading.value = true
    try {
      const res = await ReturnOrderApi.getReturnOrder(queryId);
      console.log(res)
      formData.value = {
        ...res,
      }
      ordersDetailFormRef.value.setData(res.ordersDetails)
    } finally {
      formLoading.value = false
    }
  }
}

const init = () =>{
  querySubCompanyList()
  queryWarehouseList()
  getConsigneeList()
  formData.value.returnBusinessType = 0
}


/**
 * 选择框的引用-用来定义点击事件
 */
const selectRef = ref()
const originRef = ref()
onMounted(() => {
  getDetail()
  init()
  nextTick(() => {
    if (selectRef.value) {
      // 自定义点击事件逻辑
      const select = selectRef.value?.suffixRef
      select.onclick = (event: Event) => {
        event.stopPropagation()
        openForm('consignee')
      }
    }
    if (originRef.value) {
      // 自定义点击事件逻辑
      const origin = originRef.value?.suffixRef
      origin.onclick = (event: Event) => {
        event.stopPropagation()
        openForm('orders')
      }
    }
  })
})


</script>

<style  scoped>
@import '/src/styles/fx/siderActions.scss';
@import '/src/styles/fx/siderTotal.scss';

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 10px;
  padding: 0 12px;  
}

.title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 24px;
  color: var(--el-color-primary);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.logo-image {
  height: 40px;
  object-fit: contain;
}



.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
}

.section-header .el-icon {
  font-size: 18px;
  color: var(--el-color-primary);
}

.main-form {
  padding: 24px 24px 0;
}

.goods-table-section {
  padding: 24px;
}

:deep(.search-select .el-select__caret) {
  transform: rotate(0) !important;
}

:deep(.search-select .el-select__caret.is-reverse) {
  transform: rotate(0) !important;
}

.side-summary {
  position: absolute;
  left: 50px;
  top: 45%;
  transform: translateY(-50%);
  z-index: 1000;
}
.side-actions {
  position: absolute;
  right: 80px;
  top: 45%;
  transform: translateY(-50%);
  z-index: 1000;
}

</style>
