<template>
  <div>
    <div class="flex justify-center align-center">
      <ContentWrap class="w-66% ">
  
        <div class="header-content">
          <div class="title-section">
            <el-icon class="title-icon">
              <Document />
            </el-icon>
            <span class="page-title">销售单</span>
          </div>
          <img src="@/assets/imgs/pqsy.png" class="logo-image" />
        </div>

        <el-form ref="formRef" class="bg-white px-10 py-5 " :model="formData" :rules="formRules"
          label-width="100px" size="default" v-loading="formLoading">

          <!-- 销售抬头-->
          <div class="section-header">
            <el-icon><Paperclip /></el-icon>
            <span>销售抬头</span>
          </div>

          <ElRow>
            <ElCol :span="7">
              <el-form-item label="销售类型" prop="salesType">
                <el-select v-model="formData.salesType" placeholder="请选择销售类型" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_SALE_TYPE)" :key="dict.value"
                    :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="分销商类型" prop="customerType">
                <el-select v-model="formData.customerType" placeholder="请选择分销商类型" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_TYPE)" :key="dict.value"
                    :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="无痕发货" prop="isTraceless">
                <el-select v-model="formData.isTraceless" placeholder="请选择是否无痕发货" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>

            <ElCol :span="7">
              <el-form-item label="销售经销商" prop="supplierId">
                <el-select v-model="formData.supplierId" placeholder="请选择销售经销商" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)" :key="dict.value"
                             :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="收款经销商" prop="receiveSupplierId">
                <el-select v-model="formData.receiveSupplierId" placeholder="请选择收款经销商" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)" :key="dict.value"
                             :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="渠道" prop="channel">
                <el-select v-model="formData.channel" placeholder="请选择渠道" filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_CHANNEL)" :key="dict.value"
                    :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>


            <ElCol :span="7">
              <el-form-item label="收货方" prop="distributorId">
                <el-select ref="selectRef" class="search-select" :suffix-icon="ConsigneeIcon as any"
                  v-model="formData.distributorId" @change="handleChange" placeholder="请选择收货方" filterable clearable>
                  <el-option v-for="dict in consigneeList" :key="dict.id" :label="dict.distributorName"
                    :value="dict.id" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="业务归属" prop="businessBelong">
                <el-select v-model="formData.businessBelong" placeholder="请选择业务归属" filterable clearable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_BELONG)" :key="dict.value"
                    :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :offset="1" :span="7">
              <el-form-item label="客户等级" prop="customerLevel">
                <el-select v-model="formData.customerLevel" placeholder="客户等级" filterable disabled>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)" :key="dict.value"
                    :label="dict.label" :value="dict.value" />
                </el-select>

              </el-form-item>
            </ElCol>

            <ElCol :span="7">
              <el-form-item label="发货仓库" prop="warehouse">
                <el-select v-model="formData.warehouseCode" placeholder="请选择发货仓库" filterable
                  @change="handleWarehouseChange">
                  <el-option v-for="dict in warehouseOptions" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>

            <ElCol v-if="[2,3].includes(formData.customerLevel)" :offset="1" :span="15">
              <el-form-item label="大客户地址" prop="bigCustomerAddress">
                <el-input v-model="formData.bigCustomerAddress" placeholder="请选择大客户地址" readonly>
                  <template #append>
                    <el-button
                      style="display: flex; align-items: center; background-color: #1e83e9; color: white; border-radius: 0"
                      @click="openForm('bigCustomerAddress')">
                      选择地址
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </ElCol>

            <ElCol :offset="formData.customerLevel === 2 ? 0 : 1" :span="formData.customerLevel === 2 ? 24 : 15">
              <el-form-item label="发货要求" prop="requirement">
                <el-input v-model="formData.requirement" placeholder="请输入发货要求" />
              </el-form-item>
            </ElCol>

          </ElRow>

        
          <div class="section-header">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span>地址信息</span>
          </div>
          <ElRow>
            <ElCol :span="10">
              <el-form-item label="省市区" class="mb-0px!" prop="province">
                <el-cascader style="width: 100%" filterable @change="handleChangePcd" :options="pcaTextArr"
                  v-model="pcd" />
              </el-form-item>
            </ElCol> <!--省市区-->

            <ElCol :span="7">
              <el-form-item label="收货人" prop="manager">
                <el-input v-model="formData.manager" placeholder="请输入收货人" />
              </el-form-item>
            </ElCol> <!--收货人-->
            <ElCol :span="7">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="formData.phone" placeholder="请输入联系电话" />
              </el-form-item>
            </ElCol> <!--联系电话-->
            <ElCol :span="6">
              <el-form-item label="物流公司" prop="logisticsCompany">
                <el-select v-model="formData.logisticsCompany" placeholder="请选择物流公司" filterable>
                  <el-option v-for="dict in getStrDictOptions(DICT_TYPE.FX_WL)" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol> <!--物流公司-->
            <ElCol :span="18">
              <el-form-item label="收货地址" prop="address">
                <el-input v-model="formData.address" placeholder="请输入收货地址">
                  <template #append>
                    <el-button style="display: flex;
                      align-items: center;
                      background-color: #1e83e9;
                      border-top-left-radius: 0;
                      border-bottom-left-radius: 0;
                      color: white" :icon="Search as any" @click="openForm('address')">选择地址
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </ElCol> <!--收货地址-->


            <ElCol :span="24">
              <el-form-item label="待解析地址" prop="remark">
                <el-input v-model="needHandleAddress" class="input-with-select" placeholder="请输入要解析的地址" resize="none">
                  <template #append>
                    <el-button
                      style="display: flex;align-items: center;background-color: #1e83e9;color: white;border-top-left-radius: 0;border-bottom-left-radius: 0"
                      :icon="Search as any" @click="HandleAddress">一键解析
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </ElCol> <!--待解析地址-->
            <ElCol :span="24">
              <el-form-item label="备注内容" prop="remark">
                <el-input v-model="formData.remark" placeholder="请输入备注" />
              </el-form-item>
            </ElCol> <!--备注-->
          </ElRow>

          <!-- 子表的表单 -->
          <OrdersDetailForm
            ref="ordersDetailFormRef"
            :repository-code="formData.warehouseCode"
          />

        </el-form>
      </ContentWrap>
    </div>

    <!-- 左侧固定汇总信息 -->
    <div class="side-summary">
      <el-card class="summary-card" shadow="hover">
        <div class="summary-items">
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><Coin /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">销售金额</div>
              <div class="item-value">¥{{ ordersDetailFormRef?.totalAmount?.toFixed(2) || '0.00' }}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><Sell /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">发货数量</div>
              <div class="item-value">{{ ordersDetailFormRef?.totalCount || 0 }}</div>
            </div>
          </div>
          
          <div class="divider"></div>
          
          <div class="summary-item">
            <div class="item-icon">
              <el-icon><Odometer /></el-icon>
            </div>
            <div class="item-content">
              <div class="item-label">总重量</div>
              <div class="item-value">{{ ordersDetailFormRef?.totalWeight?.toFixed(2) || '0.00' }} KG</div>
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
            <el-button @click="push({ name: 'OrdersInfo' })" class="action-button" text>
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
            <el-button type="primary" @click="submitForm('save')" class="action-button" text :loading="formLoading">
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
            <el-button type="success" @click="submitForm('create')" class="action-button" text :loading="formLoading">
              <el-icon><Check /></el-icon>
              <span>提交</span>
            </el-button>
          </el-tooltip>
        </div>
      </el-card>
    </div>
    <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
    <CustomerAddressTable ref="addressRef" :id="formData.distributorId" @click-row="handleClickAddressRow" />
    <BigAddressTable ref="bigAddressRef" :id="formData.distributorId" @click-row="handleClickBigCustomerAddressRow" />
  </div>

