<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="单据编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入单据编号"
          clearable
          @keyup.enter="handleQuery"
          class="select-form"
        />
      </el-form-item>
      <!-- 单据编号-->

      <el-form-item label="单据日期" prop="orderDate">
        <el-date-picker
          v-model="queryParams.orderDate"
          value-format="YYYY-MM-DD"
          type="daterange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="w-240px!"
        />
      </el-form-item>
      <!-- 单据日期-->

      <el-form-item label="收货方" prop="distributorId">
        <ConsigneeSelect
          ref="consigneeSelectRef"
          v-model="queryParams.distributorId"
          @update:modelValue="handleChange"
        />
      </el-form-item>
      <!-- 收货方-->

      <el-form-item label="订单类型" prop="orderType">
        <el-select
          v-model="queryParams.orderType"
          placeholder="请选择订单类型"
          clearable
          class="select-form"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_SALE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- 订单类型-->

      <el-form-item label="物流单号" prop="logisticsNumber">
        <el-input
          v-model="queryParams.logisticsNumber"
          placeholder="请输入物流单号"
          clearable
          @keyup.enter="handleQuery"
          class="select-form"
        />
      </el-form-item>

      <!-- 物流单号-->

      <!--      <el-form-item label="备注" prop="remark">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.remark"-->
      <!--          placeholder="请输入备注"-->
      <!--          clearable-->
      <!--          @keyup.enter="handleQuery"-->
      <!--          class="select-form"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <!-- 备注-->

      <el-form-item label="erp单号" prop="erpOrderNumber">
        <el-input
          v-model="queryParams.erpOrderNumber"
          placeholder="请输入ERP单号"
          clearable
          @keyup.enter="handleQuery"
          class="select-form"
        />
      </el-form-item>
      <!-- ERP单号-->

      <el-form-item label="收货人" prop="manager">
        <el-input
          v-model="queryParams.manager"
          placeholder="请输入收货人"
          clearable
          @keyup.enter="handleQuery"
          class="select-form"
        />
      </el-form-item>
      <!-- 收货人-->

      <el-form-item label="外部单号" prop="externalOrderNumber">
        <el-input
          v-model="queryParams.externalOrderNumber"
          placeholder="请输入外部单号"
          clearable
          @keyup.enter="handleQuery"
          class="select-form"
        />
      </el-form-item>
      <!-- 外部单号-->

      <el-form-item label="业务归属" prop="businessBelong">
        <el-select
          v-model="queryParams.businessBelong"
          placeholder="请选择业务归属"
          clearable
          class="select-form"
        >
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.FX_BELONG)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- 业务归属-->

      <span style="width: 100%" class="text-right">
        <el-form-item>
          <el-button @click="handleQuery">
            <Icon icon="ep:search" class="mr-5px" />
            搜索
          </el-button>
          <el-button @click="resetQuery">
            <Icon icon="ep:refresh" class="mr-5px" />
            重置
          </el-button>
          <router-link to="/fx/ordersinfo/create">
            <el-button class="ml-3" type="primary" plain>
              <Icon icon="ep:plus" class="mr-5px" />
              新增审批
            </el-button>
          </router-link>
        </el-form-item>
      </span>
      <!--            <el-button
              class="ml-3"
              type="success"
              plain
              @click="handleExport"
              :loading="exportLoading"
              v-hasPermi="['fx:orders-info:export']"
            >
              <Icon icon="ep:download" class="mr-5px"/>
              导出
            </el-button>-->

      <!-- 操作-->
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table
      ref="tableRef"
      @row-click="ClickAndExpandRow"
      v-loading="loading"
      :data="list"
      :stripe="true"
      :header-row-style="{ fontSize: '12px' }"
      style="font-size: 12px"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="px-5 ml-10">
            <el-descriptions bordered :column="4">
              <el-descriptions-item label="销售方"
                >{{ props.row.supplierName }}
              </el-descriptions-item>
              <el-descriptions-item label="收货经销商"
                >{{ props.row.receiveSupplierName }}
              </el-descriptions-item>
              <el-descriptions-item label="渠道">
                <dict-span-tag :type="DICT_TYPE.FX_CHANNEL" :value="props.row.channel" />
              </el-descriptions-item>
              <el-descriptions-item label="客户等级">
                <dict-span-tag
                  :type="DICT_TYPE.FX_CUSTOMER_LEVEL"
                  :value="props.row.customerLevel"
                />
              </el-descriptions-item>

              <el-descriptions-item label="收货人">{{ props.row.manager }}</el-descriptions-item>
              <el-descriptions-item label="联系电话">{{ props.row.phone }}</el-descriptions-item>
              <el-descriptions-item label="物流公司">
                <dict-tag :type="DICT_TYPE.FX_WL" :value="props.row.logisticsCompany" />
              </el-descriptions-item>
              <el-descriptions-item :span="2" label="备注内容"
                >{{ props.row.remark }}
              </el-descriptions-item>
              <el-descriptions-item label="省市区">
                {{ props.row.province }}/{{ props.row.city }}/{{ props.row.district }}
              </el-descriptions-item>
              <el-descriptions-item :span="3" label="收货地址"
                >{{ props.row.address }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单据编号" align="center" prop="orderId" width="150">
        <template #default="scope">
          <router-link :to="'/fx/orders/detail?id=' + scope.row.id" @click.stop>
            <el-link type="primary" style="font-size: 13px">
              {{ scope.row.orderId }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="单据日期" align="center" prop="orderDate">
        <template #default="scope">
          {{ scope.row.orderDate && scope.row.orderDate.length > 0 ? scope.row.orderDate.join('-') : '' }}
        </template>
      </el-table-column>
      <el-table-column label="收货方" align="center" prop="distributorName" width="120" />
      <el-table-column label="物流公司" align="center" prop="logisticsCompany" width="100">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_WL" :value="scope.row.logisticsCompany" />
        </template>
      </el-table-column>
      <el-table-column label="物流单号" align="center" prop="logisticsNumber" />
      <el-table-column label="订单状态" align="center" prop="orderStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.FX_ORDER_STATUS" :value="scope.row.orderStatus" />
        </template>
      </el-table-column>
      <el-table-column
        label="业务归属"
        align="center"
        prop="businessBelong"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <dict-span-tag :type="DICT_TYPE.FX_BELONG" :value="scope.row.businessBelong" />
        </template>
      </el-table-column>
      <el-table-column label="发货仓库" align="center" prop="warehouse" />
      <el-table-column label="商品合计" align="center" prop="totalGoods" />
      <el-table-column label="ERP单号" align="center" prop="erpOrderNumber" />
      <el-table-column label="外部单号" align="center" prop="externalOrderNumber" />
      <el-table-column label="销售金额" align="center" prop="salesAmount" />
      <el-table-column label="发货数量" align="center" prop="sendQuantity" />
      <el-table-column label="创建者" align="center" prop="creator" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div class="flex flex-col justify-center items-center">
            <div>
              <router-link :to="'/fx/ordersinfo/create?id=' + scope.row.id">
                <el-button
                  @click.stop
                  v-if="scope.row.orderStatus === 0"
                  link
                  type="primary"
                  v-hasPermi="['fx:orders-info:update']"
                >
                  编辑
                </el-button>
              </router-link>
              <el-button
                v-if="scope.row.orderStatus === 1"
                link
                type="primary"
                @click.stop="handleCancel(scope.row)"
                v-hasPermi="['fx:orders-info:update']"
              >
                取消审核
              </el-button>
              <el-button
                v-if="scope.row.orderStatus === 0"
                link
                type="primary"
                @click.stop="handleSubmit(scope.row)"
                v-hasPermi="['fx:orders-info:update']"
              >
                发起审核
              </el-button>
            </div>
            <div>
              <el-button
                v-if="scope.row.orderStatus === 0"
                link
                type="danger"
                @click="handleDelete(scope.row.id)"
                v-hasPermi="['fx:orders-info:delete']"
              >
                删除
              </el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>
  <ConsigneeTable ref="consigneeRef" @click-row="handleClickConsigneeRow" />
</template>

<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import download from '@/utils/download'
import { OrdersInfoApi, OrdersInfoVO } from '@/api/fx/ordersinfo'
import { SubCompany } from '@/views/fx/customerinfo/data'
import { SubCompanyInfoApi } from '@/api/fx/subcompanyinfo'
import ConsigneeTable from '@/views/fx/ordersinfo/components/consigneeTable.vue'
import { ElMessageBox } from 'element-plus'
import ConsigneeSelect from '@/components/Consignee/ConsigneeSelect.vue'
import {CustomerInfoVO} from "@/api/fx/customerinfo";

/** 销售单 列表 */
defineOptions({ name: 'OrdersInfo' })

const shortcuts = ref([
  {
    text: '今天',
    value: [new Date(), new Date()]
  },
  {
    text: '昨天',
    value: () => {
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      return [end, end]
    }
  },
  {
    text: '近7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '近30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '近90天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  },
  {
    text: '近180天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      return [start, end]
    }
  },
  {
    text: '本周',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      //现在星期几；0代表星期天，6代表星期六
      const thisDay = start.getDay()
      //现在是一个月的第几天
      const thisDate = start.getDate()
      console.log(thisDay)
      console.log(thisDate)
      if (thisDay != 0) {
        start.setDate(thisDate - thisDay + 1)
      }
      if (start > end) {
        end.setTime(start.getTime())
      }
      return [start, end]
    }
  },
  {
    text: '本月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setDate(1)
      picker.$emit('orderDate', [start, end])
    },
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(start.getTime() - 3600 * 1000 * 24)
      start.setDate(1)
      return [start, end]
    }
  },
  {
    text: '本季度',
    value: () => {
      const oDate = new Date()
      const thisYear = oDate.getFullYear()
      const thisMonth = oDate.getMonth() + 1
      const n = Math.ceil(thisMonth / 3) // 季度
      const Month = n * 3 - 1
      const start = new Date(thisYear, Month - 2, 1)
      const end = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      return [start, end]
    }
  },
  {
    text: '本年',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(0)
      start.setDate(1)
      end.setTime(end.getTime() - 3600 * 1000 * 24)
      return [start, end]
    }
  }
])
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<OrdersInfoVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  erpOrderNumber: undefined,
  manager: undefined,
  orderId: undefined,
  orderDate: [],
  remark: undefined,
  logisticsNumber: undefined,
  externalOrderNumber: undefined,
  orderType: undefined,
  distributorId: undefined,
  businessBelong: undefined
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中
const subCompanyList = ref<SubCompany[]>([])
const companyMap = ref(new Map<number, string>())
const tableRef = ref()

