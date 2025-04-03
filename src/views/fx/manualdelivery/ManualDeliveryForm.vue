<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="快递公司" prop="expressCompany">
        <el-select v-model="formData.expressCompany" placeholder="请选择快递公司">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_WL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="快递公司名称" prop="expressName">
        <el-text>{{ formData.expressName  }}</el-text>
<!--        <el-input v-model="formData.expressName" placeholder="" readonly />-->
      </el-form-item>
      <el-form-item label="快递公司编号" prop="expressId">
        <el-text>{{ formData.expressId  }}</el-text>
<!--        <el-input v-model="formData.expressId" placeholder="" readonly />-->
      </el-form-item>
      <el-form-item label="快递单号" prop="express">
        <el-input v-model="formData.express" placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item label="关联销售单" prop="saleId">
        <el-input
          v-model="formData.saleId"
          placeholder="请选择关联销售单"
          readonly
          @click="openSaleSelect"
        />
      </el-form-item>
      <el-form-item label="销售单号" prop="soId">
        <el-text>{{ formData.soId  }}</el-text>
<!--        <el-input v-model="formData.soId" placeholder="请输入销售单号" />-->
      </el-form-item>
      <el-form-item label="手动发货原因" prop="reason">
        <el-input v-model="formData.reason" placeholder="请输入手动发货原因" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
  <OrdersInfoTable
    v-model="saleSelectVisible"
    @click-row="handleSaleSelect"
  />
</template>
<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { ManualDeliveryApi, ManualDeliveryVO } from '@/api/fx/manualdelivery'
import OrdersInfoTable from "@/views/fx/manualdelivery/components/OrdersInfoTable.vue";
import {OrdersInfoVO} from "@/api/fx/ordersinfo";
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";

/** 手动发货信息 表单 */
defineOptions({ name: 'ManualDeliveryForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
const orderInfoRef = ref()
/**
 选择收货方表格数据并回显到表单中
 */
const handleClick = (data: OrdersInfoVO) => {
  resetOrdersFiled();
  formData.value.soId = data.orderId; // 分销商类型
  console.log(formData.value)
}

/**
 * 重置订单字段
 */
const resetOrdersFiled = () => {
  formData.value.soId = undefined
}

// 添加弹窗状态
const saleSelectVisible = ref(false)

// 打开查询面板
const openSaleSelect = () => {
  saleSelectVisible.value = true
}

// 修改 handleSaleSelect 方法
const handleSaleSelect = (event) => {
  formData.value.soId = event.orderId
  formData.value.saleId = event.id
  formData.value.status = event.orderStatus
}

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  expressCompany: undefined,
  expressName: undefined,
  expressId: undefined,
  express: undefined,
  soId: undefined,
  saleId: undefined,
  status: undefined,
  reason: undefined,
})
const formRules = reactive({
  expressCompany: [{ required: true, message: '快递公司不能为空', trigger: 'change' }],
  express: [{ required: true, message: '快递单号不能为空', trigger: 'change' }],
  saleId: [{ required: true, message: '关联销售单不能为空', trigger: 'change' }],
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
      formData.value = await ManualDeliveryApi.getManualDelivery(id)
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
    const data = formData.value as unknown as ManualDeliveryVO
    if (formType.value === 'create') {
      await ManualDeliveryApi.createManualDelivery(data)
      message.success(t('common.createSuccess'))
    } else {
      await ManualDeliveryApi.updateManualDelivery(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}
watch(() => formData.value.expressCompany, (newVal) => {
  const options = getStrDictOptions(DICT_TYPE.FX_WL)
  const selected = options.find(item => item.value === newVal)
  if (selected) {
    formData.value.expressName = selected.label
    formData.value.expressId = selected.value
  }
})

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    expressCompany: undefined,
    expressName: undefined,
    expressId: undefined,
    express: undefined,
    soId: undefined,
    saleId: undefined,
    status: undefined,
    reason: undefined,
  }
  formRef.value?.resetFields()
}
</script>
