<template>
  <div class="goodsTitle">
    <!--商品信息-->
    <div class="section-header">
      <el-icon>
        <GoodsIcon />
      </el-icon>
      <span>商品信息</span>
    </div>
    <el-button type="text" @click="open" style="position: relative; right: 0;">+ 添加商品明细</el-button>
  </div>
 

  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
  <el-table
    size="small"
    :header-cell-style="{textAlign:'center'}"
    :cell-style="{textAlign:'center'}"
    stripe
    border
    show-summary
    :summary-method="getSummaries"
    :data="formData">
    <!-- <el-table-column label="序号" type="index" width="30"/> -->
    <el-table-column label="商品编码" width="100" prop="skuId">
      <template #default="{ row, $index }">
        <el-form-item :prop="`${$index}.skuId`" :rules="formRules.skuId" class="mb-0px!">
          <el-select
            ref="goodsSelectRef"
            size="small"
            class="search-select"
            :suffix-icon="ConsigneeIcon as any"
            v-model="row.skuId"
            @change="(e)=>handleSkuIdChange(e, $index)"
            placeholder="请选择商品"
            filterable
           >
            <el-option
              v-for="dict in goodsList"
              :key="dict.id"
              :label="dict.skuId"
              :value="dict.id"
            />
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="销售类型" width="80" prop="saleType">
      <template #default="{ row, $index }">
        <el-form-item v-if="row.skuId" :prop="`${$index}.saleType`" :rules="formRules.saleType" class="mb-0px!">
          <el-select v-model="row.saleType" placeholder="类型" size="small"
           @change="(e)=>{handleSaleTypeChange(e,$index)}">
            <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.FX_DETAIL_RETURN_TYPE)"
              :key="`${dict.value}_${$index}`"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" width="150" prop="skuName"/>
    <el-table-column label="规格" width="80" prop="category"/>
    <el-table-column label="销售价" width="70" prop="price">
      <template #default="scope" >
        {{ scope.row.skuId ? (scope.row.price?.toFixed(2) || 0) : '' }}
      </template>
    </el-table-column>
    <el-table-column label="结算价" width="90" prop="salePrice">
      <template #default="{ row, $index }">
        <el-form-item v-if="row.skuId" :prop="`${$index}.salePrice`" :rules="formRules.salePrice" class="mb-0px!">
          <el-input-number
            v-model="row.salePrice"
            :precision="2"
            size="small"
            placeholder="结算价"
            :min="row.saleType === 1  ? 0 : row.price"
            :controls="false"
          />
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="可配货库存" width="80" prop="otherAvailCount"/>
    <el-table-column label="数量" width="80" prop="count">
      <template #default="{ row, $index }">
        <el-form-item v-if="row.skuId" :prop="`${$index}.count`" :rules="formRules.count" class="mb-0px!">
          <el-input-number v-model="row.count" placeholder="数量" :controls="false" size="small"/>
        </el-form-item>
      </template>
    </el-table-column>
    <el-table-column label="销售金额" width="90">
      <template #default="scope">
        {{ ((scope.row.count || 0) * (scope.row.salePrice || 0))?.toFixed(2) || 0 }}
      </template>
    </el-table-column>
    <el-table-column label="净重(kg)" >
      <template #default="scope">
        {{ ((scope.row.count || 0) * (scope.row.weight || 0))?.toFixed(2) || 0 }}
      </template>
    </el-table-column>
    <el-table-column align="center" fixed="right" label="操作" width="80">
      <template #default="scope">
        <ElRow>
          <ElCol :span="24">
            <el-button type="text" size="small" @click="handleDelete(scope.$index)">删除</el-button>
          </ElCol>
        </ElRow>
      </template>
    </el-table-column>
  </el-table>
  </el-form>
  <GoodsTable ref="goodsTableRef"  @click-row="handleClickGoodsRow" />
</template>
<script setup lang="ts">
import {getIntDictOptions, DICT_TYPE} from '@/utils/dict'
import ConsigneeIcon from "@/views/fx/ordersinfo/components/ConsigneeIcon.vue";
import GoodsTable from "@/views/fx/ordersinfo/components/goodsTable.vue";
import {TableColumnCtx} from "element-plus";
import {
  Goods as GoodsIcon,
} from '@element-plus/icons-vue'
import {Goods} from "@/views/fx/ordersinfo/data";

const formLoading = ref(false) // 表单的加载中
const formData = ref<Goods[]>([])

