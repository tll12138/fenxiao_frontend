<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible" class="bill-apply-dialog">
    <!-- 表单主体 -->
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
      class="bill-apply-form"
    >
      <!-- 表单分组：基础信息 -->
      <div class="form-section">
        <h3 class="section-title">基础信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请人" prop="applyMan">
              <el-select v-model="formData.applyMan" multiple placeholder="请选择申请人" :disabled="true">
                <el-option
                  v-for="item in userOptions"
                  :key="item.id"
                  :label="item.nickname"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker
                v-model="formData.applyDate"
                type="date"
                value-format="x"
                placeholder="选择申请日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票日期" prop="billDate">
              <el-date-picker
                v-model="formData.billDate"
                type="date"
                value-format="x"
                placeholder="选择开票日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型" prop="billType">
              <el-select v-model="formData.billType" placeholder="请选择发票类型">
                <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.FX_BILL_TYPE)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 表单分组：发票信息 -->
      <div class="form-section">
        <h3 class="section-title">发票信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发票抬头" prop="billHead">
              <el-select v-model="formData.billHead" placeholder="请选择发票抬头">
                <el-option
                  v-for="dict in getStrDictOptions(DICT_TYPE.FX_BUSINESS_ENTITY)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额合计" prop="amount">
              <el-input v-model="formData.amount" placeholder="请输入金额合计" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="金额合计(大写)" prop="totalAmount">
              <el-input v-model="formData.totalAmount" placeholder="请输入金额合计(大写)" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开票流程" prop="rid">
              <el-input v-model="formData.rid" placeholder="请输入开票流程" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 表单分组：购方信息 -->
      <div class="form-section">
        <h3 class="section-title">购方信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="购方名称" prop="purchaserName">
              <el-input v-model="formData.purchaserName" placeholder="请输入购方名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纳税人识别号" prop="taxNo">
              <el-input v-model="formData.taxNo" placeholder="请输入纳税人识别号" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址及电话" prop="address">
              <el-input v-model="formData.address" placeholder="请输入地址及电话" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开户行及账号" prop="bankNo">
              <el-input v-model="formData.bankNo" placeholder="请输入开户行及账号" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 表单分组：其他信息 -->
      <div class="form-section">
        <h3 class="section-title">其他信息</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否完成" prop="isOver">
              <el-select v-model="formData.isOver" placeholder="请选择是否完成">
                <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否芽肌" prop="isYj">
              <el-select v-model="formData.isYj" placeholder="请选择是否芽肌">
                <el-option
                  v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票邮箱" prop="email">
              <el-input v-model="formData.email" placeholder="请输入发票邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票发送状态" prop="isSend">
              <el-select v-model="formData.isSend" placeholder="请选择发送状态">
                <el-option label="未发送" value="0" />
                <el-option label="已发送" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" placeholder="请输入备注" type="textarea" rows="3" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="财务说明" prop="financialStatement">
              <el-input
                v-model="formData.financialStatement"
                placeholder="请输入财务说明"
                type="textarea"
                rows="3"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="发票附件" prop="document">
              <el-upload
                class="upload-demo"
                action="/api/file/upload"
                :on-success="handleFileSuccess"
                :file-list="fileList"
                list-type="text"
              >
                <el-button type="primary">点击上传</el-button>
                <template #tip>
                  <div class="el-upload__tip">支持上传pdf、jpg、png格式文件，单个文件不超过10MB</div>
                </template>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <template #footer>
      <el-button @click="dialogVisible = false" class="cancel-btn">取 消</el-button>
      <el-button @click="submitForm" type="primary" :disabled="formLoading" class="confirm-btn"
      >确 定</el-button
      >
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import {DICT_TYPE, getDictOptions, getIntDictOptions, getStrDictOptions} from '@/utils/dict'
import { BillApplyApi, BillApplyVO } from '@/api/fx/billapply'
import BillApplyDetailForm from './components/BillApplyDetailForm.vue'
import * as UserApi from '@/api/system/user'
import { useUserStore } from '@/store/modules/user'

/** 发票申请 表单组件定义 */
defineOptions({ name: 'BillApplyForm' })

/** 国际化 hook */
const { t } = useI18n()
/** 消息弹窗 hook */
const message = useMessage()

/** 控制弹窗显示/隐藏 */
const dialogVisible = ref(false)
/** 弹窗标题 */
const dialogTitle = ref('')
/** 表单加载状态（数据加载/提交时） */
const formLoading = ref(false)
/** 表单类型：create-新增；update-修改 */
const formType = ref('')
/** 上传文件列表 */
const fileList = ref([])
/** 用户选项列表 */
const userOptions = ref([])
/** 当前登录用户信息 */
const userId = useUserStore().getUser.id
const initialApplyMan = [userId]

/** 表单数据 */
const formData = ref({
  id: undefined,
  applyMan: undefined,
  applyDate: undefined,
  billDate: undefined,
  address: undefined,
  bankNo: undefined,
  amount: undefined,
  maker: undefined,
  remark: undefined,
  billType: undefined,
  totalAmount: undefined,
  saleOrder: [],
  billHead: undefined,
  document: undefined,
  financialStatement: undefined,
  purchaserName: undefined,
  taxNo: undefined,
  cusName: undefined,
  billInfo: undefined,
  rid: undefined,
  isOver: undefined,
  isYj: undefined,
  email: undefined,
  emailId: undefined,
  isSend: undefined
})

