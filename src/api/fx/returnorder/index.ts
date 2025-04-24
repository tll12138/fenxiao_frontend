import request from '@/config/axios'

// FX 销售退货单 VO
export interface ReturnOrderVO {
  id: number // id
  processInstanceId: string // 流程实例ID
  orderId: string // 单据编号
  orderDate: Date // 单据日期
  orderStatus: number // 单据状态
  returnType: number // 退货类型
  originOrder: string // 原销售单
  returnUserId: number // 退货方
  returnDealer: number // 退货经销商
  receiveDealer: number // 收货经销商
  warehouse: string // 收货仓库
  warehouseFeature: string // 仓库功能
  logisticsNumber: string // 物流单号
  logisticsCompany: string // 物流公司
  warehouseCode: string // 发货仓库编码
  returnBusinessType: number // 退货业务类型
  originQuantity: number // 原单数量
  remark: string // 备注
  totalReturnAmount: number // 总退货金额
  totalReturnQuantity: number // 总退货数量
  erpOrderNumber: string // erp单号
  isToErp: number // 是否传erp
  toErpTime: Date // 传erp时间
}

// FX 销售退货单 API
export const ReturnOrderApi = {
  // 查询FX 销售退货单分页
  getReturnOrderPage: async (params: any) => {
    return await request.get({ url: `/fx/return-order/page`, params })
  },

  // 查询FX 销售退货单详情
  getReturnOrder: async (id: number) => {
    return await request.get({ url: `/fx/return-order/get?id=` + id })
  },

  // 新增FX 销售退货单
  submitReturnOrder: async (data: ReturnOrderVO) => {
    return await request.post({ url: `/fx/return-order/submit`, data })
  },

  // 新增FX 销售退货单
  saveReturnOrder: async (data: ReturnOrderVO) => {
    return await request.post({ url: `/fx/return-order/save`, data })
  },

  // 修改FX 销售退货单
  updateReturnOrder: async (data: ReturnOrderVO) => {
    return await request.put({ url: `/fx/return-order/update`, data })
  },

  // 删除FX 销售退货单
  deleteReturnOrder: async (id: number) => {
    return await request.delete({ url: `/fx/return-order/delete?id=` + id })
  },

  // 导出FX 销售退货单 Excel
  exportReturnOrder: async (params) => {
    return await request.download({ url: `/fx/return-order/export-excel`, params })
  },

  //销售退货单取消审核
  cancelProcessInstanceByStartUser: async (data) => {
    return await request.post({ url: '/fx/return-order/cancel-by-start-user', data: data })
  },

  //销售退货单发起流程
  startProcessInstanceByStartUser: async (id: number) => {
    return await request.get({ url: '/fx/return-order/submit-by-start-user?id=' + id })
  }
}
