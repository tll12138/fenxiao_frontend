<template>
  <Dialog width="1200px" :title="dialogTitle" v-model="dialogVisible" :close-on-click-modal="false">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="140px"
      v-loading="formLoading"
    >
      <ElRow>
        <ElCol :span="8" >
          <el-form-item label="分销商编号" prop="distributorNum">
            <el-input v-model="formData.distributorNum" placeholder="请输入分销商编号" :disabled="isEdit"/>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="供应商编号" prop="supplierId" >
            <el-input v-model="formData.supplierId" placeholder="请输入供应商编号" :disabled="isEdit"/>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="分销商名称" prop="distributorName">
            <el-input v-model="formData.distributorName" placeholder="请输入分销商名称" :disabled="isEdit"/>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="所属子公司" prop="subCompany">
            <el-select v-model="formData.subCompany" placeholder="请选择子公司" clearable filterable style="width: 240px" >
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="显示名称" prop="displayName">
            <el-input v-model="formData.displayName" placeholder="请输入显示名称" />
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="业务归属" prop="belongTo">
            <el-select v-model="formData.belongTo" placeholder="请选择业务归属" filterable clearable>
              <el-option
                  v-for="dict in getStrDictOptions(DICT_TYPE.FX_BELONG)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="分销商等级" prop="distributorLevel">
            <el-select v-model="formData.distributorLevel" placeholder="请选择分销商等级" filterable :disabled="isEdit">
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="是否合作" prop="isCooperate">
            <el-select v-model="formData.isCooperate" placeholder="请选择是否合作" filterable :disabled="isEdit">
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="是否冻结" prop="isFreeze">
            <el-select v-model="formData.isFreeze" placeholder="请选择是否冻结" filterable :disabled="isEdit">
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="客户渠道属性" prop="customerChannelDistribute">
            <el-select v-model="formData.customerChannelDistribute" placeholder="请选择客户渠道属性" filterable>
              <el-option
                  v-for="dict in getStrDictOptions(DICT_TYPE.FX_CUSTOMER_DISTRIBUTE)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="品牌" prop="brand">
            <el-select v-model="formData.brand" placeholder="请选择品牌" filterable>
              <el-option
                  v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="客户类型" prop="customerType">
            <el-select v-model="formData.isExcessOrder" placeholder="请选择客户类型" filterable :disabled="isEdit">
              <el-option
                v-for="dict in getIntDictOptions(DICT_TYPE.FX_CUSTOMER_TYPE)"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
        <ElCol :span="8">
          <el-form-item label="是否允许超额提货" prop="isExcessOrder">
            <el-select v-model="formData.isExcessOrder" placeholder="请选择是否允许超额提货" filterable :disabled="isEdit">
              <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </ElCol>
      </ElRow>
    </el-form>

    <!-- 子表的表单 -->
    <el-tabs v-model="subTabsName">
      <el-tab-pane label="分销商地址" name="customerAddress">
        <CustomerAddressForm ref="customerAddressFormRef" :customerAddressList="formData.customerAddressList" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import {CreateCustomerInfoVO, CustomerInfoApi, UpdateCustomerInfoVO} from '@/api/fx/customerinfo'
