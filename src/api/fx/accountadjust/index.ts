import request from '@/config/axios'

// 分销账户调整 VO
export interface AccountAdjustVO {
  id: number // 序号
  orderNo: string // 单据编号
  reason: string // 费用类型
  account: string // 调整分销账户
  remark: string // 调整说明
  submiter: string // 提交人
  adjAmount: number // 调整金额
  afterAmount: number // 调整后账户余额
  nowAmount: number // 当前账户余额
  company: string // 业务主体
  nowTempAmount: number // 当前暂扣账户金额
  afterTempAmount: number // 调整后暂扣账户金额
  type: string // 调整类型
}

// 分销账户调整 API
export const AccountAdjustApi = {
  // 查询分销账户调整分页
  getAccountAdjustPage: async (params: any) => {
    return await request.get({ url: `/fx/account-adjust/page`, params })
  },

  // 查询分销账户调整详情
  getAccountAdjust: async (id: number) => {
    return await request.get({ url: `/fx/account-adjust/get?id=` + id })
  },

  // 新增分销账户调整
  createAccountAdjust: async (data: AccountAdjustVO) => {
    return await request.post({ url: `/fx/account-adjust/create`, data })
  },

  // 修改分销账户调整
  updateAccountAdjust: async (data: AccountAdjustVO) => {
    return await request.put({ url: `/fx/account-adjust/update`, data })
  },

  // 删除分销账户调整
  deleteAccountAdjust: async (id: number) => {
    return await request.delete({ url: `/fx/account-adjust/delete?id=` + id })
  },

  // 导出分销账户调整 Excel
  exportAccountAdjust: async (params) => {
    return await request.download({ url: `/fx/account-adjust/export-excel`, params })
  },
}