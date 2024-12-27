//@ts-ignore
import request from '@/config/axios'

// FX 发货仓库 VO
export interface SendRepositoryVO {
  id: number // 主键ID
  name: string // 仓库名称
  type: number // 仓库类型
  allName: string // 仓库全称
  is2Erp: number // 是否传erp
}

// FX 发货仓库 API
export const SendRepositoryApi = {
  // 查询FX 发货仓库分页
  getSendRepositoryPage: async (params: any) => {
    return await request.get({ url: `/fx/send-repository/page`, params })
  },

  // 查询FX 发货仓库详情
  getSendRepository: async (id: number) => {
    return await request.get({ url: `/fx/send-repository/get?id=` + id })
  },

  // 新增FX 发货仓库
  createSendRepository: async (data: SendRepositoryVO) => {
    return await request.post({ url: `/fx/send-repository/create`, data })
  },

  // 修改FX 发货仓库
  updateSendRepository: async (data: SendRepositoryVO) => {
    return await request.put({ url: `/fx/send-repository/update`, data })
  },

  // 删除FX 发货仓库
  deleteSendRepository: async (id: number) => {
    return await request.delete({ url: `/fx/send-repository/delete?id=` + id })
  },

  // 导出FX 发货仓库 Excel
  exportSendRepository: async (params) => {
    return await request.download({ url: `/fx/send-repository/export-excel`, params })
  },
}
