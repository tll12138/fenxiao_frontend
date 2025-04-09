<template>
  <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="0px"
    :inline-message="true">
    <el-table size="small" :header-cell-style="centerCellStyle" :cell-style="centerCellStyle" stripe border show-summary
      :summary-method="getSummaries as any" :data="formData">
      <el-table-column label="序号" type="index" width= "50" />
      <el-table-column label="商品编码" prop="skuId" />
      <el-table-column label="商品名称" width="220" prop="skuName" />
      <el-table-column label="规格" prop="category" />
      <el-table-column label="原销售价" prop="salePrice" />
      <el-table-column label="退货价" prop="returnPrice">
        <template #default="{ row, $index }">
          <el-form-item v-if="row.skuId" :prop="`${$index}.returnPrice`" :rules="formRules.returnPrice" class="mb-0px!">
            <el-input-number v-model="row.returnPrice" placeholder="退货价" :controls="false" size="small" :min="0" 
              @change="(e) => { handleReturnPriceChange(e, $index) }" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="退货数量" prop="returnCount">
        <template #default="{ row, $index }">
          <el-form-item v-if="row.skuId" :prop="`${$index}.returnCount`" :rules="formRules.returnCount" class="mb-0px!">
            <el-input-number v-model="row.returnCount" placeholder="退货数量" :controls="false" :min="0" :max="row.count"
              @change="(e) => { handleReturnCountChange(e, $index) }" size="small" />
          </el-form-item>
        </template>
      </el-table-column>  
      <el-table-column label="退货金额" prop="returnAmt">
        <template #default="scope">
          {{ ((scope.row.returnCount || 0) * (scope.row.returnPrice || 0))?.toFixed(2) || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="原单数量"  prop="count" />
      <el-table-column label="退货类型"  prop="saleType" width="80">
        <template #default="{ row, $index }">
          <el-form-item v-if="row.skuId" :prop="`${$index}.saleType`" :rules="formRules.saleType" class="mb-0px!">
            <el-select v-model="row.saleType" placeholder="销售类型" size="small">
              <el-option v-for="dict in getIntDictOptions(DICT_TYPE.FX_DETAIL_RETURN_TYPE)"
                :key="`${dict.value}_${$index}`" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
  </el-form>

  <GoodsTable ref="goodsTableRef" @click-row="handleClickGoodsRow" />
</template>

<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict';
import GoodsTable from "@/views/fx/ordersinfo/components/goodsTable.vue";
import { Goods } from "@/views/fx/ordersinfo/data";
import { TableColumnCtx } from "element-plus";



// 定义 props 接收来自父组件的初始数据
const props = defineProps({
  initialData: {
    type: Array,
    required: true,
  }
});

const centerCellStyle = {
  textAlign: 'center' as const,
}

const message = useMessage() // 消息弹窗
const formLoading = ref(false) // 表单的加载中
const formData = ref<Goods[]>([])


// 监听 initialData 的变化
watch(
  () => props.initialData,
  (newVal) => {
    // 当父组件传递的数据变化时，清空并重新赋值本地状态
    formData.value = [...newVal as Goods[]];
    formData.value.forEach(item => {
      item.returnCount = item.count
      item.returnPrice = item.salePrice
      item.returnAmt = (item.returnCount || 0) * (item.returnPrice || 0)
    })
  },
  { immediate: true } // 立即执行一次监听器，确保首次渲染时也同步数据
);

const formRules = reactive({
  saleType: [{ required: true, message: '类型不能为空', trigger: 'change' }],
  returnPrice: [{ required: true, message: '退货价不能为空', trigger: 'blur' }],
  returnCount: [
    { required: true, message: '退货数量不能为空', trigger: 'blur' }
  ]
})

const handleReturnCountChange = (e, $index) => {
  const count = formData.value[$index]?.count || 0
  // 退货数量变更，判断是否大于原单数量
  if (e > count) {
    message.warning('退货数量不能大于原单数量')
    formData.value[$index].returnCount = count
  }
  formData.value[$index].saleAmt = (formData.value[$index].returnCount || 0) * (formData.value[$index].returnPrice || 0)
}

const handleReturnPriceChange = (e, $index) => {
  const price = formData.value[$index].salePrice || 0
  // 退货价变更，判断是否大于原单价格
  if (e > price) {
    message.warning('退货价不能大于原单价格')
    formData.value[$index].returnPrice = formData.value[$index].salePrice
  }
  formData.value[$index].saleAmt = (formData.value[$index].returnCount || 0) * (formData.value[$index].returnPrice || 0)
}

// 表单引用，和可见
const formRef = ref() // 表单 Ref


// 汇总信息
const totalReturnAmount = computed(() => {
  if(formData.value === undefined){
    return 0
  }
  return formData.value.reduce((total, item) => {
    if (item.id && item.returnPrice && item.returnCount) {
      return total + (item.returnPrice * item.returnCount)
    } else {
      return total
    }
  }, 0)
})
const totalReturnCount = computed(() => {
  if(formData.value === undefined){
    return 0
  }
  return formData.value.reduce((total, item) => {
    if (item.id && item.returnCount) {
      return total + (item.returnCount)
    } else {
      return total
    }
  }, 0)
})
const totalCount = computed(() => {
  if(formData.value === undefined){
    return 0
  }
  return formData.value.reduce((total, item) => {
    if (item.id && item.count) {
      return total + item.count
    } else {
      return total
    }
  }, 0)
})

/** 获取商品列表 */
const goodsTableRef = ref()
const goodsSelectRef = ref()
const goodsList = [
  {
    id: 1,
    brand: "福来",
    skuId: '1117',
    skuName: "福来匀净美肤精华油-C",
    weight: 0.125,
    category: "125ml",
    price: 85.00,
    salePrice: 85.00,
    otherAvailCount: 50
  },
  {
    id: 2,
    brand: "福来",
    skuId: '1100',
    skuName: "福来匀净美肤精华油",
    weight: 0.015,
    category: "15ml",
    price: 85.00,
    salePrice: 85.00,
    otherAvailCount: 119
  },
  {
    id: 3,
    brand: "E-CHANGE",
    skuId: 'D7535',
    skuName: "E-CHANGE日落晚风舒缓香氛沐浴油",
    weight: 0.26,
    category: "260ml",
    price: 45.00,
    salePrice: 45.00,
    otherAvailCount: 80
  },
  {
    id: 4,
    brand: "E-CHANGE",
    skuId: 'D7568',
    skuName: "E-CHANGE月初赤霞透亮香氛润肤乳",
    weight: 0.26,
    category: "260ml",
    price: 45.00,
    salePrice: 45.00,
    otherAvailCount: 200
  },
]
const goodsMap = new Map<number, object>()

goodsList.forEach(item => {
  goodsMap.set(item.id, item)
})


/** 重置表单 */
const resetForm = () => {
  console.log("reset")
}

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
  return formData.value.map(item => ({
    ...item,
    originalPrice: item.salePrice,
    count: item.returnCount,
    saleAmt: item.returnAmt,
    originalCount: item.count,
    retType: item.saleType,
  }))
}

/**
 * 输入框变更
 */
const handleSkuIdChange = (id, index) => {
  if (!id) {
    resetForm()
    return;
  }
  const data = goodsMap.get(id)
  console.log(data)
  console.log(formData)
  formData.value[index] = { ...data } as Goods
  // handleClickGoodsRow(data as GoodsVO)
}

/**
 * 点击商品表格行
 * @param row
 * @param index
 */
const handleClickGoodsRow = (row, index) => {
  console.log("行数：，", index)
  formData.value[index] = { ...row } as Goods
}

/**
 * 合计
 */
interface SummaryMethodProps<Goods> {
  columns: TableColumnCtx<Goods>[]
  data: Goods[]
}

const getSummaries = (param: SummaryMethodProps<Goods>) => {
  const { columns } = param;
  const sums: (string | VNode)[] = [];

  columns.forEach((_, index) => {
    if (index === 0) {
      sums[index] = h('div', { style: { textDecoration: 'underline', textAlign: 'center' } }, [
        '合计',
      ]);
      return;
    } else if (index === 6) {
      sums[index] = h('div', { style: { textAlign: 'center' } }, [
        totalReturnCount.value,
      ]);
      return;
    } else if (index === 7) {
      sums[index] = h('div', { style: { textAlign: 'center' } }, [
        totalReturnAmount.value?.toFixed(2),
      ]);
      return;
    } else if (index == 8) {
      sums[index] = h('div', { style: { textAlign: 'center' } }, [
        totalCount.value,
      ]);
      return;
    } else {
      sums[index] = ' ';
      return;
    }
  });

  return sums;
};


const setData = (data) => {
  console.log(data)
  formData.value = data
}

// 组件挂载时初始化本地状态
onMounted(() => {
  formData.value = [...props.initialData as Goods[]];
});

defineExpose({ validate, getData, setData, totalCount, totalReturnAmount, totalReturnCount })

</script>

<style>
.search-select .el-select__caret {
  transform: rotate(0);
}

.search-select .el-select__caret.is-reverse {
  transform: rotate(0);
}

:deep(.center-table td),
:deep(.center-table th) {
  text-align: center !important;
}

html {
  font-size: 12px;
}
</style>