/** 表单校验规则 */
const formRules = reactive({
  applyMan: [{ required: true, message: '申请人不能为空', trigger: 'blur' }],
  isOver: [{ required: true, message: '是否完成不能为空', trigger: 'change' }],
  applyDate: [{ required: true, message: '申请日期不能为空', trigger: 'change' }],
  billType: [{ required: true, message: '发票类型不能为空', trigger: 'change' }]
})

/** 表单引用 */
const formRef = ref()

/** 子表标签页名称 */
const subTabsName = ref('billApplyDetail')
/** 子表表单引用 */
const billApplyDetailFormRef = ref()

// 在组件初始化时提前加载用户列表，而非onMounted
const initUserOptions = async () => {
  try {
    userOptions.value = await UserApi.getSimpleUserList()
  } catch (error) {
    message.error('获取用户列表失败')
    console.error(error)
  }
}

// 优先加载用户列表
initUserOptions()
/** 初始化获取用户列表 */
onMounted(async () => {

})

/**
 * 处理文件上传成功
 */
const handleFileSuccess = (response, file, fileList) => {
  if (response.code === 0) {
    formData.value.document = response.data
    message.success('文件上传成功')
  } else {
    message.error('文件上传失败：' + response.msg)
  }
}

/**
 * 打开表单弹窗
 * @param type 表单类型（create/update）
 * @param id 数据ID（修改时需要）
 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm() // 先重置

  if (type === 'create') {
    formData.value.applyMan = [userId] // 新建时默认数组
    console.log('默认绑定的审核人数据：', formData.value.applyMan) // 确认前端绑定正确
  }

  if (id) {
    formLoading.value = true
    try {
      const res = await BillApplyApi.getBillApply(id)
      // 核心修复：确保applyMan为数组（处理后端返回单个ID的情况）
      console.log('后端返回的审核人数据：', res.applyMan) // 确认后端有值
      formData.value = {
        ...res,
        applyMan: Array.isArray(res.applyMan) ? res.applyMan : res.applyMan ? [res.applyMan] : []
      }
      console.log('转换后绑定的审核人数据：', formData.value.applyMan) // 确认前端绑定正确
      // 初始化文件列表
      if (formData.value.document) {
        fileList.value = [{ name: '已上传文件', url: formData.value.document }]
      }
    } finally {
      formLoading.value = false
    }
  }
}

/** 暴露open方法供外部调用 */
defineExpose({ open })

/** 定义成功回调事件 */
const emit = defineEmits(['success'])

/** 提交表单 */
const submitForm = async () => {
  // 校验主表单
  await formRef.value.validate()
  // 校验子表单
  try {
    await billApplyDetailFormRef.value.validate()
  } catch (e) {
    subTabsName.value = 'billApplyDetail'
    return
  }
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as BillApplyVO
    // 拼接子表数据
    data.billApplyDetails = billApplyDetailFormRef.value.getData()
    if (formType.value === 'create') {
      await BillApplyApi.createBillApply(data)
      message.success(t('common.createSuccess'))
    } else {
      await BillApplyApi.updateBillApply(data)
      message.success(t('common.updateSuccess'))
    }
    // 触发成功事件
    emit('success')
    // 关闭弹窗
    dialogVisible.value = false
  } finally {
    formLoading.value = false
  }
}

/** 重置表单数据 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    applyMan: undefined,
    applyDate: undefined,
    billDate: undefined,
    address: undefined,
    bankNo: undefined,
    amount: undefined,
    maker: undefined,
    remark: undefined,
    billType: undefined,
    totalAmount: undefined,
    saleOrder: [],
    billHead: undefined,
    document: undefined,
    financialStatement: undefined,
    purchaserName: undefined,
    taxNo: undefined,
    cusName: undefined,
    billInfo: undefined,
    rid: undefined,
    isOver: undefined,
    isYj: undefined,
    email: undefined,
    emailId: undefined,
    isSend: undefined
  }
  fileList.value = []
  formRef.value?.resetFields()
}
</script>

<style scoped>
/* 弹窗样式优化 */
.bill-apply-dialog {
  --el-dialog-width: 900px;
  --el-dialog-padding: 20px;
}

/* 表单样式优化 */
.bill-apply-form {
  padding: 10px 0;
}

/* 表单分组样式 */
.form-section {
  margin-bottom: 25px;
  padding: 15px;
  background-color: #f9fafb;
  border-radius: 6px;
  border: 1px solid #eee;
}

.section-title {
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  font-size: 16px;
  color: #1f2329;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409eff;
  margin-right: 8px;
  border-radius: 2px;
}

.el-form-item {
  margin-bottom: 18px;
}

.el-input,
.el-select,
.el-date-picker {
  width: 100%;
}

.el-textarea__inner {
  resize: vertical;
}

/* 按钮样式优化 */
:deep(.el-dialog__footer) {
  padding: 15px 20px;
  border-top: 1px solid #e5e7eb;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.cancel-btn {
  margin-right: 10px;
}

.confirm-btn {
  margin-left: 0;
}

/* 上传组件样式 */
:deep(.el-upload__tip) {
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .bill-apply-dialog {
    --el-dialog-width: 95%;
  }

  .form-section {
    padding: 10px;
    margin-bottom: 15px;
  }

  .section-title {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .el-form-item {
    margin-bottom: 12px;
  }

  .el-col {
    --el-col-span: 24 !important;
  }
}
</style>
