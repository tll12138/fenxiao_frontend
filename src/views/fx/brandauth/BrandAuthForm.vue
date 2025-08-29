<template>
  <Dialog
    :title="dialogTitle"
    v-model="dialogVisible"
    :custom-class="'gwd-auth-dialog'"
    :width="'800px'"
  >
    <!-- 1. 头部区域（对齐授权页面Banner+标题+图标） -->
    <div class="wev-edc-form-header__view">
      <!-- 蓝色Banner栏 -->
      <div class="fheader-banner" style="font-family: inherit; font-size: 16px; font-weight: normal; color: #fff; background-color: rgb(2, 112, 193); text-align: left; height: 40px; line-height: 40px; padding-left: 20px;">
        <span></span>
      </div>
      <!-- 标题与品牌图标 -->
      <p class="fheader-title" style="font-family: inherit; font-size: 20px; font-weight: normal; color: #333; text-align: center; margin: 20px 0;">品牌授权申请</p>
    </div>

    <!-- 2. 注意事项模块（完全复用授权页面内容与样式） -->
    <div class="wea-edc-form-description" style="padding: 10px 0 15px; border-top: 1px dashed #aab2bd; margin-bottom: 20px;">
      <div class="wea-edc-com-title" style="margin-bottom: 10px;">
        <label style="font-family: inherit; font-size: 16px; font-weight: normal; color: #000;">注意事项</label>
      </div>
      <div style="font-size: 14px; color: #333; line-height: 1.8;">
        <p>1、被授权店铺应遵守相关法律法规、平台规则及品牌市场管控政策，在品牌价格体系内销售产品，否则我司有权立即终止本授权；被授权店铺不得再授权。</p>
        <p>2、无此授权的店铺均为非法销售店铺，品牌不承担任何非授权店铺因产品质量问题产生的售后服务。</p>
        <p>3、提交前必须先预览以下链接，阅览后方可提交！</p>
        <p>&nbsp;👉请戳-&gt;
          <a
            href="https://hj.wmg.weimeigu.net/web/index.php?r=site%2Fscheme&amp;id=3099"
            target="_top"
            style="color: #ff3532; font-size: 16px; font-weight: bold; text-decoration: underline;"
          >
            经销商须知
          </a>
        </p>
      </div>
    </div>

    <!-- 3. 表单主体（保持原功能，样式对齐授权页面） -->
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      v-loading="formLoading"
      style="background-color: #fff; padding: 0 20px;"
    >
      <!-- 基础设备信息（新增字段，样式对齐） -->
      <el-form-item label="IP地址" prop="ip" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.ip"
          placeholder="请输入IP地址"
          class="wea-input-normal"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="唯一标识" prop="uuid" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.uuid"
          placeholder="请输入唯一标识"
          class="wea-input-normal"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="设备" prop="clientDevice" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.clientDevice"
          placeholder="请输入设备（如Windows电脑）"
          class="wea-input-normal"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="操作系统" prop="clientOs" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.clientOs"
          placeholder="请输入操作系统（如Windows 10）"
          class="wea-input-normal"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="浏览器" prop="clientBrowser" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.clientBrowser"
          placeholder="请输入浏览器（如Chrome 120）"
          class="wea-input-normal"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.remark"
          placeholder="请输入备注（选填）"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>

      <!-- 核心店铺信息（匹配授权页面必填规则） -->
      <el-form-item label="店铺名称" prop="storeName" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.storeName"
          placeholder="请输入店铺名称（最少2字）"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
        <div class="wea-edc-com-subTitle" style="color: #999; font-size: 12px; margin-top: 5px;">(最少请填写2个字)</div>
      </el-form-item>
      <el-form-item label="公司名称/旺旺ID" prop="storeId" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.storeId"
          placeholder="淘系填旺旺ID，其他填公司名称（最少3字）"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
        <div class="wea-edc-com-subTitle" style="color: #999; font-size: 12px; margin-top: 5px;">(最少请填写3个字，淘系渠道填写旺旺ID，其他渠道填写公司名称)</div>
      </el-form-item>
      <el-form-item label="店铺链接" prop="storeUrl" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.storeUrl"
          placeholder="请输入店铺完整链接（最少10字）"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
        <div class="wea-edc-com-subTitle" style="color: #999; font-size: 12px; margin-top: 5px;">(最少请填写10个字)</div>
      </el-form-item>
      <el-form-item label="授权公司名称" prop="brandCompany" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.brandCompany"
          placeholder="请输入需授权的公司全称"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="授权书接收邮箱" prop="email" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.email"
          placeholder="请输入授权书接收邮箱"
          class="wea-edc-form-email"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>

      <!-- 日期时间选择（样式对齐授权页面，格式优化） -->
      <el-form-item label="申请日期" prop="applyDate" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-date-picker
          v-model="formData.applyDate"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="选择申请日期"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="applyDatetime" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-date-picker
          v-model="formData.applyDatetime"
          type="datetime"
          value-format="YYYY-MM-DD HH:mm:ss"
          placeholder="选择申请时间"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>

      <!-- 下拉选择类字段（样式对齐授权页面下拉框） -->
      <el-form-item label="是否已阅授权书" prop="isSee" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-select
          v-model="formData.isSee"
          placeholder="请选择是否已阅授权书"
          class="wea-edc-form-combobox"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        >
          <el-option label="是（已阅读经销商须知）" value="1" />
          <el-option label="否（需阅读后提交）" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="店铺渠道" prop="channel" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-select
          v-model="formData.channel"
          placeholder="请选择店铺渠道（渠道不同模板不同）"
          class="wea-edc-form-combobox"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        >
          <el-option
            v-for="dict in getDictOptions(DICT_TYPE.$dictType.toUpperCase())"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
        <div class="wea-edc-com-subTitle" style="color: #999; font-size: 12px; margin-top: 5px;">渠道不同，品牌授权书模板会有所差异，请咨询后选择</div>
      </el-form-item>
      <el-form-item label="是否线上" prop="isOnline" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-select
          v-model="formData.isOnline"
          placeholder="请选择是否线上店铺"
          class="wea-edc-form-combobox"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="品牌" prop="brand" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-select
          v-model="formData.brand"
          placeholder="请选择申请授权的品牌"
          class="wea-edc-form-combobox"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.FX_BRAND)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关联流程" prop="workflowid" class="wea-edc-form-item" style="padding-bottom: 15px;">
        <el-input
          v-model="formData.workflowid"
          placeholder="请输入关联流程ID（如有）"
          class="wea-edc-form-text"
          style="width: 100%; border: 1px solid #dcdfe6; border-radius: 4px;"
        />
      </el-form-item>
    </el-form>

    <!-- 4. 底部按钮（对齐授权页面蓝色按钮+左侧布局） -->
    <template #footer>
      <div style="text-align: left; padding-left: 20px;">
        <el-button
          @click="submitForm"
          type="primary"
          :disabled="formLoading"
          style="background-color: rgb(2, 112, 193); border-color: rgb(2, 112, 193); color: #fff; font-size: 14px; padding: 6px 20px;"
        >
          确 定
        </el-button>
        <el-button
          @click="dialogVisible = false"
          style="margin-left: 10px; font-size: 14px; padding: 6px 20px;"
        >
          取 消
        </el-button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { BrandAuthApi, BrandAuthVO } from '@/api/fx/brandauth'

