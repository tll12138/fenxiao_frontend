<template>
  <div>
    <div class="flex justify-center align-center">
      <ContentWrap class="w-66% ">
  
        <div class="header-content">
          <div class="title-section">
            <el-icon class="title-icon">
              <Document />
            </el-icon>
            <span class="page-title">发票申请</span>
          </div>
          <img src="@/assets/imgs/pqsy.png" class="logo-image" />
        </div>

        <el-form ref="formRef" class="bg-white px-10 py-5 " :model="formData" :rules="formRules"
          label-width="100px" size="default" v-loading="formLoading">

          <!-- 销售抬头-->
          <div class="section-header">
            <el-icon><Paperclip /></el-icon>
            <span>开票信息</span>
          </div>

          <ElRow>
            <ElCol :span="7">
                <el-form-item label="申请人" prop="applyMan">
                  <el-select v-model="formData.applyMan" multiple placeholder="请选择申请人" :disabled="true">
                    <el-option
                      v-for="item in userOptions"
                      :key="item.id"
                      :label="item.nickname"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="申请日期" prop="applyDate">
                <el-date-picker
                  v-model="formData.applyDate"
                  type="date"
                  placeholder="请选择申请日期"
                  :disabled="true"
                />
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="客户名称" prop="cusName">
                <el-select ref="selectCustomerRef" class="search-select" :suffix-icon="ConsigneeIcon as any"
                           v-model="distributorName" @change="handleConsigneeChange" placeholder="请选择客户" filterable clearable>
                  <el-option v-for="dict in consigneeList" :key="dict.id" :label="dict.distributorName"
                             :value="dict.id" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="发票类型" prop="billType">
                <el-select
                  v-model="formData.billType"
                  placeholder="请选择发票类型"
                  clearable
                  class="!w-240px"
                >
                  <el-option
                    v-for="dict in getDictOptions(DICT_TYPE.FX_BILL_TYPE)"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
            </ElCol>

            <ElCol :span="7">
              <el-form-item label="销售单" prop="saleOrder">
                <el-select ref="selectSaleOrderRef" class="search-select" :suffix-icon="ConsigneeIcon as any"
                           v-model="saleOrderId" @change="handleSaleChange" placeholder="请选择销售单" filterable clearable>
                  <el-option v-for="dict in ordersInfoList" :key="dict.id" :label="dict.orderId"
                             :value="dict.id" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="发票抬头" prop="billHead">
                <el-select v-model="formData.billHead" placeholder="请选择发票抬头" clearable filterable>
                  <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)" :key="dict.value"
                             :label="dict.label" :value="dict.value" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="开票财务" prop="maker">
                <el-select v-model="formData.maker" multiple placeholder="请选择开票财务" >
                  <el-option
                    v-for="item in userOptions"
                    :key="item.id"
                    :label="item.nickname"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="14">
              <el-form-item label="发票邮箱（自动发送）" prop="email" label-width="200px">
                <el-input v-model="formData.email" placeholder="请输入发票邮箱" />
              </el-form-item>
            </ElCol>
            <ElCol :span="21">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" placeholder="" />
              </el-form-item>
            </ElCol>
          </ElRow>


          <div class="section-header">
            <el-icon>
              <MapLocation />
            </el-icon>
            <span>开票内容</span>
          </div>
          <ElRow>
            <ElCol :span="7">
              <el-form-item label="开票信息"  prop="billInfo">
                <el-select ref="selectEmailRef" class="search-select" :suffix-icon="ConsigneeIcon as any"
                           v-model="billInfo" @change="handleSaleChange" placeholder="请选择开票信息" filterable clearable>
                  <el-option v-for="dict in emailList" :key="dict.id" :label="dict.email"
                             :value="dict.id" />
                </el-select>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="购方名称" prop="purchaserName">
                <el-input v-model="formData.purchaserName" placeholder="请输入购方名称" />
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="纳税人识别号" prop="taxNo" label-width="120px" >
                <el-input v-model="formData.taxNo" placeholder="请输入纳税人识别号"  class="auto-width-form-item"/>
              </el-form-item>
            </ElCol>
            <ElCol :span="21">
              <el-form-item label="开户行及账号" prop="bankNo" label-width="120px" >
                <el-input v-model="formData.taxNo" placeholder="请输入开户行及账号" class="auto-width-form-item" />
              </el-form-item>
            </ElCol>
            <ElCol :span="21">
              <el-form-item label="地址及电话" prop="address" label-width="120px" >
                <el-input v-model="formData.address" placeholder="请输入地址及电话" class="auto-width-form-item"/>
              </el-form-item>
            </ElCol>
            <ElCol :span="7">
              <el-form-item label="金额合计" prop="amount">
                {{ billApplyDetailFormRef?.totalAmount || 0 }}
              </el-form-item>
            </ElCol>
            <ElCol :span="7" :offset="7" >
              <el-form-item label="金额合计(大写)" prop="totalAmount" label-width="120px">
                {{ billApplyDetailFormRef?.totalAmount || 0 }}
              </el-form-item>
            </ElCol>
          </ElRow>

          <BillApplyDetailForm
            ref="billApplyDetailFormRef"
          />

        </el-form>
      </ContentWrap>
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
            <el-button @click="push({ name: 'BillApply' })" class="action-button" text>
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
  </div>

