<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="客户" prop="customer">
        <el-input v-model="formData.customer" placeholder="请输入客户" />
      </el-form-item>
      <el-form-item label="产品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入产品编码" />
      </el-form-item>
      <el-form-item label="规格" prop="category">
        <el-input v-model="formData.category" placeholder="请输入规格" />
      </el-form-item>
      <el-form-item label="销售最低价" prop="saleprice">
        <el-input v-model="formData.saleprice" placeholder="请输入销售最低价" />
      </el-form-item>
      <el-form-item label="客户等级" prop="cLevel">
        <el-input v-model="formData.cLevel" placeholder="请输入客户等级" />
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="是否基础类型" prop="isNormal">
        <el-input v-model="formData.isNormal" placeholder="请输入是否基础类型" />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-select v-model="formData.brand" placeholder="请输入品牌" clearable filterable style="width: 240px" >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="formData.createTime"
          type="date"
          value-format="x"
          placeholder="选择创建时间"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PricelistApi, PricelistVO } from '@/api/fx/pricelist'
import {DICT_TYPE, getIntDictOptions} from "@/utils/dict";

/** 分销价格对照 表单 */
defineOptions({ name: 'PricelistForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  customer: undefined,
  skuId: undefined,
  category: undefined,
  saleprice: undefined,
  cLevel: undefined,
  name: undefined,
  isNormal: undefined,
  brand: undefined,
  createTime: undefined,
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
      formData.value = await PricelistApi.getPricelist(id)
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
    const data = formData.value as unknown as PricelistVO
    if (formType.value === 'create') {
      await PricelistApi.createPricelist(data)
      message.success(t('common.createSuccess'))
    } else {
      await PricelistApi.updatePricelist(data)
      message.success(t('common.updateSuccess'))
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
    customer: undefined,
    skuId: undefined,
    category: undefined,
    saleprice: undefined,
    cLevel: undefined,
    name: undefined,
    isNormal: undefined,
    brand: undefined,
    createTime: undefined,
  }
  formRef.value?.resetFields()
}
</script>
