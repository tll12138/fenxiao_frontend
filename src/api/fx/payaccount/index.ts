import request from '@/config/axios'

// 分销支付账户 VO
export interface PayAccountVO {
  id: number // 序号
  payType: number // 类型
  customerId: string // 分销商账户
  accountNo: string // 付款账户
  description: string // 说明
  isActive: string // 是否可用
}

// 分销支付账户 API
export const PayAccountApi = {
  // 查询分销支付账户分页
  getPayAccountPage: async (params: any) => {
    return await request.get({ url: `/fx/pay-account/page`, params })
  },

  // 查询分销支付账户详情
  getPayAccount: async (id: number) => {
    return await request.get({ url: `/fx/pay-account/get?id=` + id })
  },

  // 新增分销支付账户
  createPayAccount: async (data: PayAccountVO) => {
    return await request.post({ url: `/fx/pay-account/create`, data })
  },

  // 修改分销支付账户
  updatePayAccount: async (data: PayAccountVO) => {
    return await request.put({ url: `/fx/pay-account/update`, data })
  },

  // 删除分销支付账户
  deletePayAccount: async (id: number) => {
    return await request.delete({ url: `/fx/pay-account/delete?id=` + id })
  },

  // 导出分销支付账户 Excel
  exportPayAccount: async (params) => {
    return await request.download({ url: `/fx/pay-account/export-excel`, params })
  },
}