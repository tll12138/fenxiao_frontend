import request from '@/config/axios'

// 发票申请 VO
export interface BillApplyVO {
  id: number // 序号
  applyMan: number // 申请人
  applyDate: string // 申请日期
  billDate: string // 开票日期
  address: string // 地址及电话
  bankNo: string // 开户行及账号
  amount: number // 金额合计
  maker: number // 操作员
  remark: string // 备注
  billType: number // 发票类型
  totalAmount: string // 金额合计(大写)
  saleOrder: string // 销售单
  billHead: string // 发票抬头
  document: string // 发票附件
  financialStatement: string // 财务说明
  purchaserName: string // 购方名称
  taxNo: string // 纳税人识别号
  cusName: string // 客户名称
  billInfo: string // 开票信息
  rid: number // 开票流程
  isOver: number // 是否完成
  isYj: number // 是否芽肌
  email: string // 发票邮箱
  emailId: string // 关联邮箱
  isSend: number // 发票发送状态
}

// 发票申请 API
export const BillApplyApi = {
  // 查询发票申请分页
  getBillApplyPage: async (params: any) => {
    return await request.get({ url: `/fx/bill-apply/page`, params })
  },

  // 查询发票申请详情
  getBillApply: async (id: number) => {
    return await request.get({ url: `/fx/bill-apply/get?id=` + id })
  },

  // 新增发票申请
  createBillApply: async (data: BillApplyVO) => {
    return await request.post({ url: `/fx/bill-apply/create`, data })
  },

  // 保存发票申请
  saveBillApply: async (data: BillApplyVO) => {
    return await request.post({ url: `/fx/bill-apply/save`, data })
  },

  // 修改发票申请
  updateBillApply: async (data: BillApplyVO) => {
    return await request.put({ url: `/fx/bill-apply/update`, data })
  },

  // 删除发票申请
  deleteBillApply: async (id: number) => {
    return await request.delete({ url: `/fx/bill-apply/delete?id=` + id })
  },

  // 导出发票申请 Excel
  exportBillApply: async (params) => {
    return await request.download({ url: `/fx/bill-apply/export-excel`, params })
  },

// ==================== 子表（发票申请详情） ====================

  // 获得发票申请详情列表
  getBillApplyDetailListByMainId: async (mainId) => {
    return await request.get({ url: `/fx/bill-apply/bill-apply-detail/list-by-main-id?mainId=` + mainId })
  },
}
