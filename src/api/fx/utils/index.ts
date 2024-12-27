//@ts-ignore
import request from '@/config/axios'

// 子公司信息 VO
export interface SubCompanyInfoVO {
  companyName: string // 公司名称
  identifyId: string // 识别人编号
  bank: string // 开户行
  region: string // 地区
}

export const UtilsApi = {
  // 地址解析工具接口
  AnalyzeAddress: async (text: string) => {
    return await request.get({ url: `/fx/utils/analyze_address?text=`+ text})
  },
}