</template>
<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions, getStrDictOptions } from '@/utils/dict'
import { OrdersInfoApi, OrdersInfoVO } from '@/api/fx/ordersinfo'
import OrdersDetailForm from './components/OrdersDetailForm.vue'
import { pcaTextArr } from "element-china-area-data";
import { Search } from "@element-plus/icons-vue";
import ConsigneeTable from "./components/consigneeTable.vue"
import CustomerAddressTable from "./components/CustomerAddressTable.vue"
import BigAddressTable from "./components/BigAddressTable.vue";
import { CustomerInfoApi, CustomerInfoVO } from "@/api/fx/customerinfo";
import { CustomerAddressVO } from "@/api/fx/customeraddress";
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";
import { UtilsApi } from "@/api/fx/utils";
import { SendRepositoryApi } from "@/api/fx/sendrepository";
import { SubCompanyInfoApi } from "@/api/fx/subcompanyinfo";
import { useTagsViewStore } from "@/store/modules/tagsView";
import {
  Goods,
  Sell,
  Document,
  DocumentAdd,
  Check,
  Back,
  Odometer,
  Coin,
  Paperclip,
  MapLocation
} from '@element-plus/icons-vue'

/** 销售单 表单 */
defineOptions({ name: 'OrdersInfoForm' })