import CustomerAddressForm from './components/CustomerAddressForm.vue'
import {SubCompany} from "@/views/fx/customerinfo/data";
import {PropType} from "vue";
import {CreateCustomerAddressVO, CustomerAddressVO} from "@/api/fx/customeraddress";
/** 分销商基础信息 表单 */
defineOptions({ name: 'CustomerInfoForm' })
defineProps({
  subCompanyList: {
    type: Array as PropType<SubCompany[]>,
    default: () => [],
  },
})
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const isEdit = ref(false)
const formData = ref({
  id: undefined,
  supplierId: undefined,
  distributorNum: undefined,
  distributorName: undefined,
  subCompany: undefined,
  displayName: undefined,
  belongTo: undefined,
  distributorLevel: undefined,
  isCooperate: 1,
  isFreeze: 0,
  customerChannelDistribute: undefined,
  brand: undefined,
  customerType: 0,
  latestOrderDate: undefined,
  isExcessOrder: 0,
  customerAddressList: [] as CreateCustomerAddressVO[],
  customerAccounts: [] as CreateCustomerAddressVO[],
})
const formRules = reactive({
  distributorName: [
    { required: true, message: '请输入分销商名称', trigger: 'blur' },
    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  distributorLevel: [
    { required: true, message: '请选择分销商级别', trigger: 'blur' },
  ],
  // customerChannelDistribute: [
  //   { required: true, message: '请选择客户渠道属性', trigger: 'blur' },
  // ],
  // customerType: [
  //   { required: true, message: '请选择客户类型', trigger: 'blur' },
  // ],
  isExcessOrder: [
    { required: true, message: '请选择是否允许超额提货', trigger: 'blur' },
  ],
  isCooperate: [
    { required: true, message: '请选择是否合作', trigger: 'blur' },
  ],
  subCompany: [
    { required: true, message: '请选择所属子公司', trigger: 'blur' },
  ],
  supplierId: [
    { required: true, message: '请输入供应商编号', trigger: 'blur' },
  ],
  distributorNum: [
    { required: true, message: '请输入分销商编号', trigger: 'blur' },
  ]
})
const formRef = ref() // 表单 Ref

/** 子表的表单 */
const subTabsName = ref('customerAddress')
const customerAddressFormRef = ref()

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  isEdit.value = false
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    isEdit.value = true
    try {
      formData.value = await CustomerInfoApi.getCustomerInfo(id)
    } finally {
      formLoading.value = false
    }
  }

}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调

const handleCreate = async () => {
  const data = { ...formData.value } as unknown as CreateCustomerInfoVO
  // 拼接子表的数据
  const addressList = customerAddressFormRef.value.getData() as CreateCustomerAddressVO[]
  console.log(addressList)
  const realAddressList = [] as CreateCustomerAddressVO[]
  if (addressList){
    for (const address of addressList) {
      const addressData = address.province
      realAddressList.push({
        province: addressData[0],
        city: addressData[1],
        district: addressData[2],
        address: address.address,
        manager: address.manager,
        phone: address.phone,
      })
    }
    data.customerAddressList = realAddressList
  }
  CustomerInfoApi.createCustomerInfo(data).then((res) => {
    if (res){
      message.success('账号创建成功')
    }else {
      message.error('账号创建失败')
    }
  })
}


const handleUpdate = async () => {
  //解除禁用
  isEdit.value = false
  const data = { ...formData.value } as unknown as UpdateCustomerInfoVO
  // 拼接子表的数据
  const addressList = customerAddressFormRef.value.getData() as CustomerAddressVO[]
  const realAddressList = [] as CustomerAddressVO[]
  if (addressList){
    for (const address of addressList) {
      const addressData = address.province
      realAddressList.push({
        id: address.id ,// ID
        distributorNum: address.distributorNum ,// 分销商编号
        province: addressData[0],
        city: addressData[1],
        district: addressData[2],
        address: address.address,
        manager: address.manager,
        phone: address.phone,
      })
    }
    data.customerAddressList = realAddressList
    console.log(data.customerAddressList)
    CustomerInfoApi.updateCustomerInfo(data).then((res) => {
      if (res){
        message.success('账号更新成功')
      }else {
        message.error('账号更新失败')
      }
    })
  }
}
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  try {
    await customerAddressFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'customerAddress'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
      if (formData.value.id){
        await handleUpdate()
      }else {
        await handleCreate()
      }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    supplierId: undefined,
    distributorNum: undefined,
    distributorName: undefined,
    subCompany: undefined,
    displayName: undefined,
    belongTo: undefined,
    distributorLevel: undefined,
    isCooperate: 1,
    isFreeze: 0,
    customerChannelDistribute: undefined,
    brand: undefined,
    customerType: 0,
    latestOrderDate: undefined,
    isExcessOrder: 0,
    customerAddressList: [] as CreateCustomerAddressVO[],
    customerAccounts: [] as CreateCustomerAddressVO[],
  }
  formRef.value?.resetFields()
}
</script>
