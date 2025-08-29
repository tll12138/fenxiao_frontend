import request from '@/config/axios'

// 品牌授权 VO
export interface BrandAuthVO {
  id: number // id
  ip: string // ip
  uuid: string // 唯一标识
  clientDevice: string // 设备
  clientOs: string // 操作系统
  clientBrowser: string // 浏览器
  remark: string // 备注
  storeName: string // 店铺名称
  storeId: string // 公司名称/旺旺id
  storeUrl: string // 店铺链接
  email: string // 授权书接收邮箱
  applyDate: string // 申请日期
  applyDatetime: string // 申请时间
  isSee: string // 是否已阅授权书
  channel: number // 店铺渠道
  workflowid: number // 关联流程
  isOnline: string // 是否线上
  brand: string // 品牌
}

// 品牌授权 API
export const BrandAuthApi = {
  // 查询品牌授权分页
  getBrandAuthPage: async (params: any) => {
    return await request.get({ url: `/fx/brand-auth/page`, params })
  },

  // 查询品牌授权详情
  getBrandAuth: async (id: number) => {
    return await request.get({ url: `/fx/brand-auth/get?id=` + id })
  },

  // 新增品牌授权
  createBrandAuth: async (data: BrandAuthVO) => {
    return await request.post({ url: `/fx/brand-auth/create`, data })
  },

  // 修改品牌授权
  updateBrandAuth: async (data: BrandAuthVO) => {
    return await request.put({ url: `/fx/brand-auth/update`, data })
  },

  // 删除品牌授权
  deleteBrandAuth: async (id: number) => {
    return await request.delete({ url: `/fx/brand-auth/delete?id=` + id })
  },

  // 导出品牌授权 Excel
  exportBrandAuth: async (params) => {
    return await request.download({ url: `/fx/brand-auth/export-excel`, params })
  },
}