const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { push, currentRoute } = useRouter() // 路由
/**
 * 表单相关变量
 */
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('create') // 表单的类型：create - 新增；update - 修改
const formRules = reactive({
  saleType: [{ required: true, message: '销售类型不能为空', trigger: 'change' }],
  customerType: [{ required: true, message: '分销商类型不能为空', trigger: 'change' }],
  isTraceless: [{ required: true, message: '是否无码不能为空', trigger: 'change' }],
  supplierId: [{ required: true, message: '供应商不能为空', trigger: 'blur' }],
  receiveSupplierId: [{ required: true, message: '收货经销商不能为空', trigger: 'blur' }],
  channel: [{ required: true, message: '渠道不能为空', trigger: 'change' }],
  distributorId: [{ required: true, message: '收货方不能为空', trigger: 'change' }],
  businessBelong: [{ required: true, message: '业务归属不能为空', trigger: 'change' }],
  customerLevel: [{ required: true, message: '客户等级不能为空', trigger: 'change' }],
  warehouse: [{ required: true, message: '发货仓库不能为空', trigger: 'change' }],
  bigCustomerAddress: [{ required: true, message: '大客户地址不能为空', trigger: 'blur' }],
  manager: [{ required: true, message: '收货人姓名不能为空', trigger: 'blur' }],
  phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '收货地址不能为空', trigger: 'blur' }],
  logisticsCompany: [{ required: true, message: '物流公司不能为空', trigger: 'blur' }],
  province: [{ required: true, message: '省市区不能为空', trigger: 'change' }],
})
const formData = ref<OrdersInfoVO>({
  id: undefined,
  warehouse: undefined,
  warehouseCode: undefined,
  specifySendDate: undefined,
  erpOrderNumber: undefined,
  isToErp: 0,
  addressId: undefined,
  province: undefined,
  city: undefined,
  district: undefined,
  sendQuantity: undefined,
  manager: undefined,
  phone: undefined,
  address: undefined,
  orderId: undefined,
  orderDate: undefined,
  orderStatus: undefined,
  sendType: 0,//默认正常发货
  salesType: 0,
  supplierId: undefined,
  remark: undefined,
  logisticsCompany: undefined,
  logisticsNumber: undefined,
  salesAmount: undefined,
  bigCustomerAddress: undefined,
  customerLevel: undefined,
  customerType: undefined,
  totalGoods: undefined,
  totalWeight: undefined,
  requirement: undefined,
  brand: undefined,
  externalOrderNumber: undefined,
  channel: undefined,
  orderType: 0,
  isTraceless: 0,
  commitDate: undefined,
  isDf: 0,
  cusDfType: undefined,
  receiveSupplierId: undefined,
  distributorId: undefined,
  businessBelong: undefined,
} as OrdersInfoVO)
const formRef = ref() // 表单 Ref

/**
 * 收货方表格
 */
const consigneeRef = ref() //收货方表格引用
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeMap = ref<Map<number, CustomerInfoVO>>(new Map<number, CustomerInfoVO>())
const consigneeTotal = ref<number>() //收货方数据

/**
 * 收获地址表格相关
 */
const pcd = ref<string[]>([])
const addressRef = ref() //接收方引用
const needHandleAddress = ref<string>('')

/**
 * 子表的表单
 */
const ordersDetailFormRef = ref()
const bigAddressRef = ref()
const distributorName = ref('')

/**
 * 子表单
 * @param str
 */
const openForm = (str: string) => {
  if (str === 'address') {
    console.log(addressRef.value)
    addressRef.value.open()
  } else if (str === 'consignee') {
    consigneeRef.value.open()
  } else if (str === 'bigCustomerAddress') {  // 新增条件分支
    // 这里需要调用大客户地址选择组件，假设组件名为 BigCustomerAddressTable
    bigAddressRef.value.open()
  }
}

const handleClickBigCustomerAddressRow = (data: any) => {
  formData.value.bigCustomerAddress = data.address;
  formData.value.province = data.province;
  formData.value.city = data.city;
  formData.value.district = data.district;
  pcd.value = [data.province, data.city, data.district];
  formData.value.manager = data.person;
  formData.value.phone = data.contact;
  formData.value.address = data.address;
  bigAddressRef.value.close()
}

/**
 * 省市区选择框变更
 * @param val
 */
const handleChangePcd = (val: string[]) => {
  formData.value.province = val[0]
  formData.value.city = val[1]
  formData.value.district = val[2]
}

/**
 * 输入框变更
 * @param id
 */
const handleChange = (id: number) => {
  if (!id) {
    resetFillFiled();
    return;
  }
  console.log(consigneeMap.value)
  const data = consigneeMap.value[id]
  handleClickConsigneeRow(data as CustomerInfoVO)
}

