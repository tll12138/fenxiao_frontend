import request from '@/config/axios'

//  分销打款账户 VO
export interface FromAccountVO {
  id: number // 序号
  account: string // 打款账户号
  customerId: string // 所属分销商
  accountType: number // 账户类型
  remark: string // 说明
  isActive: string // 是否有效
  totalNum: number // 累计打款次数
  totalAmt: number // 累计打款金额
  accountName: string // 打款方名称
  accountId: string // 所属账户名称
}

//  分销打款账户 API
export const FromAccountApi = {
  // 查询 分销打款账户分页
  getFromAccountPage: async (params: any) => {
    return await request.get({ url: `/fx/from-account/page`, params })
  },

  // 查询 分销打款账户详情
  getFromAccount: async (id: number) => {
    return await request.get({ url: `/fx/from-account/get?id=` + id })
  },

  // 新增 分销打款账户
  createFromAccount: async (data: FromAccountVO) => {
    return await request.post({ url: `/fx/from-account/create`, data })
  },

  // 修改 分销打款账户
  updateFromAccount: async (data: FromAccountVO) => {
    return await request.put({ url: `/fx/from-account/update`, data })
  },

  // 删除 分销打款账户
  deleteFromAccount: async (id: number) => {
    return await request.delete({ url: `/fx/from-account/delete?id=` + id })
  },

  // 导出 分销打款账户 Excel
  exportFromAccount: async (params) => {
    return await request.download({ url: `/fx/from-account/export-excel`, params })
  },
}