/** 品牌授权 表单组件配置 */
defineOptions({ name: 'BrandAuthForm' })

// 国际化与消息提示
const { t } = useI18n()
const message = useMessage()

// 弹窗状态控制
const dialogVisible = ref(false)  // 弹窗显示/隐藏
const dialogTitle = ref('')       // 弹窗标题（新增/修改）
const formLoading = ref(false)    // 表单加载状态（数据加载/提交中）
const formType = ref('')          // 表单类型：create-新增，update-修改
const formRef = ref()             // 表单Ref（用于校验/重置）

// 表单数据模型（新增brandCompany字段，匹配授权页面“授权公司名称”）
const formData = ref<Partial<BrandAuthVO & { brandCompany?: string }>>({
  id: undefined,
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
  brandCompany: undefined,  // 新增：授权公司名称（授权页面必填项）
  applyDate: undefined,
  applyDatetime: undefined,
  isSee: '0',  // 默认未阅读
  channel: undefined,
  workflowid: undefined,
  isOnline: undefined,
  brand: undefined,
})

// 表单校验规则（匹配授权页面必填/格式要求）
const formRules = reactive({
  ip: [{ required: true, message: '请输入IP地址', trigger: 'blur' }],
  uuid: [{ required: true, message: '请输入唯一标识', trigger: 'blur' }],
  storeName: [
    { required: true, message: '请输入店铺名称', trigger: 'blur' },
    { min: 2, message: '店铺名称最少2个字', trigger: 'blur' }
  ],
  storeId: [
    { required: true, message: '请输入公司名称/旺旺ID', trigger: 'blur' },
    { min: 3, message: '公司名称/旺旺ID最少3个字', trigger: 'blur' }
  ],
  storeUrl: [
    { required: true, message: '请输入店铺链接', trigger: 'blur' },
    { min: 10, message: '店铺链接最少10个字', trigger: 'blur' }
  ],
  brandCompany: [{ required: true, message: '请输入授权公司名称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入授权书接收邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  applyDate: [{ required: true, message: '请选择申请日期', trigger: 'change' }],
  applyDatetime: [{ required: true, message: '请选择申请时间', trigger: 'change' }],
  isSee: [{ required: true, message: '请选择是否已阅授权书', trigger: 'change' }],
  channel: [{ required: true, message: '请选择店铺渠道', trigger: 'change' }],
  isOnline: [{ required: true, message: '请选择是否线上', trigger: 'change' }],
  brand: [{ required: true, message: '请选择品牌', trigger: 'change' }],
})

// 打开弹窗（支持新增/修改）
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t(`action.${type}`)  // 国际化标题：新增/修改
  formType.value = type
  resetForm()  // 重置表单

  // 修改场景：加载已有数据
  if (id) {
    formLoading.value = true
    try {
      const res = await BrandAuthApi.getBrandAuth(id)
      formData.value = { ...res, brandCompany: res.brandCompany || '' }  // 适配新增字段
    } finally {
      formLoading.value = false
    }
  }
}

// 提交表单（新增/修改逻辑）
const emit = defineEmits(['success'])  // 提交成功回调事件
const submitForm = async () => {
  // 1. 表单校验
  await formRef.value.validate()

  // 2. 提交请求
  formLoading.value = true
  try {
    const submitData = formData.value as unknown as BrandAuthVO
    if (formType.value === 'create') {
      await BrandAuthApi.createBrandAuth(submitData)
      message.success(t('common.createSuccess'))  // 国际化提示：创建成功
    } else {
      await BrandAuthApi.updateBrandAuth(submitData)
      message.success(t('common.updateSuccess'))  // 国际化提示：修改成功
    }
    dialogVisible.value = false  // 关闭弹窗
    emit('success')  // 通知父组件：操作成功
  } finally {
    formLoading.value = false  // 关闭加载状态
  }
}

// 重置表单
const resetForm = () => {
  formData.value = {
    id: undefined,
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
    brandCompany: undefined,
    applyDate: undefined,
    applyDatetime: undefined,
    isSee: '0',
    channel: undefined,
    workflowid: undefined,
    isOnline: undefined,
    brand: undefined,
  }
  formRef.value?.resetFields()  // 重置Element Plus表单状态
}

// 暴露open方法给父组件
defineExpose({ open })
</script>

<style scoped>
/* 弹窗样式覆盖：匹配授权页面外层背景 */
.gwd-auth-dialog {
  --el-dialog-bg-color: #edf0f8;  /* 授权页面外层背景色 */
  --el-dialog-padding: 0;          /* 取消弹窗默认内边距，自定义布局 */
}

/* 输入框/下拉框hover效果：对齐授权页面gwd-hoverable样式 */
.wea-input-normal:hover,
.wea-edc-form-combobox:hover {
  border-color: #2f54eb;  /* 授权页面蓝色系，提升交互反馈 */
  box-shadow: 0 0 0 2px rgba(47, 84, 235, 0.1);
  transition: all 0.2s ease;
}

/* 表单标签样式：对齐授权页面字体 */
.el-form-item__label {
  font-family: "Microsoft YaHei", "Arial", "SimSun", serif;
  font-size: 14px;
  color: #333;
}

/* 必填项星号样式：对齐授权页面红色标识 */
.el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label:before {
  color: #ff3532;  /* 授权页面红色 #ff3532 */
  margin-right: 4px;
}
</style>