// 校验数量
const validateCount = (rule, value, callback) => {
  console.log(rule, value)
  const currentRow = formData.value[parseInt(rule.field.split('.')[0])]; // 获取当前行数据
  if (value > currentRow.otherAvailCount) {
    callback(new Error(`大于可配货库存`));
  } else {
    callback();
  }
};

const formRules = reactive({
  saleType: [{required: true, message: '类型不能为空', trigger: 'change'}],
  salePrice: [{required: true, message: '结算价不能为空', trigger: 'blur'}],
  skuId: [{required: true, message: '编码不能为空', trigger: 'blur'}],
  skuName: [{required: true, message: '名称不能为空', trigger: 'blur'}],
  category: [{required: true, message: '规格不能为空', trigger: 'blur'}],
  count: [{required: true, message: '数量不能为空', trigger: 'blur'}, {validator: validateCount, trigger: 'blur'}],
})

// 表单引用，和可见
const formRef = ref() // 表单 Ref
const dialogVisible = ref(false)

// 新增按钮，绑定selectRef用到的索引
let current = -1

// 汇总信息
const  totalAmount = computed(() => {
  return formData.value.reduce((total, item) => {
    if (item.id && item.salePrice && item.count){
      return total + (item.salePrice * item.count)
    }else{
      return total
    }
  }, 0)
})
const  totalWeight = computed(() => {
  return formData.value.reduce((total, item) => {
    if (item.id && item.weight && item.count){
      return total + (item.weight * item.count)
    }else{
      return total
    }
  }, 0)
})
const totalCount = computed(() => {
  return formData.value.reduce((total, item) => {
    if (item.id && item.count){
      return total + item.count
    }else{
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


/** 新增按钮操作 */
const open = () => {
  formData.value.push({} as Goods)
  const current = formData.value.length - 1
  nextTick(() => {
    if (goodsSelectRef.value) {
      // 自定义点击事件逻辑
      const select = goodsSelectRef.value?.suffixRef;
      select.onclick = (event: Event) => {
        console.log(current)
        event.stopPropagation();
        goodsTableRef.value.handleOpen(current)
      }
    }
  });
}

/** 重置表单 */
const resetForm = () => {
  Object.assign(item, {
    skuId: undefined,
    skuName: undefined,
    saleType: undefined,
    category: undefined,
    price: undefined,
    salePrice: undefined,
    weight: undefined,
    count: undefined,
    priceAmount: undefined,
    goodsWeight: undefined,
    otherAvailCount: undefined
  })
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
  return formData.value
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
  formData.value[index] = {...data} as Goods
  // handleClickGoodsRow(data as GoodsVO)
}

/**
 * 点击商品表格行
 * @param row
 * @param index
 */
const handleClickGoodsRow = (row ,index) => {
  console.log("行数：，",index)
  formData.value[index] = {...row} as Goods
}

/**
 * 合计
 */
interface SummaryMethodProps<Goods>{
  columns: TableColumnCtx<Goods>[]
  data: Goods[]
}
const getSummaries = (param: SummaryMethodProps<Goods>) => {
  const { columns } = param;
  const sums: (string | VNode)[] = [];

  columns.forEach(( _ , index) => {
    if (index === 0) {
      sums[index] = h('div', { style: { textDecoration: 'underline', textAlign: 'center'  } }, [
        '合计',
      ]);
      return;
    }else if (index === 8){
      sums[index] =  h('div', { style: { textAlign: 'center' } }, [
        totalCount.value,
      ]);
      return;
    }else if (index === 9){
      sums[index] =  h('div', { style: { textAlign: 'center' } }, [
        totalAmount.value,
      ]);
      return;
    }else if (index == 10){
      sums[index] =  h('div', { style: { textAlign: 'center' } }, [
        totalWeight.value?.toFixed(2),
      ]);
      return;
    }else{
      sums[index] = ' ';
      return;
    }
  });

  return sums;
};

/**
 * 货补类型变更
 * @param e 变更值
 * @param $index 表格下标
 */
const handleSaleTypeChange = (e,$index) => {
  //货补类型，销售单价格默认为0
  if (e == 1){
    formData.value[$index].salePrice = 0
  }
}

const setData = (data) => {
  console.log(data)
  formData.value = data
}


defineExpose({validate, getData,setData, totalAmount, totalWeight,totalCount})
</script>

<style scoped>
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
html{
  font-size: 12px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-primary);
  font-size: 16px;
  font-weight: 500;
}

.section-header .el-icon {
  font-size: 18px;
  color: var(--el-color-primary);
}

.goodsTitle{
  display: flex;
  max-height: 40px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--el-border-color-light);
  padding: 16px 0;
  margin: 12px 0;
}

</style>
