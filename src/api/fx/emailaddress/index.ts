import request from '@/config/axios'

// 发票邮箱库 VO
export interface EmailAddressVO {
  id: number // id
  customerId: string // 用户编号
  email: string // 邮箱地址
  remark: string // 备注
}

// 发票邮箱库 API
export const EmailAddressApi = {
  // 查询发票邮箱库分页
  getEmailAddressPage: async (params: any) => {
    return await request.get({ url: `/fx/email-address/page`, params })
  },

  // 查询发票邮箱库详情
  getEmailAddress: async (id: number) => {
    return await request.get({ url: `/fx/email-address/get?id=` + id })
  },

  // 新增发票邮箱库
  createEmailAddress: async (data: EmailAddressVO) => {
    return await request.post({ url: `/fx/email-address/create`, data })
  },

  // 修改发票邮箱库
  updateEmailAddress: async (data: EmailAddressVO) => {
    return await request.put({ url: `/fx/email-address/update`, data })
  },

  // 删除发票邮箱库
  deleteEmailAddress: async (id: number) => {
    return await request.delete({ url: `/fx/email-address/delete?id=` + id })
  },

  // 导出发票邮箱库 Excel
  exportEmailAddress: async (params) => {
    return await request.download({ url: `/fx/email-address/export-excel`, params })
  },
}