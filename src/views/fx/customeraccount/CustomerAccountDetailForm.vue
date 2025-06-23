<template>
  <Dialog ref="detailFormRef" width="1200px" :title="dialogTitle" v-model="dialogVisible">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基础信息" name="customerAccountInfo">
        <el-descriptions border>
          <el-descriptions-item label="分销商">{{dataInfo.distributorId}}-{{ dataInfo.distributorName }}</el-descriptions-item>
<!--          <el-descriptions-item label="分销商名称">{{ dataInfo.distributorName }}</el-descriptions-item>-->
          <el-descriptions-item label="账户编号">{{ dataInfo.accountId }}</el-descriptions-item>
          <el-descriptions-item label="余额">{{ dataInfo.balance }}</el-descriptions-item>
          <el-descriptions-item label="暂扣金额">{{ dataInfo.detainAmount }}</el-descriptions-item>
          <el-descriptions-item label="货补虚拟金额">{{ dataInfo.vAmount }}</el-descriptions-item>
          <el-descriptions-item label="暂扣货补金额">{{ dataInfo.zkVAmount }}</el-descriptions-item>
          <el-descriptions-item label="业务主体">
            <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="dataInfo.company" />
          </el-descriptions-item>
          <el-descriptions-item label="是否冻结">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isActive" />
          </el-descriptions-item>
          <el-descriptions-item label="是否允许超额提货">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isEdit" />
          </el-descriptions-item>
          <el-descriptions-item label="是否计算货补">
            <dict-span-tag :type="DICT_TYPE.YES_NO" :value="dataInfo.isRep" />
          </el-descriptions-item>
          <el-descriptions-item label="备注">{{ dataInfo.remark }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
    </el-tabs>
  </Dialog>
</template>
<script setup lang="ts">
import {CustomerInfoApi} from "@/api/fx/customerinfo";
import {CreateCustomerAddressVO} from "@/api/fx/customeraddress";
import {DICT_TYPE} from "@/utils/dict";
import {CustomerAccountApi, CustomerAccountVO} from "@/api/fx/customeraccount";

/** 分销商基础信息 表单 */
defineOptions({name: 'CustomerAccountDetailForm'})
defineProps({
  companyMap: {
    type: Map<number, string>,
    default: () => new Map<number, string>()
  },
})
const {t} = useI18n() // 国际化
const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const activeTab = ref('customerAccountInfo')
const dataInfo = ref({
  id: undefined,
  distributorId: undefined,
  balance: undefined,
  accountId: undefined,
  detainAmount: undefined,
  isActive: undefined,
  deposit: undefined,
  company: undefined,
  vAmount: undefined,
  isAllow: undefined,
  quota: undefined,
  remark: undefined,
  isRep: undefined,
  zkVAmount: undefined,
  name: undefined,
  distributorName: undefined,
})

/** 打开弹窗 */
const open = async (id: number) => {
  dialogVisible.value = true
  dialogTitle.value = '客商账户详情'
  dataInfo.value = await CustomerAccountApi.getCustomerAccount(id)
}

defineExpose({open}) // 提供 open 方法，用于打开弹窗


</script>
