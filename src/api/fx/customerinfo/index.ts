import request from '@/config/axios'
import {CreateCustomerAddressVO, CustomerAddressVO} from "@/api/fx/customeraddress";

// 分销商基础信息 VO
export interface CustomerInfoVO {
  id: number // ID
  supplierId: number // 供应商编号
  distributorNum: number // 分销商编号
  distributorName: string // 分销商名称
  subCompany: string // 所属子公司
  displayName: string // 显示名称
  belongTo: string // 业务归属
  distributorLevel: number // 分销商等级
  isCooperate: number // 是否合作
  isFreeze: number // 是否可用
  customerChannelDistribute: string // 客户渠道属性
  brand: string // 品牌
  customerType: number // 客户类型
  latestOrderDate: Date // 最近下单时间
  isExcessOrder: number // 是否允许超额提货
  // customerAddressList: CreateCustomerAddressVO[] //客户地址
}
export interface CreateCustomerInfoVO {
  supplierId: number // 供应商编号
  distributorNum: number // 分销商编号
  distributorName: string // 分销商名称
  subCompany: string // 所属子公司
  displayName: string // 显示名称
  belongTo: string // 业务归属
  distributorLevel: number // 分销商等级
  isCooperate: number // 是否合作
  isFreeze: number // 是否可用
  customerChannelDistribute: string // 客户渠道属性
  brand: string // 品牌
  customerType: number // 客户类型
  customerAddressList: CreateCustomerAddressVO[] //客户地址
  latestOrderDate: Date // 最近下单时间
  isExcessOrder: number // 是否允许超额提货
}
export interface UpdateCustomerInfoVO{
  id: number, // 供应商编号
  supplierId: number // 供应商编号
  distributorNum: number // 分销商编号
  distributorName: string // 分销商名称
  subCompany: string // 所属子公司
  displayName: string // 显示名称
  belongTo: string // 业务归属
  distributorLevel: number // 分销商等级
  isCooperate: number // 是否合作
  isFreeze: number // 是否可用
  customerChannelDistribute: string // 客户渠道属性
  brand: string // 品牌
  customerType: number // 客户类型
  customerAddressList: CustomerAddressVO[] //客户地址
  latestOrderDate: Date // 最近下单时间
  isExcessOrder: number // 是否允许超额提货
}


// 分销商基础信息 API
export const CustomerInfoApi = {
  // 查询分销商基础信息分页
  getCustomerInfoPage: async (params: any) => {
    return await request.get({ url: `/fx/customer-info/page`, params })
  },
  // 查询分销商基础信息分页
  getCustomerInfoDetailPage: async (params: any) => {
    return await request.get({ url: `/fx/customer-info/page/detail`, params })
  },
  // 查询分销商基础信息分页
  getAllCustomerInfo: async (params: any) => {
    return await request.get({ url: `/fx/customer-info/getAll`, params })
  },

  // 查询分销商基础信息详情
  getCustomerInfo: async (id: number) => {
    return await request.get({ url: `/fx/customer-info/get?id=` + id })
  },

  // 新增分销商基础信息
  createCustomerInfo: async (data: CreateCustomerInfoVO) => {
    return await request.post({ url: `/fx/customer-info/create`, data })
  },

  // 修改分销商基础信息
  updateCustomerInfo: async (data: CreateCustomerInfoVO) => {
    return await request.put({ url: `/fx/customer-info/update`, data })
  },

  // 删除分销商基础信息
  deleteCustomerInfo: async (id: number) => {
    return await request.delete({ url: `/fx/customer-info/delete?id=` + id })
  },

  // 导出分销商基础信息 Excel
  exportCustomerInfo: async (params) => {
    return await request.download({ url: `/fx/customer-info/export-excel`, params })
  },

// ==================== 子表（分销商账号） ====================

  // 获得分销商账号列表
  getCustomerAccountListByDistributorId: async (distributorNum) => {
    return await request.get({ url: `/fx/customer-info/customer-account/list-by-distributor-id?distributorNum=` + distributorNum })
  },


}
