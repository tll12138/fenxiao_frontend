<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    v-loading="formLoading"
    label-width="0px"
    :inline-message="true"
  >
    <el-table :data="formData" class="-mt-10px">
      <el-table-column label="序号" type="index" width="70"/>
      <el-table-column label="联系人" min-width="80">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.manager`" :rules="formRules.manager" class="mb-0px!">
            <el-input v-model="row.manager" placeholder="请输入联系人"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" min-width="100">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.phone`" :rules="formRules.phone" class="mb-0px!">
            <el-input v-model="row.phone" placeholder="请输入联系电话"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="省市区" min-width="150">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.province`" :rules="formRules.pcd" class="mb-0px!">
            <el-cascader
              size="default"
              filterable
              :options="pcaTextArr"
              v-model="row.province"
              @change="handleChange($index)"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="发货地址" min-width="250">
        <template #default="{ row, $index }">
          <el-form-item :prop="`${$index}.address`" :rules="formRules.address" class="mb-0px!">
            <el-input v-model="row.address" placeholder="请输入发货地址"/>
          </el-form-item>
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
    <el-button @click="handleAdd" round>+ 添加分销商地址</el-button>
  </el-row>
</template>
<script setup lang="ts">
import {pcaTextArr} from 'element-china-area-data'
import {CreateCustomerAddressVO} from "@/api/fx/customeraddress";
// const customerAddressList = defineProps<CreateCustomerAddressVO[]>('customerAddressList')
const props = defineProps({customerAddressList: Array });
const formLoading = ref(false) // 表单的加载中
const formData = ref<CreateCustomerAddressVO[]>([])
const formRules = reactive({
  manager: [
    {required: true, message: '请输入联系人', trigger: 'blur'},
  ],
  phone: [
    {required: true, message: '请输入联系电话', trigger: 'blur'},
  ],
  pcd: [
    {required: true, message: '请选择省市区', trigger: 'blur'},
  ],
  address: [
    {required: true, message: '请输入发货地址', trigger: 'blur'},
  ],
})
const formRef = ref() // 表单 Ref
/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.customerAddressList,
  async (val) => {
    //处理数据
    val?.forEach((item) => {
      //@ts-ignore
      item.province = [item.province, item.city, item.district]
    })
    //@ts-ignore
    formData.value = val
  },
  {immediate: true}
)

/** 新增按钮操作 */
const handleAdd = () => {
  const row = {
    manager: undefined,
    phone: undefined,
    province: undefined,
    city: undefined,
    district: undefined,
    address: undefined,
  }
  //@ts-ignore
  formData.value.push(row)
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

const handleChange = (value) => {
  console.log(value)
}

defineExpose({validate, getData})
</script>
