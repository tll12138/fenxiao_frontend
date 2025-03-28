import request from '@/config/axios'

// 商品箱规 VO
export interface SkBoxsizeVO {
  id: number // 序号
  skuId: string // 商品编码
  skuName: string // 商品名称
  boxSize: number // 箱规
}

// 商品箱规 API
export const SkBoxsizeApi = {
  // 查询商品箱规分页
  getSkBoxsizePage: async (params: any) => {
    return await request.get({ url: `/fx/sk-boxsize/page`, params })
  },

  // 查询商品箱规详情
  getSkBoxsize: async (id: number) => {
    return await request.get({ url: `/fx/sk-boxsize/get?id=` + id })
  },

  // 新增商品箱规
  createSkBoxsize: async (data: SkBoxsizeVO) => {
    return await request.post({ url: `/fx/sk-boxsize/create`, data })
  },

  // 修改商品箱规
  updateSkBoxsize: async (data: SkBoxsizeVO) => {
    return await request.put({ url: `/fx/sk-boxsize/update`, data })
  },

  // 删除商品箱规
  deleteSkBoxsize: async (id: number) => {
    return await request.delete({ url: `/fx/sk-boxsize/delete?id=` + id })
  },

  // 导出商品箱规 Excel
  exportSkBoxsize: async (params) => {
    return await request.download({ url: `/fx/sk-boxsize/export-excel`, params })
  },
}