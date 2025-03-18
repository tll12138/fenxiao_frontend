<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="产品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入产品编码" />
      </el-form-item>
      <el-form-item label="规格" prop="category">
        <el-input v-model="formData.category" placeholder="请输入规格" />
      </el-form-item>
      <el-form-item label="销售最低价" prop="saleprice">
        <el-input v-model="formData.saleprice" placeholder="请输入销售最低价" />
      </el-form-item>
      <el-form-item label="客户等级" prop="distributorLevel">
        <el-select v-model="formData.distributorLevel" placeholder="请选择客户等级">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_CUSTOMER_LEVEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入产品名称" />
      </el-form-item>
      <el-form-item label="是否基础类型" prop="isNormal">
        <el-select v-model="formData.isNormal" placeholder="请选择是否基础类型">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
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
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { PricelistApi, PricelistVO } from '@/api/fx/pricelist'
import {DICT_TYPE, getIntDictOptions, getStrDictOptions} from "@/utils/dict";
import { CustomerInfoApi, CustomerInfoVO } from '@/api/fx/customerinfo'

/** 分销价格对照 表单 */
defineOptions({ name: 'PricelistForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗
// 客户列表相关状态
const consigneeList = ref<CustomerInfoVO[]>([])
const currentPage = ref(1)
const pageSize = ref(20)
const loadingMore = ref(false)
const hasMore = ref(true)

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
  distributorLevel: undefined,
  name: undefined,
  isNormal: undefined,
  brand: undefined,
  createTime: undefined,
})
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
// const open = async (type: string, id?: number) => {
//   dialogVisible.value = true
//   dialogTitle.value = t('action.' + type)
//   formType.value = type
//   resetForm()
//   // 修改时，设置数据
//   if (id) {
//     formLoading.value = true
//     try {
//       formData.value = await PricelistApi.getPricelist(id)
//     } finally {
//       formLoading.value = false
//     }
//   }
// }
/** 打开弹窗时预加载已选客户 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()

  // 修改时，设置数据并加载关联客户
  if (id) {
    formLoading.value = true
    try {
      const data = await PricelistApi.getPricelist(id)
      formData.value = data

      // 如果已有客户ID，预加载客户信息
      if (data.customer) {
        const existing = consigneeList.value.find(item => item.id === data.customer)
        if (!existing) {
          const customer = await CustomerInfoApi.getCustomerInfo(data.customer)
          consigneeList.value = [customer, ...consigneeList.value]
        }
      }
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

const handleChange = (row) => {
  formData.customer = row
}
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
    distributorLevel: undefined,
    name: undefined,
    isNormal: undefined,
    brand: undefined,
    createTime: undefined,
  }
  formRef.value?.resetFields()
}

/** 处理下拉框显示/隐藏 */
const handleSelectVisible = (visible: boolean) => {
  if (visible) {
    // 重置分页参数
    currentPage.value = 1
    hasMore.value = true
    consigneeList.value = []
    loadConsigneeList()

    // 添加滚动监听
    nextTick(() => {
      const popper = document.querySelector('.customer-select-popper .el-select-dropdown__wrap')
      if (popper) {
        popper.addEventListener('scroll', handleScroll)
      }
    })
  } else {
    // 移除滚动监听
    const popper = document.querySelector('.customer-select-popper .el-select-dropdown__wrap')
    if (popper) {
      popper.removeEventListener('scroll', handleScroll)
    }
  }
}

/** 处理滚动事件 */
const handleScroll = (e: Event) => {
  const target = e.target as HTMLElement
  const { scrollTop, scrollHeight, clientHeight } = target
  // 滚动到底部时加载更多（预留5px缓冲）
  if (scrollHeight - scrollTop <= clientHeight + 5 && !loadingMore.value && hasMore.value) {
    loadConsigneeList()
  }
}

/** 加载客户列表 */
const loadConsigneeList = async () => {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true

  try {
    const res = await CustomerInfoApi.getCustomerInfoPage({
      pageNo: currentPage.value,
      pageSize: pageSize.value
    })

    // 合并数据
    consigneeList.value = [...consigneeList.value, ...res.list]
    // 判断是否还有更多
    hasMore.value = res.list.length >= pageSize.value
    currentPage.value++
  } finally {
    loadingMore.value = false
  }
}

</script>
<style>
/* 添加下拉框滚动条样式 */
.customer-select-popper .el-select-dropdown__wrap {
  max-height: 400px;
  overflow-y: auto;
}
</style>
