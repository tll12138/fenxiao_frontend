import request from '@/config/axios'

// 商品成本 VO
export interface SkuCostpriceVO {
  id: number // 序号
  brand: string // 品牌
  skuId: string // 商品编码
  name: string // 名称
  value: string // 规格
  type: number // 品类
  paid: number // 属性
  costPrice: number // 财务结算价
  costOtherprice: number // 采购成本
  outCost: number // 出库成本
}

// 商品成本 API
export const SkuCostpriceApi = {
  // 查询商品成本分页
  getSkuCostpricePage: async (params: any) => {
    return await request.get({ url: `/fx/sku-costprice/page`, params })
  },

  // 查询商品成本详情
  getSkuCostprice: async (id: number) => {
    return await request.get({ url: `/fx/sku-costprice/get?id=` + id })
  },

  // 新增商品成本
  createSkuCostprice: async (data: SkuCostpriceVO) => {
    return await request.post({ url: `/fx/sku-costprice/create`, data })
  },

  // 修改商品成本
  updateSkuCostprice: async (data: SkuCostpriceVO) => {
    return await request.put({ url: `/fx/sku-costprice/update`, data })
  },

  // 删除商品成本
  deleteSkuCostprice: async (id: number) => {
    return await request.delete({ url: `/fx/sku-costprice/delete?id=` + id })
  },

  // 导出商品成本 Excel
  exportSkuCostprice: async (params) => {
    return await request.download({ url: `/fx/sku-costprice/export-excel`, params })
  },
}