/**
 * 打开创建表单弹窗
 * @param type
 * @param id
 */
const open = async (type: string, id?: number) => {
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrdersInfoApi.getOrdersInfo(id)
    } finally {
      formLoading.value = false
    }
  }
}

defineExpose({ open }) // 提供 open 方法，用于打开弹窗
/**
 * 提交表单
 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const addressId = ref()
/**
 * 提交表单
 */
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
    message.warning('请添加商品明细')
    return
  }

  //构建请求��数
  let params = {
    id: formData.value.id,
    // --------------基础信息-----------------
    warehouse: formData.value.warehouse, // 发货仓库
    warehouseCode: formData.value.warehouseCode, // 发货仓库编码
    salesType: formData.value.salesType, // 销售类型
    customerType: formData.value.customerType, // 分销商类型
    isTraceless: formData.value.isTraceless, // 无痕发货
    supplierId: formData.value.supplierId, // 供应商
    receiveSupplierId: formData.value.receiveSupplierId, // 收货经销商
    channel: formData.value.channel, // 渠道
    distributorId: formData.value.distributorId, // 收货方
    distributorName: distributorName, // 收货方
    businessBelong: formData.value.businessBelong, // 业务归属
    customerLevel: formData.value.customerLevel, // 客户等级
    requirement: formData.value.requirement, // 发货要求
    sendType: 0, // 发货类型 默认正常发货 1 - 指定日期发货
    bigCustomerAddress: formData.value.bigCustomerAddress, // 大客户地址

    // --------------地址信息--------
    addressId: formData.value.addressId,
    province: formData.value.province, // 省市区
    city: formData.value.city, // 市
    district: formData.value.district,  // 区
    manager: formData.value.manager, // 联系人
    phone: formData.value.phone, // 电话
    address: formData.value.address, // 地址
    logisticsCompany: formData.value.logisticsCompany, // 物流公司
    remark: formData.value.remark, // 备注

    // -----------------商品明细----------------
    ordersDetails: detailList,

    //汇总信息
    sendQuantity: ordersDetailFormRef.value.totalCount, // 发货数量
    salesAmount: ordersDetailFormRef.value.totalAmount?.toFixed(2),
    totalWeight: ordersDetailFormRef.value.totalWeight?.toFixed(2),
  }
  // 提交请求
  formLoading.value = true
  try {
    if (formType.value === 'create') {
      await OrdersInfoApi.createOrdersInfo(params)
      message.success("创建成功")
    } else {
      await OrdersInfoApi.saveOrdersInfo(params)
      message.success("保存成功")
    }
    // 发送操作成功的事件
    // 关闭当前 Tab
    delView(unref(currentRoute))
    emit('success')
    await push({ name: 'OrdersInfo' })
  } finally {
    formLoading.value = false
  }
}

/**
 一键解析地址
 */
const HandleAddress = () => {
  formLoading.value = true
  UtilsApi.AnalyzeAddress(needHandleAddress.value).then(res => {
    // 赋值地址信息
    formData.value.province = res.province;
    formData.value.city = res.city;
    formData.value.district = res.county;
    pcd.value = [res.province, res.city, res.county]
    formData.value.address = res.town + res.detail;
    formData.value.phone = res.phonenum;
    formData.value.manager = res.person;
    // 清空待处理地址
    needHandleAddress.value = ''
    console.log(res)
  }).finally(() => { formLoading.value = false })
}

/**
 选择收货方表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  resetAddressFiled();
  formData.value.businessBelong = parseInt(data.belongTo) || undefined; // 业务归属
  formData.value.customerType = data.customerType; // 分销商类型
  formData.value.distributorId = data.id; // 分销商编号
  distributorName.value = data.distributorName; // 分销商名称
  formData.value.channel = parseInt(data.customerChannelDistribute); // 渠道
  formData.value.customerLevel = data.distributorLevel; // 客户等级
  console.log(formData.value)
}

/**
 * 选择地址表格数据并回显到表单中
 * @param data
 */
const handleClickAddressRow = (data: CustomerAddressVO) => {
  console.log(data)
  pcd.value = [data.province, data.city, data.district]
  //@ts-ignore
  formData.value.addressId = data.id;
  formData.value.address = data.address; // 地址
  formData.value.manager = data.manager; // 联系人
  formData.value.phone = data.phone; // 电话
  formData.value.province = data.province;
  formData.value.city = data.city;
  formData.value.district = data.district;
}

