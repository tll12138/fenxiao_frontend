import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'

// 表单校验
export const rules = reactive({
})

// CrudSchema https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: 'ID',
    field: 'id',
    isForm: false,
  },
  {
    label: '分销商编号',
    field: 'distributorNum',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    },
  },
  {
    label: '业务主体',
    field: 'company',
    isSearch: true,
  },
  {
    label: '余额',
    field: 'balance',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    },
  },
  {
    label: '账户编号',
    field: 'accountId',
    isSearch: true,
  },
  {
    label: '暂扣金额',
    field: 'detainAmount',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    },
  },
  {
    label: '是否冻结',
    field: 'isActive',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    },
  },
  {
    label: '押金',
    field: 'deposit',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    },
  },
  {
    label: '创建时间',
    field: 'createTime',
    formatter: dateFormatter,
    isSearch: true,
    search: {
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        type: 'daterange',
        defaultTime: [new Date('1 00:00:00'), new Date('1 23:59:59')]
      }
    },
    isForm: false,
  },
  {
    label: '操作',
    field: 'action',
    isForm: false
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
