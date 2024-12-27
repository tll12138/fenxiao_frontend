// @ts-ignore
import request from '/src/config/axios'

// 分销商地址 VO
export interface CustomerAddressVO {
  id: number // ID
  distributorNum: number // 分销商编号
  manager: string // 联系人
  phone: string // 联系电话
  province: string // 省份
  city: string // 市
  district: string // 区
  address: string // 发货地址
}

export interface CreateCustomerAddressVO {
  manager: string // 联系人
  phone: string // 联系电话
  province: string // 省份
  address: string // 发货地址
  city: string // 市
  district: string // 区
}

// 分销商地址 API
export const CustomerAddressApi = {
  // 查询分销商地址分页
  getCustomerAddressPage: async (params: any) => {
    return await request.get({ url: `/fx/customer-address/page`, params })
  },

  // 查询分销商地址详情
  getCustomerAddress: async (id: number) => {
    return await request.get({ url: `/fx/customer-address/get?id=` + id })
  },

  // 新增分销商地址
  createCustomerAddress: async (data: CustomerAddressVO) => {
    return await request.post({ url: `/fx/customer-address/create`, data })
  },

  // 修改分销商地址
  updateCustomerAddress: async (data: CustomerAddressVO) => {
    return await request.put({ url: `/fx/customer-address/update`, data })
  },

  // 删除分销商地址
  deleteCustomerAddress: async (id: number) => {
    return await request.delete({ url: `/fx/customer-address/delete?id=` + id })
  },

  // 导出分销商地址 Excel
  exportCustomerAddress: async (params) => {
    return await request.download({ url: `/fx/customer-address/export-excel`, params })
  },
}
