<template>
  <Dialog ref="detailFormRef" width="1200px" :title="dialogTitle" v-model="dialogVisible">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础信息" name="customerInfo">
        <el-descriptions border>
          <el-descriptions-item label="分销商编号">{{dataInfo.distributorNum}}</el-descriptions-item>
          <el-descriptions-item label="分销商名称">{{ dataInfo.distributorName }}</el-descriptions-item>
          <el-descriptions-item label="分销商等级">
            <dict-tag :type="DICT_TYPE.FX_CUSTOMER_LEVEL" :value="dataInfo.distributorLevel" />
          </el-descriptions-item>
          <el-descriptions-item label="客户渠道属性">
            <dict-span-tag :type="DICT_TYPE.FX_CUSTOMER_DISTRIBUTE" :value="dataInfo.customerChannelDistribute" />
          </el-descriptions-item>
          <el-descriptions-item label="显示名称">{{ dataInfo.displayName }}</el-descriptions-item>
          <el-descriptions-item label="客户类型">
            <dict-span-tag :type="DICT_TYPE.FX_CUSTOMER_TYPE" :value="dataInfo.customerType" />
          </el-descriptions-item>

          <el-descriptions-item label="所属公司">{{ companyMap.get(dataInfo.subCompany || 1)}}</el-descriptions-item>
          <el-descriptions-item label="是否合作">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isCooperate" />
          </el-descriptions-item>
          <el-descriptions-item label="是否冻结">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isFreeze" />
          </el-descriptions-item>
          <el-descriptions-item label="供应商编号">{{ dataInfo.supplierId }}</el-descriptions-item>
          <el-descriptions-item label="业务属性">
            <dict-span-tag :type="DICT_TYPE.FX_BELONG" :value="dataInfo.belongTo" />
          </el-descriptions-item>

          <el-descriptions-item label="是否允许超额提货">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isExcessOrder" />
          </el-descriptions-item>
          <el-descriptions-item label="最近下单日期">
            {{dataInfo.latestOrderDate}}
          </el-descriptions-item>
          <el-descriptions-item label="品牌">
            <dict-span-tag :type="DICT_TYPE.FX_BRAND" :value="dataInfo.brand" />
          </el-descriptions-item>

        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="账号信息" name="customerAccount">
        <el-table :data="dataInfo.customerAccounts" class="-mt-10px">
          <el-table-column label="序号" type="index" width="70" />
          <el-table-column label="业务主体" min-width="220" prop="company"/>
          <el-table-column label="余额" min-width="150" prop="balance"/>
          <el-table-column label="账户编号" min-width="150" prop="accountId"/>
          <el-table-column label="暂扣金额" min-width="150" prop="detainAmount"/>
          <el-table-column label="是否冻结" min-width="150" prop="isActive">
            <template #default="{ row }">
              <dict-span-tag :type="DICT_TYPE.YES_NO" :value="row.isActive" />
            </template>
          </el-table-column>
          <el-table-column label="押金" min-width="150" prop="deposit"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="地址信息" name="customerAddress">
        <el-table :data="dataInfo.customerAddressList" class="-mt-10px">
          <el-table-column label="序号" type="index" width="70"/>
          <el-table-column label="联系人" min-width="80" prop="manager"/>
          <el-table-column label="联系电话" min-width="100" prop="phone"/>
          <el-table-column label="省市区" min-width="150" >
            <template #default="{ row }">
              <span>
                {{ row?.province + row?.city + row?.district }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="发货地址" min-width="250" prop="address"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>
<script setup lang="ts">
import {CustomerInfoApi} from "@/api/fx/customerinfo";
import {CreateCustomerAddressVO} from "@/api/fx/customeraddress";
import {DICT_TYPE} from "@/utils/dict";
import {CustomerAccountVO} from "@/api/fx/customeraccount";

/** 分销商基础信息 表单 */
defineOptions({name: 'CustomerDetailForm'})
defineProps({
  companyMap: {
    type: Map<number, string>,
    default: () => new Map<number, string>()
  },
})
const {t} = useI18n() // 国际化
import { ref } from 'vue';
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const activeTab = ref('customerInfo')
const dataInfo = ref({
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
  customerAccounts: [] as CustomerAccountVO[],
})

/** 打开弹窗 */
const open = async (type: string, id: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  dataInfo.value = await CustomerInfoApi.getCustomerInfo(id)
}
defineExpose({open}) // 提供 open 方法，用于打开弹窗


</script>