</template>
<script setup lang="ts">
import {DICT_TYPE, getDictOptions, getIntDictOptions, getStrDictOptions} from '@/utils/dict'
import BillApplyDetailForm from './components/BillApplyDetailForm.vue'
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue"
import { CustomerInfoApi, CustomerInfoVO } from "@/api/fx/customerinfo";
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";
import { useTagsViewStore } from "@/store/modules/tagsView";
import { onMounted, ref } from "vue";
import {
  Document,
  DocumentAdd,
  Check,
  Back,
  Paperclip,
  MapLocation
} from '@element-plus/icons-vue'
import * as UserApi from '@/api/system/user'
import {BillApplyApi, BillApplyVO} from "@/api/fx/billapply";
import {useUserStore} from "@/store/modules/user";
import {OrdersInfoApi, OrdersInfoVO} from "@/api/fx/ordersinfo";
import {EmailAddressApi, EmailAddressVO} from "@/api/fx/emailaddress";
/** 销售单 表单 */
defineOptions({ name: 'BillApplyForm' })

const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { push, currentRoute } = useRouter() // 路由
const userId = useUserStore().getUser.id // 当前登录的编号
const initialApplyMan = [userId];
/**
 * 表单相关变量
 */
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('create') // 表单的类型：create - 新增；update - 修改
const formRules = reactive({
  cusName: [{ required: true, message: '客户名称不能为空', trigger: 'blur' }],
  bankNo: [{ required: true, message: '开户行及账号不能为空', trigger: 'blur' }],
  maker: [{ required: true, message: '开票财务不能为空', trigger: 'blur' }],
  billType: [{ required: true, message: '发票类型不能为空', trigger: 'blur' }],
  saleOrder: [{ required: true, message: '销售单不能为空', trigger: 'blur' }],
  channel: [{ required: true, message: '渠道不能为空', trigger: 'blur' }],
  billHead: [{ required: true, message: '发票抬头不能为空', trigger: 'blur' }],
  purchaserName: [{ required: true, message: '购方名称不能为空', trigger: 'blur' }],
  taxNo: [{ required: true, message: '纳税人识别号不能为空', trigger: 'blur' }],
  email: [{ required: true, message: '发票邮箱不能为空', trigger: 'blur' }],
  address: [{ required: true, message: '地址及电话不能为空', trigger: 'blur' }],
})
const formData = ref<BillApplyVO>({
  id: undefined,
  applyMan: undefined,
  applyDate: undefined,
  billDate: undefined,
  address: undefined,
  bankNo: undefined,
  amount: undefined,
  maker: undefined,
  remark: undefined,
  billType: undefined,
  totalAmount: undefined,
  saleOrder: [],
  billHead: undefined,
  document: undefined,
  financialStatement: undefined,
  purchaserName: undefined,
  taxNo: undefined,
  cusName: undefined,
  billInfo: undefined,
  rid: undefined,
  isOver: undefined,
  isYj: undefined,
  email: undefined,
  emailId: undefined,
  isSend: undefined,
} as BillApplyVO)
const formRef = ref() // 表单 Ref

/**
 * 收货方表格
 */
