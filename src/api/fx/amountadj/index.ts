import request from '@/config/axios'

// 分销账户资金调整记录 VO
export interface AmountAdjVO {
  id: number // 序号
  soId: string // 流程编号
  amount: number // 调整金额
  orderDate: string // 调整日期
  account: string // 调整账户
  remark: string // 调整说明
  type: number // 调整类型
  adjustBalance: number // 调整后余额
}

// 分销账户资金调整记录 API
export const AmountAdjApi = {
  // 查询分销账户资金调整记录分页
  getAmountAdjPage: async (params: any) => {
    return await request.get({ url: `/fx/amount-adj/page`, params })
  },

  // 查询分销账户资金调整记录详情
  getAmountAdj: async (id: number) => {
    return await request.get({ url: `/fx/amount-adj/get?id=` + id })
  },

  // 新增分销账户资金调整记录
  createAmountAdj: async (data: AmountAdjVO) => {
    return await request.post({ url: `/fx/amount-adj/create`, data })
  },

  // 修改分销账户资金调整记录
  updateAmountAdj: async (data: AmountAdjVO) => {
    return await request.put({ url: `/fx/amount-adj/update`, data })
  },

  // 删除分销账户资金调整记录
  deleteAmountAdj: async (id: number) => {
    return await request.delete({ url: `/fx/amount-adj/delete?id=` + id })
  },

  // 导出分销账户资金调整记录 Excel
  exportAmountAdj: async (params) => {
    return await request.download({ url: `/fx/amount-adj/export-excel`, params })
  },
}