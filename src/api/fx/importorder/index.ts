import request from '@/config/axios'

// 客商代发单 VO
export interface ImportOrderVO {
  id: number // 主键
  productQuantity: number // 商品数量
  province: string // 省份
  city: string // 城市
  soId: string // 订单编号
  skuId: string // 商品编码
  district: string // 区县
  address: string // 详细地址
  contact: string // 收货人
  mobile: string // 收货电话
  isShipped: number // 是否发货
  isSalesOrderGenerated: number // 是否生成销售单
  customerid: undefined,
  customername: undefined,
  warehouseid: undefined,
  warehousename: undefined,
  saleno: string // 销售单号
  expressCompany: string // 快递公司
  trackingNumber: string // 快递单号
  remark: string // 备注
  businessAffiliation: number // 业务归属
  price: number // 单价
  isTraceless: number // 无痕发货
  payingDistributorId: number // 收款经销商
  expressCompanyId: number // 快递公司ID
}

// 客商代发单 API
export const ImportOrderApi = {
  // 查询客商代发单分页
  getImportOrderPage: async (params: any) => {
    return await request.get({ url: `/fx/import-order/page`, params })
  },

  // 查询客商代发单详情
  getImportOrder: async (id: number) => {
    return await request.get({ url: `/fx/import-order/get?id=` + id })
  },

  // 新增客商代发单
  createImportOrder: async (data: ImportOrderVO) => {
    return await request.post({ url: `/fx/import-order/create`, data })
  },

  // 修改客商代发单
  updateImportOrder: async (data: ImportOrderVO) => {
    return await request.put({ url: `/fx/import-order/update`, data })
  },

  // 删除客商代发单
  deleteImportOrder: async (id: number) => {
    return await request.delete({ url: `/fx/import-order/delete?id=` + id })
  },

  // 导出客商代发单 Excel
  exportImportOrder: async (params) => {
    return await request.download({ url: `/fx/import-order/export-excel`, params })
  },

  // 客商代发单生成销售单
  generateSalesOrder: async (params) => {
    return await request.post({ url: `/fx/import-order/generate_sales`, params })
  },

  // 下载客商代发导入模板
  importImportOrderTemplate : async () => {
    return request.download({ url: '/fx/import-order/get-import-template' })
  }

}
