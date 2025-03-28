<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
<!--      <el-form-item label="类型" prop="type">-->
<!--        <el-select v-model="formData.type" placeholder="请选择类型">-->
<!--          <el-option-->
<!--            v-for="dict in getStrDictOptions(DICT_TYPE.$dictType.toUpperCase())"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
      <el-form-item label="单据编号" prop="soId">
        <el-input v-model="formData.soId" placeholder="请输入单据编号" />
      </el-form-item>
      <el-form-item label="消息内容" prop="msg">
        <el-input v-model="formData.msg" placeholder="请输入消息内容" />
      </el-form-item>
      <el-form-item label="计划发送时间" prop="sendTime">
        <el-date-picker
          v-model="formData.sendTime"
          type="date"
          value-format="x"
          placeholder="选择计划发送时间"
        />
      </el-form-item>
      <el-form-item label="仓库" prop="warehouseId">
        <el-input v-model="formData.warehouseId" placeholder="请输入仓库" />
      </el-form-item>
      <el-form-item label="是否发送" prop="isSend">
        <el-select v-model="formData.isSend" placeholder="请选择是否发送">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.YES_NO)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { SentMessageApi, SentMessageVO } from '@/api/fx/sentmessage'

/** 分销发货要求消息 表单 */
defineOptions({ name: 'SentMessageForm' })

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  type: undefined,
  soId: undefined,
  msg: undefined,
  sendTime: undefined,
  warehouseId: undefined,
  isSend: undefined,
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
      formData.value = await SentMessageApi.getSentMessage(id)
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
    const data = formData.value as unknown as SentMessageVO
    if (formType.value === 'create') {
      await SentMessageApi.createSentMessage(data)
      message.success(t('common.createSuccess'))
    } else {
      await SentMessageApi.updateSentMessage(data)
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
    type: undefined,
    soId: undefined,
    msg: undefined,
    sendTime: undefined,
    warehouseId: undefined,
    isSend: undefined,
  }
  formRef.value?.resetFields()
}
</script>
