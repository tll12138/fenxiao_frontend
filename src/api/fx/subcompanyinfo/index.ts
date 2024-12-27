//@ts-ignore
import request from '@/config/axios'

// 子公司信息 VO
export interface SubCompanyInfoVO {
  companyName: string // 公司名称
  identifyId: string // 识别人编号
  bank: string // 开户行
  region: string // 地区
}

// 子公司信息 API
// 子公司信息 API
export const SubCompanyInfoApi = {
  // 查询子公司信息分页
  getSubCompanyInfoPage: async (params: any) => {
    return await request.get({ url: `/fx/sub-company-info/page`, params })
  },
  // 查询子公司信息列表
  getSubCompanyInfoList: async () => {
    return await request.get({ url: `/fx/sub-company-info/list`})
  },

  // 查询子公司信息详情
  getSubCompanyInfo: async (id: number) => {
    return await request.get({ url: `/fx/sub-company-info/get?id=` + id })
  },

  // 新增子公司信息
  createSubCompanyInfo: async (data: SubCompanyInfoVO) => {
    return await request.post({ url: `/fx/sub-company-info/create`, data })
  },

  // 修改子公司信息
  updateSubCompanyInfo: async (data: SubCompanyInfoVO) => {
    return await request.put({ url: `/fx/sub-company-info/update`, data })
  },

  // 删除子公司信息
  deleteSubCompanyInfo: async (id: number) => {
    return await request.delete({ url: `/fx/sub-company-info/delete?id=` + id })
  },

  // 导出子公司信息 Excel
  exportSubCompanyInfo: async (params) => {
    return await request.download({ url: `/fx/sub-company-info/export-excel`, params })
  },
}
