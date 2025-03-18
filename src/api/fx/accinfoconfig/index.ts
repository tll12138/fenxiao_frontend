import request from '@/config/axios'

// 客商账户初始化配置 VO
export interface AccInfoConfigVO {
  id: number // 序号
  ywzt: string // 业务主体
  about: string // 说明
  brandid: string // 关联品牌
}

// 客商账户初始化配置 API
export const AccInfoConfigApi = {
  // 查询客商账户初始化配置分页
  getAccInfoConfigPage: async (params: any) => {
    return await request.get({ url: `/fx/acc-info-config/page`, params })
  },

  // 查询客商账户初始化配置详情
  getAccInfoConfig: async (id: number) => {
    return await request.get({ url: `/fx/acc-info-config/get?id=` + id })
  },

  // 新增客商账户初始化配置
  createAccInfoConfig: async (data: AccInfoConfigVO) => {
    return await request.post({ url: `/fx/acc-info-config/create`, data })
  },

  // 修改客商账户初始化配置
  updateAccInfoConfig: async (data: AccInfoConfigVO) => {
    return await request.put({ url: `/fx/acc-info-config/update`, data })
  },

  // 删除客商账户初始化配置
  deleteAccInfoConfig: async (id: number) => {
    return await request.delete({ url: `/fx/acc-info-config/delete?id=` + id })
  },

  // 导出客商账户初始化配置 Excel
  exportAccInfoConfig: async (params) => {
    return await request.download({ url: `/fx/acc-info-config/export-excel`, params })
  },
}