/**
 *  重置表单
 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    warehouse: undefined,
    warehouseCode: undefined,
    specifySendDate: undefined,
    erpOrderNumber: undefined,
    isToErp: 0,
    addressId: undefined,
    province: undefined,
    city: undefined,
    district: undefined,
    sendQuantity: undefined,
    manager: undefined,
    phone: undefined,
    address: undefined,
    orderId: undefined,
    orderDate: undefined,
    orderStatus: undefined,
    sendType: 0,//默认正常发货
    salesType: 0,
    supplierId: undefined,
    remark: undefined,
    logisticsCompany: undefined,
    logisticsNumber: undefined,
    salesAmount: undefined,
    bigCustomerAddress: undefined,
    customerLevel: undefined,
    customerType: undefined,
    totalGoods: undefined,
    totalWeight: undefined,
    requirement: undefined,
    brand: undefined,
    externalOrderNumber: undefined,
    channel: undefined,
    orderType: 0,
    isTraceless: 0,
    commitDate: undefined,
    isDf: 0,
    cusDfType: undefined,
    receiveSupplierId: undefined,
    distributorId: undefined,
    businessBelong: undefined,
  }
  distributorName.value = '';
  pcd.value = []
  formRef.value?.resetFields()
}

/**
 * 清除填充的字段
 */

const resetFillFiled = () => {
  formData.value.manager = undefined
  formData.value.phone = undefined
  formData.value.address = undefined
  formData.value.customerLevel = undefined
  formData.value.customerType = undefined
  formData.value.channel = undefined
  formData.value.distributorId = undefined
  formData.value.businessBelong = undefined
  distributorName.value = '';
  pcd.value = []
}

/**
 * 重置地址字段
 */
const resetAddressFiled = () => {
  formData.value.manager = undefined
  formData.value.phone = undefined
  formData.value.address = undefined
  pcd.value = []
}

/**
 * 获取收货方列表
 */
const getConsigneeList = async () => {
  CustomerInfoApi.getAllCustomerInfo({ pageNo: 1, pageSize: 100 }).then((res) => {
    consigneeList.value = res.list
    consigneeMap.value = res.list.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, new Map());
    consigneeTotal.value = res.total
  })
}

/**
 * 获取发货仓库列表
 */
const warehouseOptions = ref([])//发货仓库列表
const queryWarehouseList = async () => {
  SendRepositoryApi.getSendRepositoryPage({ pageNo: 1, pageSize: 100 }).then((res) => {
    warehouseOptions.value = res.list.map(item => {
      return {
        label: item.name,
        value: item.code
      }
    })
  })
}
const handleWarehouseChange = (val: number) => {
  console.log("warehouseCode:",val)
  formData.value.warehouseCode = val;
  formData.value.warehouse = warehouseOptions.value.find(opt => opt.value === val)?.label;
}

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

const { query } = useRoute() // 查询参数
const queryId = query.id as unknown as number // 从 URL 传递过来的 id 编号

const getDetail = async () => {
  console.log(query)
  if (queryId) {
    // 获取订单详情
    formLoading.value = true
    try {
      const res = await OrdersInfoApi.getOrdersInfo(queryId);
      console.log(res)
      formData.value = {
        ...res,
      }
      pcd.value = [res.province, res.city, res.district]
      console.log(res.ordersDetails)
      ordersDetailFormRef.value.setData(res.ordersDetails)
    } finally {
      formLoading.value = false
    }
  }
}
const init = () =>{
  // 获取收货方列表
  getConsigneeList()

  // 获取仓库信息列表
  queryWarehouseList()

  // 获取子公司列表
  querySubCompanyList()
}


/**
 * 选择框的引用-用来定义点击事件
 */
const selectRef = ref()
onMounted(() => {
  // 判断是否携带查询id参数
  getDetail()
  // 执行初始化过程
  init()
  nextTick(() => {
    if (selectRef.value) {
      // 自定义点击事件逻辑
      const select = selectRef.value?.suffixRef;
      select.onclick = (event: Event) => {
        event.stopPropagation();
        openForm('consignee')
      }
    }
  });
})
</script>


<style scoped>
@import '/src/styles/fx/siderActions.scss';
@import '/src/styles/fx/siderTotal.scss';

.search-select .el-select__caret {
  transform: rotate(0) !important;
  ;
}

.search-select .el-select__caret.is-reverse {
  transform: rotate(0) !important;
}

* {
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 10px 0;
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

.main-content {
  background: var(--el-bg-color);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--el-border-color-light);
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 500;
  margin: 12px 0;
}

.section-header .el-icon {
  font-size: 18px;
  color: var(--el-color-primary);
}

</style>
