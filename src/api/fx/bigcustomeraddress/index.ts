import request from '@/config/axios'

// 分销大客户地址 VO
export interface BigCustomerAddressVO {
  id?: number // 序号
  customerId?: number // 分销商
  customerName?: string // 分销商名称
  province?: string // 省
  city?: string // 市
  district?: string // 区
  address?: string // 地址
  person?: string // 联系人
  contact?: string // 联系电话
  isActive?: string // 是否可用
  status?: string // 审批状态
  remark?: string // 备注
  brand?: string // 所属品牌
  count?: number // 使用次数
}

// 分销大客户地址 API
export const BigCustomerAddressApi = {
  // 查询分销大客户地址分页
  getBigCustomerAddressPage: async (params: any) => {
    return await request.get({ url: `/fx/big-customer-address/page`, params })
  },

  // 查询分销大客户地址详情
  getBigCustomerAddress: async (id: number) => {
    return await request.get({ url: `/fx/big-customer-address/get?id=` + id })
  },

  // 新增分销大客户地址
  createBigCustomerAddress: async (data: BigCustomerAddressVO) => {
    return await request.post({ url: `/fx/big-customer-address/create`, data })
  },

  // 修改分销大客户地址
  updateBigCustomerAddress: async (data: BigCustomerAddressVO) => {
    return await request.put({ url: `/fx/big-customer-address/update`, data })
  },

  // 删除分销大客户地址
  deleteBigCustomerAddress: async (id: number) => {
    return await request.delete({ url: `/fx/big-customer-address/delete?id=` + id })
  },

  // 导出分销大客户地址 Excel
  exportBigCustomerAddress: async (params) => {
    return await request.download({ url: `/fx/big-customer-address/export-excel`, params })
  },
}
