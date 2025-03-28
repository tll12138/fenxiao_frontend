import request from '@/config/axios'

// 分销发货要求消息 VO
export interface SentMessageVO {
  id: number // 序号
  type: string // 类型
  soId: string // 单据编号
  msg: string // 消息内容
  sendTime: Date // 计划发送时间
  warehouseId: number // 仓库
  isSend: number // 是否发送
}

// 分销发货要求消息 API
export const SentMessageApi = {
  // 查询分销发货要求消息分页
  getSentMessagePage: async (params: any) => {
    return await request.get({ url: `/fx/sent-message/page`, params })
  },

  // 查询分销发货要求消息详情
  getSentMessage: async (id: number) => {
    return await request.get({ url: `/fx/sent-message/get?id=` + id })
  },

  // 新增分销发货要求消息
  createSentMessage: async (data: SentMessageVO) => {
    return await request.post({ url: `/fx/sent-message/create`, data })
  },

  // 修改分销发货要求消息
  updateSentMessage: async (data: SentMessageVO) => {
    return await request.put({ url: `/fx/sent-message/update`, data })
  },

  // 发送消息提醒
  pushSentMessage: async (id: number) => {
    return await request.get({ url: `/fx/sent-message/push?id=` + id })
  },

  // 导出分销发货要求消息 Excel
  exportSentMessage: async (params) => {
    return await request.download({ url: `/fx/sent-message/export-excel`, params })
  },
}
