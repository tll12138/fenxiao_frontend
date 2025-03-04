import request from '@/config/axios'

// 分销商品资料 VO
export interface GoodsArchivesVO {
  id: number // 序号
  skuId: string // 商品编码
  name: string // 商品名称
  shortName: string // 商品简称
  salePrice: number // 标准价
  costPrice: number // 成本价
  propertiesValue: string // 规格
  category: string // 分类
  vcName: string // 虚拟分类
  itemType: string // 商品属性
  unit: string // 单位
  skuType: string // 商品类型
  modified: Date // 修改时间
  billingName: string // 开票名称
  brand: string // 品牌
  picBig: string // 商品图片
  iId: string // 款式编码
  marketPrice: number // 市场价
  enabled: string // 是否启用
  isFx: string // 是否分销商品
  actualCostPrice: number // 实际成本价
  saleCostPrice: number // 销售成本价
  level1Category: string // 一级分类
  level2Category: string // 二级分类
  isCount: string // 是否参与计算
  isFormal: string // 是否正装
  weight: number // 净重(kg)
  scancode: string // 国标码
  isGroup: string // 是否组合商品
  autoId: number // 聚水潭唯一id
}

// 分销商品资料 API
export const GoodsArchivesApi = {
  // 查询分销商品资料分页
  getGoodsArchivesPage: async (params: any) => {
    return await request.get({ url: `/fx/goods-archives/page`, params })
  },

  // 查询分销商品资料详情
  getGoodsArchives: async (id: number) => {
    return await request.get({ url: `/fx/goods-archives/get?id=` + id })
  },

  // 新增分销商品资料
  createGoodsArchives: async (data: GoodsArchivesVO) => {
    return await request.post({ url: `/fx/goods-archives/create`, data })
  },

  // 修改分销商品资料
  updateGoodsArchives: async (data: GoodsArchivesVO) => {
    return await request.put({ url: `/fx/goods-archives/update`, data })
  },

  // 删除分销商品资料
  deleteGoodsArchives: async (id: number) => {
    return await request.delete({ url: `/fx/goods-archives/delete?id=` + id })
  },

  // 导出分销商品资料 Excel
  exportGoodsArchives: async (params) => {
    return await request.download({ url: `/fx/goods-archives/export-excel`, params })
  },
}