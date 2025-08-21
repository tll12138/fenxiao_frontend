import request from '@/config/axios'

// 开票信息 VO
export interface BillingInfoVO {
  id: number // id
  customerId: number // 客商
  company: string // 购方名称
  tax: string // 纳税人识别号
  bank: string // 开户行及账号
  address: string // 地址及电话
  isActive: string // 是否生效
  remark: string // 备注
  email: string // 发送邮箱
}

// 开票信息 API
export const BillingInfoApi = {
  // 查询开票信息分页
  getBillingInfoPage: async (params: any) => {
    return await request.get({ url: `/fx/billing-info/page`, params })
  },

  // 查询开票信息详情
  getBillingInfo: async (id: number) => {
    return await request.get({ url: `/fx/billing-info/get?id=` + id })
  },

  // 新增开票信息
  createBillingInfo: async (data: BillingInfoVO) => {
    return await request.post({ url: `/fx/billing-info/create`, data })
  },

  // 修改开票信息
  updateBillingInfo: async (data: BillingInfoVO) => {
    return await request.put({ url: `/fx/billing-info/update`, data })
  },

  // 删除开票信息
  deleteBillingInfo: async (id: number) => {
    return await request.delete({ url: `/fx/billing-info/delete?id=` + id })
  },

  // 导出开票信息 Excel
  exportBillingInfo: async (params) => {
    return await request.download({ url: `/fx/billing-info/export-excel`, params })
  },
}