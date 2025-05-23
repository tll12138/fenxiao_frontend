<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="分销商编号" prop="distributorId">
        <el-select ref="selectRef" class="search-select" :suffix-icon="ConsigneeIcon as any"
                   v-model="formData.distributorId" @change="handleChange" placeholder="请选择分销商" filterable clearable>
          <el-option v-for="dict in consigneeList" :key="dict.id" :label="dict.distributorName"
                     :value="dict.distributorNum" />
        </el-select>
      </el-form-item>
      <el-form-item label="分销商名称" prop="distributorName">
        <el-input
            v-model="formData.distributorName"
            placeholder="自动填充名称"
            readonly
        />
      </el-form-item>
      <el-form-item label="余额" prop="balance">
        <el-input v-model="formData.balance" placeholder="请输入余额" :disabled="formType === 'update'"/>
      </el-form-item>
      <el-form-item label="账户编号" prop="accountId">
        <el-input v-model="formData.accountId" placeholder="请输入账户编号" readonly />
      </el-form-item>
      <el-form-item label="暂扣金额" prop="detainAmount">
        <el-input v-model="formData.detainAmount" placeholder="请输入暂扣金额" :disabled="formType === 'update'"/>
      </el-form-item>
      <el-form-item label="是否冻结" prop="isActive">
        <el-select v-model="formData.isActive" placeholder="请输入是否冻结" filterable :disabled="isEdit">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="押金" prop="deposit">-->
<!--        <el-input v-model="formData.deposit" placeholder="请输入押金" />-->
<!--      </el-form-item>-->
      <el-form-item label="业务主体" prop="company">
        <el-select v-model="formData.company" placeholder="请输入业务主体" filterable :disabled="isEdit">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="货补虚拟金额" prop="vAmount">
        <el-input v-model="formData.vAmount" placeholder="请输入货补虚拟金额" :disabled="formType === 'update'"/>
      </el-form-item>
      <el-form-item label="是否允许超额提货" prop="isAllow">
        <el-select v-model="formData.isAllow" placeholder="请输入是否允许超额提货" filterable :disabled="isEdit">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="超额提货额度" prop="quota">
        <el-input v-model="formData.quota" placeholder="请输入超额提货额度" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="是否计算货补" prop="isRep">
        <el-select v-model="formData.isRep" placeholder="请输入是否计算货补" filterable :disabled="isEdit">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="暂扣货补金额" prop="zkVAmount">
        <el-input v-model="formData.zkVAmount" placeholder="请输入暂扣货补金额" :disabled="formType === 'update'"/>
      </el-form-item>
<!--      <el-form-item label="账户名" prop="name">-->
<!--        <el-input v-model="formData.name" placeholder="请输入账户名" />-->
<!--      </el-form-item>-->
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import { CustomerAccountApi, CustomerAccountVO } from '@/api/fx/customeraccount'
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";
import {CustomerInfoApi, CustomerInfoVO} from "@/api/fx/customerinfo";
import {OrdersInfoApi} from "@/api/fx/ordersinfo";

/** 分销商账号 表单 */
defineOptions({ name: 'CustomerAccountForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据
const consigneeMap = ref<Map<number, CustomerInfoVO>>(new Map<number, CustomerInfoVO>())
const consigneeTotal = ref<number>() //收货方数据

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  distributorId: undefined,
  balance: undefined,
  accountId: undefined,
  detainAmount: undefined,
  isActive: undefined,
  deposit: undefined,
  company: undefined,
  vAmount: undefined,
  isAllow: undefined,
  quota: undefined,
  remark: undefined,
  isRep: undefined,
  zkVAmount: undefined,
  name: undefined,
  distributorName: undefined,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await CustomerAccountApi.getCustomerAccount(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as CustomerAccountVO
    if (formType.value === 'create') {
      await CustomerAccountApi.createCustomerAccount(data)
      message.success(t('common.createSuccess'))
    } else {
      await CustomerAccountApi.updateCustomerAccount(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
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
      map[item.id] = item;
      return map;
    }, new Map());
    consigneeTotal.value = res.total
  })
}
const init = () =>{
  // 获取收货方列表
  getConsigneeList()

  // // 获取仓库信息列表
  // queryWarehouseList()
  //
  // // 获取子公司列表
  // querySubCompanyList()
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    distributorId: undefined,
    distributorName: undefined,
    balance: undefined,
    accountId: undefined,
    detainAmount: undefined,
    isActive: undefined,
    deposit: undefined,
    company: undefined,
    vAmount: undefined,
    isAllow: undefined,
    quota: undefined,
    remark: undefined,
    isRep: undefined,
    zkVAmount: undefined,
    name: undefined,
  }
  formRef.value?.resetFields()
}
/**
 * 选择框的引用-用来定义点击事件
 */
const selectRef = ref()
onMounted(() => {
  // 判断是否携带查询id参数
  // getDetail()
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
// 获取选中值时触发
const handleChange = (selectedId) => {
  // 通过ID查找分销商对象
  const selectedDistributor = consigneeList.value.find(
      item => item.distributorNum === selectedId
  )

  // 自动填充名称字段
  if (selectedDistributor) {
    formData.value.distributorName = selectedDistributor.distributorName
    formData.value.accountId = generateUniqueNumber(selectedDistributor.distributorNum)
  } else {
    formData.value.distributorName = ''
    formData.value.accountId = ''
  }
}
function generateUniqueNumber(fixedPart) {
  // 固定部分 + 时间戳 + 随机数
  const timestamp = Date.now().toString().slice(-5); // 取时间戳后5位
  const random = Math.floor(Math.random() * 10000).toString().padStart(3, '0'); // 3位随机数
  return `${fixedPart}${timestamp}${random}`;
}
// const getDetail = async () => {
//   console.log(query)
//   if (queryId) {
//     // 获取订单详情
//     formLoading.value = true
//     try {
//       const res = await OrdersInfoApi.getOrdersInfo(queryId);
//       console.log(res)
//       formData.value = {
//         ...res,
//       }
//       pcd.value = [res.province, res.city, res.district]
//       console.log(res.ordersDetails)
//       ordersDetailFormRef.value.setData(res.ordersDetails)
//     } finally {
//       formLoading.value = false
//     }
//   }
// }
</script>
