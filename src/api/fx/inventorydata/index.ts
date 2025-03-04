import request from '@/config/axios'

// 分销商品库存 VO
export interface InventoryDataVO {
  id: number // 序号
  skuId: string // 商品编码
  scanCode: string // 条形码
  goodId: string // 商品资料id
  qty: number // 良品库存
  defectiveQty: number // 次品库存
  warehouseName: string // 仓库名称
  type: number // 仓库类型
  warehouseId: string // 所属仓库
  warehouseCode: string // 仓库编码
  saleQty: number // 销售出库数
  channel: string // 数据渠道
  brand: string // 商品品牌
  value: string // 规格
  name: string // 商品名称
}

// 分销商品库存 API
export const InventoryDataApi = {
  // 查询分销商品库存分页
  getInventoryDataPage: async (params: any) => {
    return await request.get({ url: `/fx/inventory-data/page`, params })
  },

  // 查询分销商品库存详情
  getInventoryData: async (id: number) => {
    return await request.get({ url: `/fx/inventory-data/get?id=` + id })
  },

  // 新增分销商品库存
  createInventoryData: async (data: InventoryDataVO) => {
    return await request.post({ url: `/fx/inventory-data/create`, data })
  },

  // 修改分销商品库存
  updateInventoryData: async (data: InventoryDataVO) => {
    return await request.put({ url: `/fx/inventory-data/update`, data })
  },

  // 删除分销商品库存
  deleteInventoryData: async (id: number) => {
    return await request.delete({ url: `/fx/inventory-data/delete?id=` + id })
  },

  // 导出分销商品库存 Excel
  exportInventoryData: async (params) => {
    return await request.download({ url: `/fx/inventory-data/export-excel`, params })
  },
}