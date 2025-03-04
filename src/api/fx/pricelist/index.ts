import request from '@/config/axios'

// 分销价格对照 VO
export interface PricelistVO {
  id: number // 序号
  customer: string // 客户
  skuId: string // 产品编码
  category: string // 规格
  saleprice: number // 销售最低价
  cLevel: number // 客户等级
  name: string // 产品名称
  isNormal: string // 是否基础类型
  brand: string // 品牌
  createrTime: Date // 创建时间
}

// 分销价格对照 API
export const PricelistApi = {
  // 查询分销价格对照分页
  getPricelistPage: async (params: any) => {
    return await request.get({ url: `/fx/pricelist/page`, params })
  },

  // 查询分销价格对照详情
  getPricelist: async (id: number) => {
    return await request.get({ url: `/fx/pricelist/get?id=` + id })
  },

  // 新增分销价格对照
  createPricelist: async (data: PricelistVO) => {
    return await request.post({ url: `/fx/pricelist/create`, data })
  },

  // 修改分销价格对照
  updatePricelist: async (data: PricelistVO) => {
    return await request.put({ url: `/fx/pricelist/update`, data })
  },

  // 删除分销价格对照
  deletePricelist: async (id: number) => {
    return await request.delete({ url: `/fx/pricelist/delete?id=` + id })
  },

  // 导出分销价格对照 Excel
  exportPricelist: async (params) => {
    return await request.download({ url: `/fx/pricelist/export-excel`, params })
  },
}