<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :summary-method="getSummaries"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px" size="small">
      <el-table-column label="序号" type="index" width="60" />
<!--       <el-table-column label="商品名称" min-width="150">-->
<!--        <template #default="{ row, $index }">-->
<!--          <el-form-item :prop="`${$index}.vareName`" :rules="formRules.vareName" class="mb-0px!">-->
<!--            <el-select v-model="row.vareName" placeholder="请选择商品名称">-->
<!--                <el-option-->
<!--                  v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--                  :key="dict.value"-->
<!--                  :label="dict.label"-->
<!--                  :value="dict.value"-->
<!--                />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="规格型号" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.wareSpec`" :rules="formRules.wareSpec" class="mb-0px!">
            <el-input v-model="row.wareSpec" placeholder="请输入规格型号" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="计量单位" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.wareUnit`" :rules="formRules.wareUnit" class="mb-0px!">
            <el-input v-model="row.wareUnit" placeholder="请输入计量单位" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="数量" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.num`" :rules="formRules.num" class="mb-0px!">
            <el-input v-model="row.num" @input="updateTotalAmount" placeholder="请输入数量" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="单价" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.price`" :rules="formRules.price" class="mb-0px!">
            <el-input v-model="row.price" @input="updateTotalAmount" placeholder="请输入单价" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="金额" width="90">
        <template #default="scope">
          {{ ((scope.row.price || 0) * (scope.row.num || 0))?.toFixed(2) || 0 }}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="60">
        <template #default="{ $index }">
          <el-button @click="handleDelete($index)" link>—</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
  <el-row justify="center" class="mt-3">
    <el-button @click="handleAdd" round>添加销售商品详情</el-button>
  </el-row>
</template>
<script setup lang="ts">
import { BillApplyApi } from '@/api/fx/billapply'
import {BillGoods} from "@/views/fx/billapply/data";
const formData = ref<BillGoods[]>([])

// 汇总信息
const totalAmount = computed(() => {
  return formData.value.reduce((total, item) => {
    const price = Number(item.price) || 0
    const num = Number(item.num) || 0
    return total + price * num
  }, 0)
})
const totalCount = computed(() => {
  return formData.value.reduce((total, item) => {
    const num = Number(item.num) || 0
    return total + num
  }, 0)
})
const props = defineProps<{
  mainId: undefined // 主表id（主表的关联字段）
}>()
const formLoading = ref(false) // 表单的加载中
const formRules = reactive({
})
const formRef = ref() // 表单 Ref

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.mainId,
  async (val) => {
    // 1. 重置表单
    formData.value = []
    // 2. val 非空，则加载数据
    if (!val) {
      return;
    }
    try {
      formLoading.value = true
      formData.value = await BillApplyApi.getBillApplyDetailListByMainId(val)
    } finally {
      formLoading.value = false
    }
  },
  { immediate: true }
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    id: undefined,
    mainId: undefined,
    vareName: undefined,
    wareSpec: undefined,
    wareUnit: undefined,
    num: undefined,
    amount: undefined,
    price: undefined,
    payment: undefined,
    salTax: undefined,
    hbNum: undefined,
  };
  row.mainId = props.mainId;
  formData.value.push(row);
  updateTotalAmount();
};
// 手动更新 totalAmount 的方法
const updateTotalAmount = () => {
  console.log('更新了 totalAmount', totalAmount.value)
};

// 汇总信息 生成表格汇总行内容的方法
const getSummaries = (param: SummaryMethodProps<BillGoods>) => {
  const { columns } = param;
  const sums: (string | VNode)[] = [];

  columns.forEach((_, index) => {
    if (index === 0) {
      sums[index] = h('div', { style: { textDecoration: 'underline', textAlign: 'center' } }, [
        '合计',
      ]);
    } else if (index === 3) { // 数量列索引
      sums[index] = h('div', { style: { textAlign: 'center' } }, [
        totalCount.value,
      ]);
    } else if (index === 8) { // 金额列索引（根据当前列顺序调整为第8列）
      sums[index] = h('div', { style: { textAlign: 'center' } }, [
        totalAmount.value?.toFixed(2),
      ]);
    } else {
      sums[index] = 'aaa' // 清除非汇总列显示
    }
  });

  return sums;
};

/** 删除按钮操作 */
const handleDelete = (index) => {
  formData.value.splice(index, 1)
}

/** 表单校验 */
const validate = () => {
  return formRef.value.validate()
}

/** 表单值 */
const getData = () => {
  return formData.value
}

/**将表单值暴露给父类 */
defineExpose({ validate, getData,totalAmount })
</script>