const consigneeRef = ref() //收货方表格引用
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeMap = ref<Map<number, CustomerInfoVO>>(new Map<number, CustomerInfoVO>())
const consigneeTotal = ref<number>() //收货方数据

/**
 * 销售单列表
 */
const ordersInfoList = ref<OrdersInfoVO[]>()
const ordersInfoMap = ref<Map<number, OrdersInfoVO>>(new Map<number, OrdersInfoVO>())
const ordersInfoTotal = ref<number>()

/**
 * 邮箱列表
 */
const emailList = ref<EmailAddressVO[]>()
const emailMap = ref<Map<number, EmailAddressVO>>(new Map<number, EmailAddressVO>())
const emailTotal = ref<number>()

/**
 * 子表的表单
 */
const billApplyDetailFormRef = ref()
const distributorName = ref('')//客户名称
const distributorId = ref('')//客户id
const saleOrderId = ref('')//销售单id
const emailId = ref('')//邮箱id

/**
 * 子表单
 * @param str
 */
const openForm = (str: string) => {
 if (str === 'consignee') {
    consigneeRef.value.open()
  }
}


/**
 * 销售单输入框变更
 * @param id
 */
const handleSaleChange = (id: number) => {
  if (!id) {
    // resetFillFiled();
    return;
  }
  console.log(ordersInfoMap.value)
  const data = ordersInfoMap.value[id]
  handleClickSaleRow(data as OrdersInfoVO)
}

/**
 * 客户输入框变更
 * @param id
 */
const handleConsigneeChange = (id: number) => {
  if (!id) {
    resetFillFiled();
    return;
  }
  console.log(consigneeMap.value)
  const data = consigneeMap.value[id]
  handleClickConsigneeRow(data as CustomerInfoVO)
}

/**
 * 邮箱输入框变更
 * @param id
 */
const handleEmailChange = (id: number) => {
  if (!id) {
    // resetFillFiled();
    return;
  }
  console.log(emailMap.value)
  const data = emailMap.value[id]
  handleClickEmailRow(data as EmailAddressVO)
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
      formData.value = await BillApplyApi.getBillApply(id)
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
    await billApplyDetailFormRef.value.validate()
  } catch (e) {
    return
  }
  const detailList = billApplyDetailFormRef.value.getData()
  if (detailList.length === 0) {
    message.warning('请添加商品明细')
    return
  }

  // 动态获取 totalAmount 的值
  const totalAmount = billApplyDetailFormRef.value.totalAmount?.toFixed(2)

  //构建请求��数
  let params = {
    id: formData.value.id,
    // --------------基础信息-----------------
    applyMan: formData.value.applyMan, // 申请人
    applyDate: formData.value.applyDate, // 申请日期
    billDate: formData.value.billDate, // 开票日期
    address: formData.value.address, // 地址
    bankNo: formData.value.bankNo, // 开户行及账号
    maker: formData.value.maker, // 开票财务
    remark: formData.value.remark, // 备注
    billType: formData.value.billType, // 发票类型
    totalAmount: formData.value.totalAmount, // 金额合计(大写)

    // -----------------商品明细----------------
    billApplyDetails: detailList,

    //汇总信息
    amount: totalAmount,
  }
  // 提交请求
  formLoading.value = true
  try {
    if (formType.value === 'create') {
      await BillApplyApi.createBillApply(params)
      message.success("创建成功")
    } else {
      await BillApplyApi.saveBillApply(params)
      message.success("保存成功")
    }
    // 发送操作成功的事件
    // 关闭当前 Tab
    delView(unref(currentRoute))
    emit('success')
    await push({ name: 'BillApply' })
  } finally {
    formLoading.value = false
  }
}

/**
 选择收货方表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  distributorName.value = data.distributorName; // 分销商名称
  distributorId.value = data.id; // 分销商名称
  console.log(formData.value)
}

/**
 选择销售单表格数据并回显到表单中
 */
const handleClickSaleRow = (data: OrdersInfoVO) => {
  saleOrderId.value = data.orderId; // 销售单id
  console.log(formData.value)
}

/**
 选择邮箱表格数据并回显到表单中
 */
const handleClickEmailRow = (data: EmailAddressVO) => {
  emailId.value = data.id; // 销售单id
  console.log(formData.value)
}

