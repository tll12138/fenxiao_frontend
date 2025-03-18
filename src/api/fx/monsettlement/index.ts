import request from '@/config/axios'

// 分销账户月结 VO
export interface MonSettlementVO {
  id: number // 序号
  month: string // 年月
  totalAmount: number // 月结总余额
  withheldAmount: number // 暂扣金额
  availableAmount: number // 可用余额
  account: string // 账户
  company: string // 业务主体
}

// 分销账户月结 API
export const MonSettlementApi = {
  // 查询分销账户月结分页
  getMonSettlementPage: async (params: any) => {
    return await request.get({ url: `/fx/mon-settlement/page`, params })
  },

  // 查询分销账户月结详情
  getMonSettlement: async (id: number) => {
    return await request.get({ url: `/fx/mon-settlement/get?id=` + id })
  },

  // 新增分销账户月结
  createMonSettlement: async (data: MonSettlementVO) => {
    return await request.post({ url: `/fx/mon-settlement/create`, data })
  },

  // 修改分销账户月结
  updateMonSettlement: async (data: MonSettlementVO) => {
    return await request.put({ url: `/fx/mon-settlement/update`, data })
  },

  // 删除分销账户月结
  deleteMonSettlement: async (id: number) => {
    return await request.delete({ url: `/fx/mon-settlement/delete?id=` + id })
  },

  // 导出分销账户月结 Excel
  exportMonSettlement: async (params) => {
    return await request.download({ url: `/fx/mon-settlement/export-excel`, params })
  },
}