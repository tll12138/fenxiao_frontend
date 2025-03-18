import request from '@/config/axios'

// 分销账户收款记录 VO
export interface AccountCollectionVO {
  id: number // 主键
  orderNo: string // 单据编号
  reason: string // 费用类型
  payType: string // 支付方式
  payProof: string // 支付证明
  account: string // 实际账户
  receive: number // 收款金额
  remark: string // 备注
  customer: string // 分销商
  soId: string // 业务单据
  submiter: string // 提交人
  payoutAccountId: string // 打款账户
  level: string // 客户等级
  payoutAccountName: string // 打款账户名称
  isRepeat: string // 是否重复
  mainId: string // 业务主体
  orderDate: Date // 申请日期
  isWeek: string // 是否周末
}

// 分销账户收款记录 API
export const AccountCollectionApi = {
  // 查询分销账户收款记录分页
  getAccountCollectionPage: async (params: any) => {
    return await request.get({ url: `/fx/account-collection/page`, params })
  },

  // 查询分销账户收款记录详情
  getAccountCollection: async (id: number) => {
    return await request.get({ url: `/fx/account-collection/get?id=` + id })
  },

  // 新增分销账户收款记录
  createAccountCollection: async (data: AccountCollectionVO) => {
    return await request.post({ url: `/fx/account-collection/create`, data })
  },

  // 修改分销账户收款记录
  updateAccountCollection: async (data: AccountCollectionVO) => {
    return await request.put({ url: `/fx/account-collection/update`, data })
  },

  // 删除分销账户收款记录
  deleteAccountCollection: async (id: number) => {
    return await request.delete({ url: `/fx/account-collection/delete?id=` + id })
  },

  // 导出分销账户收款记录 Excel
  exportAccountCollection: async (params) => {
    return await request.download({ url: `/fx/account-collection/export-excel`, params })
  },
}