/**
 *  重置表单
 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    applyMan: undefined,
    applyDate: undefined,
    billDate: undefined,
    address: undefined,
    bankNo: undefined,
    amount: undefined,
    maker: undefined,
    remark: undefined,
    billType: undefined,
    totalAmount: undefined,
    saleOrder: [],
    billHead: undefined,
    document: undefined,
    financialStatement: undefined,
    purchaserName: undefined,
    taxNo: undefined,
    cusName: undefined,
    billInfo: undefined,
    rid: undefined,
    isOver: undefined,
    isYj: undefined,
    email: undefined,
    emailId: undefined,
    isSend: undefined,
  }
  distributorName.value = '';
  distributorId.value = '';
  formRef.value?.resetFields()
}

/**
 * 清除填充的字段
 */

const resetFillFiled = () => {
  formData.value.saleOrder = undefined
  formData.value.cusName = undefined
  formData.value.address = undefined
  formData.value.maker = undefined
  formData.value.billInfo = undefined
  formData.value.taxNo = undefined
  formData.value.bankNo = undefined
  formData.value.purchaserName = undefined
  distributorName.value = '';
  distributorId.value = '';
}

/**
 * 获取收货方列表
 */
const getConsigneeList = async () => {
  CustomerInfoApi.getCustomerInfoPage({ pageNo: 1, pageSize: 100 }).then((res) => {
    consigneeList.value = res.list
    consigneeMap.value = res.list.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, new Map());
    consigneeTotal.value = res.total
  })
}
/**
 * 获取销售单列表
 */
const getSaleOrderList = async () => {
  OrdersInfoApi.getOrdersInfoPage({ pageNo: 1, pageSize: 100, distributorId: formData.value.cusName||'0'}).then((res) => {
    ordersInfoList.value = res.list
    ordersInfoMap.value = res.list.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, new Map());
    ordersInfoTotal.value = res.total
  })
}
/**
 * 获取邮箱列表
 */
const getEmailList = async () => {
  EmailAddressApi.getEmailAddressPage({ pageNo: 1, pageSize: 100, customerId: formData.value.cusName||'0'}).then((res) => {
    emailList.value = res.list
    emailMap.value = res.list.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, new Map());
    emailTotal.value = res.total
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
      const res = await BillApplyApi.getBillApply(queryId);
      console.log(res)
      formData.value = {
        ...res,
      }
      billApplyDetailFormRef.value.setData(res.ordersDetails)
    } finally {
      formLoading.value = false
    }
  }
}
const init = () =>{
  // 获取收货方列表
  getConsigneeList()
  getSaleOrderList()
  getEmailList()
  formData.value.applyMan = initialApplyMan
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  formData.value.applyDate = `${year}-${month}-${day}`;
}


/**
 * 选择框的引用-用来定义点击事件
 */
const selectCustomerRef = ref()
const selectSaleOrderRef = ref()
const selectEmailRef = ref()
/** 初始化 */
const userOptions = ref<UserApi.UserVO[]>([]) // 用户列表
onMounted(async() => {
  // 获得用户列表
  userOptions.value = await UserApi.getSimpleUserList()
  // 判断是否携带查询id参数
  await getDetail()
  // 执行初始化过程
  init()
  await nextTick(() => {
    if (selectCustomerRef.value) {
      // 自定义点击事件逻辑
      const select = selectCustomerRef.value?.suffixRef;
      select.onclick = (event: Event) => {
        event.stopPropagation();
        openForm('consignee');
      };
    }
    if (selectSaleOrderRef.value) {
      // 自定义点击事件逻辑
      const select = selectSaleOrderRef.value?.suffixRef;
      select.onclick = (event: Event) => {
        event.stopPropagation();
        openForm('SaleTable');
      };
    }
    if (selectEmailRef.value) {
      // 自定义点击事件逻辑
      const select = selectEmailRef.value?.suffixRef;
      select.onclick = (event: Event) => {
        event.stopPropagation();
        openForm('EmailTable');
      };
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

.auto-width-form-item .el-form-item__content {
  width: auto; /* 让内容区域自适应宽度 */
}

.auto-width-form-item .el-input {
  width: 100%; /* 让输入框占满内容区域 */
}
</style>
