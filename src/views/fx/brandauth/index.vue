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
      <el-form-item label="ip" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入ip"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="唯一标识" prop="uuid">
        <el-input
          v-model="queryParams.uuid"
          placeholder="请输入唯一标识"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="设备" prop="clientDevice">
        <el-input
          v-model="queryParams.clientDevice"
          placeholder="请输入设备"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="操作系统" prop="clientOs">
        <el-input
          v-model="queryParams.clientOs"
          placeholder="请输入操作系统"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="浏览器" prop="clientBrowser">
        <el-input
          v-model="queryParams.clientBrowser"
          placeholder="请输入浏览器"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入备注"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="店铺名称" prop="storeName">
        <el-input
          v-model="queryParams.storeName"
          placeholder="请输入店铺名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="公司名称/旺旺id" prop="storeId">
        <el-input
          v-model="queryParams.storeId"
          placeholder="请输入公司名称/旺旺id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="店铺链接" prop="storeUrl">
        <el-input
          v-model="queryParams.storeUrl"
          placeholder="请输入店铺链接"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="授权书接收邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入授权书接收邮箱"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="申请日期" prop="applyDate">
        <el-date-picker
          v-model="queryParams.applyDate"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyDatetime">
        <el-date-picker
          v-model="queryParams.applyDatetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否已阅授权书" prop="isSee">
        <el-input
          v-model="queryParams.isSee"
          placeholder="请输入是否已阅授权书"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="店铺渠道" prop="channel">
        <el-select
          v-model="queryParams.channel"
          placeholder="请选择店铺渠道"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.FX_CHANNEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联流程" prop="workflowid">
        <el-input
          v-model="queryParams.workflowid"
          placeholder="请输入关联流程"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="是否线上" prop="isOnline">
        <el-select
          v-model="queryParams.isOnline"
          placeholder="请选择是否线上"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌" prop="brand">
        <el-select
          v-model="queryParams.brand"
          placeholder="请选择品牌"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['fx:brand-auth:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['fx:brand-auth:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="ip" align="center" prop="ip" />
      <el-table-column label="唯一标识" align="center" prop="uuid" />
      <el-table-column label="设备" align="center" prop="clientDevice" />
      <el-table-column label="操作系统" align="center" prop="clientOs" />
      <el-table-column label="浏览器" align="center" prop="clientBrowser" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="店铺名称" align="center" prop="storeName" />
      <el-table-column label="公司名称/旺旺id" align="center" prop="storeId" />
      <el-table-column label="店铺链接" align="center" prop="storeUrl" />
      <el-table-column label="授权书接收邮箱" align="center" prop="email" />
      <el-table-column label="申请日期" align="center" prop="applyDate" />
      <el-table-column label="申请时间" align="center" prop="applyDatetime" />
      <el-table-column label="是否已阅授权书" align="center" prop="isSee" />
      <el-table-column label="店铺渠道" align="center" prop="channel" />
      <el-table-column label="关联流程" align="center" prop="workflowid" />
      <el-table-column label="是否线上" align="center" prop="isOnline" />
      <el-table-column label="品牌" align="center" prop="brand" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['fx:brand-auth:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['fx:brand-auth:delete']"
          >
            删除
          </el-button>
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

  <!-- 表单弹窗：添加/修改 -->
  <BrandAuthForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import {getStrDictOptions, DICT_TYPE, getDictOptions} from '@/utils/dict'
import download from '@/utils/download'
import { BrandAuthApi, BrandAuthVO } from '@/api/fx/brandauth'
import BrandAuthForm from './BrandAuthForm.vue'

/** 品牌授权 列表 */
defineOptions({ name: 'BrandAuth' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref<BrandAuthVO[]>([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  ip: undefined,
  uuid: undefined,
  clientDevice: undefined,
  clientOs: undefined,
  clientBrowser: undefined,
  remark: undefined,
  storeName: undefined,
  storeId: undefined,
  storeUrl: undefined,
  email: undefined,
  applyDate: [],
  applyDatetime: [],
  isSee: undefined,
  channel: undefined,
  workflowid: undefined,
  isOnline: undefined,
  brand: undefined,
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await BrandAuthApi.getBrandAuthPage(queryParams)
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
    await BrandAuthApi.deleteBrandAuth(id)
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
    const data = await BrandAuthApi.exportBrandAuth(queryParams)
    download.excel(data, '品牌授权.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
