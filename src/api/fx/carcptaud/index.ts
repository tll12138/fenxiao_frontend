import request from '@/config/axios'

// 客商账户收款审核 VO
export interface CaRcptAudVO {
  id: number // 序号
  orderNo: string // 单据编号
  reason: number // 费用类型
  payType: number // 支付方式
  payWarrant: string // 支付证明 
  account: string // 实际账户
  receive: number // 收款金额
  remark: string // 备注
  customer: string // 分销商
  customerName: string // 分销商名称
  soId: string // 业务单据
  submiter: string // 提交人
  submiterName: string // 提交人姓名
  paymentAccount: string // 打款账户
  custLevel: number // 客户等级
  paymentAccountName: string // 打款账户名称
  isRepeat: string // 是否重复
  businessEntity: number // 业务主体
  orderDate: string // 申请日期
  isWeek: string // 是否节假日
}

// 客商账户收款审核 API
export const CaRcptAudApi = {
  // 查询客商账户收款审核分页
  getCaRcptAudPage: async (params: any) => {
    return await request.get({ url: `/fx/ca-rcpt-aud/page`, params })
  },

  // 查询客商账户收款审核详情
  getCaRcptAud: async (id: number) => {
    return await request.get({ url: `/fx/ca-rcpt-aud/get?id=` + id })
  },

  // 查询分销账户收款记录详情
  getAccountCollectionByProcessInstanceId: async (processInstanceId: string) => {
    return await request.get({ url: `/fx/ca-rcpt-aud/getByProcessInstanceId?processInstanceId=` + processInstanceId })
  },

  // 新增客商账户收款审核
  createCaRcptAud: async (data: CaRcptAudVO) => {
    return await request.post({ url: `/fx/ca-rcpt-aud/create`, data })
  },

  // 修改客商账户收款审核
  updateCaRcptAud: async (data: CaRcptAudVO) => {
    return await request.put({ url: `/fx/ca-rcpt-aud/update`, data })
  },

  // 删除客商账户收款审核
  deleteCaRcptAud: async (id: number) => {
    return await request.delete({ url: `/fx/ca-rcpt-aud/delete?id=` + id })
  },

  // 导出客商账户收款审核 Excel
  exportCaRcptAud: async (params) => {
    return await request.download({ url: `/fx/ca-rcpt-aud/export-excel`, params })
  },

  startProcessInstanceByStartUser: async (data: CaRcptAudVO) => {
    return await request.post({ url: '/fx/ca-rcpt-aud/start-by-start-user', data })
  }
}
