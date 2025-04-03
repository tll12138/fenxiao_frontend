<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="商品编码" prop="skuId">
        <el-input v-model="formData.skuId" placeholder="请输入商品编码" />
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="商品简称" prop="shortName">
        <el-input v-model="formData.shortName" placeholder="请输入商品简称" />
      </el-form-item>
      <el-form-item label="标准价" prop="salePrice">
        <el-input v-model="formData.salePrice" placeholder="请输入标准价" />
      </el-form-item>
      <el-form-item label="成本价" prop="costPrice">
        <el-input v-model="formData.costPrice" placeholder="请输入成本价" />
      </el-form-item>
      <el-form-item label="规格" prop="propertiesValue">
        <el-input v-model="formData.propertiesValue" placeholder="请输入规格" />
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input v-model="formData.category" placeholder="请输入分类" />
      </el-form-item>
      <el-form-item label="虚拟分类" prop="vcName">
        <el-input v-model="formData.vcName" placeholder="请输入虚拟分类" />
      </el-form-item>
<!--      <el-form-item label="商品属性" prop="itemType">-->
<!--        <el-select v-model="formData.itemType" placeholder="请选择商品属性">-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="单位" prop="unit">
        <el-input v-model="formData.unit" placeholder="请输入单位" />
      </el-form-item>
<!--      <el-form-item label="商品类型" prop="skuType">-->
<!--        <el-select v-model="formData.skuType" placeholder="请选择商品类型">-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="修改时间" prop="modified">
        <el-date-picker
          v-model="formData.modified"
          type="date"
          value-format="x"
          placeholder="选择修改时间"
        />
      </el-form-item>
      <el-form-item label="开票名称" prop="billingName">
        <el-input v-model="formData.billingName" placeholder="请输入开票名称" />
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="formData.brand" placeholder="请输入品牌" />
      </el-form-item>
      <el-form-item label="商品图片" prop="picBig">
        <el-input v-model="formData.picBig" placeholder="请输入商品图片" />
      </el-form-item>
      <el-form-item label="款式编码" prop="iId">
        <el-input v-model="formData.iId" placeholder="请输入款式编码" />
      </el-form-item>
      <el-form-item label="市场价" prop="marketPrice">
        <el-input v-model="formData.marketPrice" placeholder="请输入市场价" />
      </el-form-item>
      <el-form-item label="是否启用" prop="enabled">
        <el-select v-model="formData.enabled" placeholder="请选择是否启用">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否分销商品" prop="isFx">
        <el-select v-model="formData.isFx" placeholder="请选择是否分销商品">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="实际成本价" prop="actualCostPrice">
        <el-input v-model="formData.actualCostPrice" placeholder="请输入实际成本价" />
      </el-form-item>
      <el-form-item label="销售成本价" prop="saleCostPrice">
        <el-input v-model="formData.saleCostPrice" placeholder="请输入销售成本价" />
      </el-form-item>
      <el-form-item label="一级分类" prop="level1Category">
        <el-input v-model="formData.level1Category" placeholder="请输入一级分类" />
      </el-form-item>
      <el-form-item label="二级分类" prop="level2Category">
        <el-input v-model="formData.level2Category" placeholder="请输入二级分类" />
      </el-form-item>
      <el-form-item label="是否参与计算" prop="isCount">
        <el-select v-model="formData.isCount" placeholder="请选择是否参与计算">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否正装" prop="isFormal">
        <el-select v-model="formData.isFormal" placeholder="请选择是否正装">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="净重(kg)" prop="weight">
        <el-input v-model="formData.weight" placeholder="请输入净重(kg)" />
      </el-form-item>
      <el-form-item label="国标码" prop="scancode">
        <el-input v-model="formData.scancode" placeholder="请输入国标码" />
      </el-form-item>
      <el-form-item label="是否组合商品" prop="isGroup">
        <el-select v-model="formData.isGroup" placeholder="请选择是否组合商品">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="聚水潭唯一id" prop="autoId">
        <el-input v-model="formData.autoId" placeholder="请输入聚水潭唯一id" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { GoodsArchivesApi, GoodsArchivesVO } from '@/api/fx/goodsarchives'

/** 分销商品资料 表单 */
defineOptions({ name: 'GoodsArchivesForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  skuId: undefined,
  name: undefined,
  shortName: undefined,
  salePrice: undefined,
  costPrice: undefined,
  propertiesValue: undefined,
  category: undefined,
  vcName: undefined,
  itemType: undefined,
  unit: undefined,
  skuType: undefined,
  modified: undefined,
  billingName: undefined,
  brand: undefined,
  picBig: undefined,
  iId: undefined,
  marketPrice: undefined,
  enabled: undefined,
  isFx: undefined,
  actualCostPrice: undefined,
  saleCostPrice: undefined,
  level1Category: undefined,
  level2Category: undefined,
  isCount: undefined,
  isFormal: undefined,
  weight: undefined,
  scancode: undefined,
  isGroup: undefined,
  autoId: undefined,
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
      formData.value = await GoodsArchivesApi.getGoodsArchives(id)
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
    const data = formData.value as unknown as GoodsArchivesVO
    if (formType.value === 'create') {
      await GoodsArchivesApi.createGoodsArchives(data)
      message.success(t('common.createSuccess'))
    } else {
      await GoodsArchivesApi.updateGoodsArchives(data)
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
    skuId: undefined,
    name: undefined,
    shortName: undefined,
    salePrice: undefined,
    costPrice: undefined,
    propertiesValue: undefined,
    category: undefined,
    vcName: undefined,
    itemType: undefined,
    unit: undefined,
    skuType: undefined,
    modified: undefined,
    billingName: undefined,
    brand: undefined,
    picBig: undefined,
    iId: undefined,
    marketPrice: undefined,
    enabled: undefined,
    isFx: undefined,
    actualCostPrice: undefined,
    saleCostPrice: undefined,
    level1Category: undefined,
    level2Category: undefined,
    isCount: undefined,
    isFormal: undefined,
    weight: undefined,
    scancode: undefined,
    isGroup: undefined,
    autoId: undefined,
  }
  formRef.value?.resetFields()
}
</script>