/**
 * 收货方表格
 */
const consigneeRef = ref() //收货方表格引用
const consigneeList = ref<CustomerInfoVO[]>() //收货方数据

const getCompanyList = async () => {
  subCompanyList.value = await SubCompanyInfoApi.getSubCompanyInfoList()
  subCompanyList.value.forEach((item) => {
    companyMap.value.set(item.id, item.companyName as string)
  })
  console.log(companyMap.value)
}

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await OrdersInfoApi.getOrdersInfoPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await OrdersInfoApi.deleteOrdersInfo(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await OrdersInfoApi.exportOrdersInfo(queryParams)
    download.excel(data, '销售单.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

const ClickAndExpandRow = (row) => {
  tableRef.value.toggleRowExpansion(row)
}

/**
 选择收货方表格数据并回显到表单中
 */
const handleClickConsigneeRow = (data: CustomerInfoVO) => {
  //@ts-ignore
  queryParams.distributorId = data.id
}

const handleChange = (row) => {
  queryParams.distributorId = row.id
}

const handleCancel = async (row) => {
  // 二次确认
  const { value } = await ElMessageBox.prompt('请输入取消原因', '取消流程', {
    confirmButtonText: t('common.ok'),
    cancelButtonText: t('common.cancel'),
    inputPattern: /^[\s\S]*.*\S[\s\S]*$/, // 判断非空，且非空格
    inputErrorMessage: '取消原因不能为空'
  })
  // 发起取消
  const data = {
    id: row.processInstanceId,
    orderId: row.id,
    reason: value
  }
  console.log(data)
  await OrdersInfoApi.cancelProcessInstanceByStartUser(data)
  message.success('取消成功')
  // 刷新列表
  await getList()
}

const handleSubmit = async (id: number) => {
  try {
    // 二次确认
    await message.confirm('确定要提交审核吗？')
    // 发起流程
    await OrdersInfoApi.startProcessInstanceByStartUser(id)
    message.success(t('common.success'))
    // 刷新列表
    await getList()
  } catch { }
}

/**
 * 选择框的引用-用来定义点击事件
 */
const route = useRoute()
const consigneeSelectRef = ref()
watch(route, getList)

/** 初始化 **/
onMounted(() => {
  getCompanyList()
  getList()
  nextTick(() => {
    if (consigneeSelectRef.value) {
      const select = consigneeSelectRef.value.selectRef?.suffixRef
      select.onclick = (event: Event) => {
        event.stopPropagation()
        consigneeRef.value.open()
      }
    }
  })
})
</script>
<style scoped>
.search-select .el-select__caret {
  transform: rotate(0);
}

.search-select .el-select__caret.is-reverse {
  transform: rotate(0);
}

.select-form {
  width: 260px !important;
}
</style>
