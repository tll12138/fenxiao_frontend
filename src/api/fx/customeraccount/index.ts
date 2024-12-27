import request from '@/config/axios'
import {UpdateCustomerInfoVO} from "@/api/fx/customerinfo";

export interface CustomerAccountVO {
    id: number
    distributorNum: number
    company: string
    balance: number
    accountId: string
    detainAmount: number
    isActive: number
    deposit: number
}

// 查询分销商账号列表
export const getCustomerAccountPage = async (params) => {
  return await request.get({ url: '/fx/customer-account/page', params })
}

// 查询分销商账号详情
export const getCustomerAccount = async (id: number) => {
  return await request.get({ url: '/fx/customer-account/get?id=' + id })
}

// 新增分销商账号
export const createCustomerAccount = async (data: CustomerAccountVO) => {
  return await request.post({ url: '/fx/customer-account/create', data })
}

// 修改分销商账号
export const updateCustomerAccount = async (data: UpdateCustomerInfoVO) => {
  return await request.put({ url: '/fx/customer-account/update', data })
}

// 删除分销商账号
export const deleteCustomerAccount = async (id: number) => {
  return await request.delete({ url: '/fx/customer-account/delete?id=' + id })
}

// 导出分销商账号 Excel
export const exportCustomerAccountApi = async (params) => {
  return await request.download({ url: '/fx/customer-account/export-excel', params })
}
