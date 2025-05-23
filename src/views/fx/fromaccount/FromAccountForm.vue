<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="打款方名称" prop="accountName">
        <el-input v-model="formData.accountName" placeholder="请输入打款方名称" />
      </el-form-item>
      <el-form-item label="打款账户号" prop="account">
        <el-input v-model="formData.account" placeholder="请输入打款账户号" />
      </el-form-item>
      <el-form-item label="所属分销商" prop="customerId">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="formData.customerId"
          @update:modelValue="handleChange"
        />
      </el-form-item>
      <el-form-item label="所属分销商名称" prop="customerName">
        <el-input v-model="formData.customerName" placeholder="自动填充名称" :disabled="true"/>
      </el-form-item>
      <el-form-item label="账户类型" prop="accountType">
        <el-select v-model="formData.accountType" placeholder="请选择账户类型">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.ACCOUNT_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效" prop="isActive">
        <el-select v-model="formData.isActive" placeholder="请选择是否有效">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="累计打款次数" prop="totalNum" >
        <el-input v-model="formData.totalNum" placeholder="请输入累计打款次数" :disabled="true"/>
      </el-form-item>
      <el-form-item label="累计打款金额" prop="totalAmt" >
        <el-input v-model="formData.totalAmt" placeholder="请输入累计打款金额" :disabled="true"/>
      </el-form-item>
<!--      <el-form-item label="所属账户名称" prop="accountId">-->
<!--        <el-input v-model="formData.accountId" placeholder="请输入所属账户名称" />-->
<!--      </el-form-item>-->
      <el-form-item label="说明" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入说明" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
</template>
<script setup lang="ts">

import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { FromAccountApi, FromAccountVO } from '@/api/fx/fromaccount'
import ConsigneeSelect from "@/components/Consignee/ConsigneeSelect.vue";
import ConsigneeTable from "@/views/fx/ordersinfo/components/consigneeTable.vue";
import {CustomerInfoVO} from "@/api/fx/customerinfo";



/**  分销打款账户 表单 */
defineOptions({ name: 'FromAccountForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  account: undefined,
  customerId: undefined,
  customerName: undefined,
  accountType: undefined,
  remark: undefined,
  isActive: undefined,
  totalNum: undefined,
  totalAmt: undefined,
  accountName: undefined,
  accountId: undefined,
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

  // 等待DOM更新
  await nextTick()

  // 绑定选择器点击事件
  if (consigneeSelectRef.value) {
    const select = consigneeSelectRef.value.selectRef?.suffixRef
    if (select) {
      select.onclick = (event: Event) => {
        event.stopPropagation()
        consigneeRef.value?.open()
      }
    }
  }

  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await FromAccountApi.getFromAccount(id)
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
    const data = formData.value as unknown as FromAccountVO
    if (formType.value === 'create') {
      await FromAccountApi.createFromAccount(data)
      message.success(t('common.createSuccess'))
    } else {
      await FromAccountApi.updateFromAccount(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}
const consigneeRef = ref() //收货方表格引用
const consigneeSelectRef = ref()
// 获取选中值时触发
const handleChange = (row: CustomerInfoVO) => {
  console.log('[Debug] ConsigneeSelect选择变化:', row)
  formData.value.customerId = row
  // formData.value.customerName = row.distributorName
}
/**
 选择分销商表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  console.log('[Debug] 收到分销商选择数据:', data)
  formData.value.customerId = data.id
  formData.value.customerName = data.distributorName
}

onMounted(() => {

})

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    account: undefined,
    customerId: undefined,
    accountType: undefined,
    remark: undefined,
    isActive: undefined,
    totalNum: undefined,
    totalAmt: undefined,
    accountName: undefined,
    accountId: undefined,
  }
  formRef.value?.resetFields()
}
</script>
