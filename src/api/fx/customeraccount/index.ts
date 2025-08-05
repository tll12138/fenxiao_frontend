import request from '@/config/axios'

// 分销商账号 VO
export interface CustomerAccountVO {
  id: number // ID
  distributorId: number // 分销商编号
  distributorName: string // 分销商名称
  balance: number // 余额
  accountId: string // 账户编号
  detainAmount: number // 暂扣金额
  isActive: number // 是否冻结
  deposit: number // 押金
  company: number // 业务主体
  vAmount: number // 货补虚拟金额
  isAllow: number // 是否允许超额提货（0否1是）
  quota: number // 超额提货额度
  remark: string // 备注
  isRep: number // 是否计算货补（0否1是）
  zkVAmount: number // 暂扣货补金额
  name: string // 账户名
}

// 分销商账号 API
export const CustomerAccountApi = {
  // 查询分销商账号分页
  getCustomerAccountPage: async (params: any) => {
    return await request.get({ url: `/fx/customer-account/page`, params })
  },

  // 查询分销商账号详情
  getCustomerAccount: async (id: number) => {
    return await request.get({ url: `/fx/customer-account/get?id=` + id })
  },

  // 新增分销商账号
  createCustomerAccount: async (data: CustomerAccountVO) => {
    return await request.post({ url: `/fx/customer-account/create`, data })
  },

  // 修改分销商账号
  updateCustomerAccount: async (data: CustomerAccountVO) => {
    return await request.put({ url: `/fx/customer-account/update`, data })
  },

  // 删除分销商账号
  deleteCustomerAccount: async (id: number) => {
    return await request.delete({ url: `/fx/customer-account/delete?id=` + id })
  },

  // 导出分销商账号 Excel
  exportCustomerAccount: async (params) => {
    return await request.download({ url: `/fx/customer-account/export-excel`, params })
  },

  // 根据分销商和业务主体查询分销商账号
  getCustomerAccountByCusAndEntity: async (customerId: number,
                             entityId: number) => {
    return await request.get({ url: `/fx/customer-account/getByCusAndEntity?customerId=` + customerId + '&entityId=' + entityId })
  },
}
