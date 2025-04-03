import request from '@/config/axios'

// 手动发货信息 VO
export interface ManualDeliveryVO {
  id: number // 序号
  expressCompany: string // 快递公司
  expressName: string // 快递公司名称
  expressId: string // 快递公司编号
  express: string // 快递单号
  soId: string // 销售单号
  saleId: string // 关联销售单
  status: number // 单据状态
  reason: string // 手动发货原因
}

// 手动发货信息 API
export const ManualDeliveryApi = {
  // 查询手动发货信息分页
  getManualDeliveryPage: async (params: any) => {
    return await request.get({ url: `/fx/manual-delivery/page`, params })
  },

  // 查询手动发货信息详情
  getManualDelivery: async (id: number) => {
    return await request.get({ url: `/fx/manual-delivery/get?id=` + id })
  },

  // 新增手动发货信息
  createManualDelivery: async (data: ManualDeliveryVO) => {
    return await request.post({ url: `/fx/manual-delivery/create`, data })
  },

  // 修改手动发货信息
  updateManualDelivery: async (data: ManualDeliveryVO) => {
    return await request.put({ url: `/fx/manual-delivery/update`, data })
  },

  // 修改手动发货信息
  handleManualDelivery: async (id: number) => {
    return await request.put({ url: `/fx/manual-delivery/handle_shipment?id=` + id })
  },

  // 删除手动发货信息
  deleteManualDelivery: async (id: number) => {
    return await request.delete({ url: `/fx/manual-delivery/delete?id=` + id })
  },

  // 导出手动发货信息 Excel
  exportManualDelivery: async (params) => {
    return await request.download({ url: `/fx/manual-delivery/export-excel`, params })
  },
}
