//@ts-ignore
import request from '@/config/axios'

// 销售单 VO
export interface OrdersInfoVO {
  id?: number // id
  warehouse?: string // 发货仓库
  warehouseCode?: string
  specifySendDate?: Date // 指定发货日期
  erpOrderNumber?: string // erp单号
  isToErp?: number // 是否传erp
  addressId?: undefined,
  province?: string // 省份
  city?: string // 市
  district?: string // 区
  sendQuantity?: number // 发货数量
  manager?: string // 收货人
  phone?: string // 联系电话
  address?: string // 收货地址
  orderId?: string // 单据编号
  orderDate?: Date // 单据日期
  orderStatus?: number // 订单状态
  sendType?: number // 发货类型
  salesType?: number // 销售类型
  supplierId?: number // 销售商
  remark?: string // 备注
  logisticsCompany?: string // 物流公司
  logisticsNumber?: string // 物流单号
  salesAmount?: number // 销售金额
  bigCustomerAddress?: string // 大客户地址
  customerLevel?: number // 客户等级
  customerType?: number, //分销商类型
  totalGoods?: string // 商品合计
  totalWeight?: number // 总重量
  requirement?: string // 发货要求
  brand?: string // 品牌
  externalOrderNumber?: string // 外部单号
  channel?: number // 渠道
  orderType?: number // 订单类型
  isTraceless?: number // 是否无痕发货
  commitDate?: Date // 提交日期
  isDf?: number // 是否代发
  cusDfType?: number // 客商代发属性
  receiveSupplierId?: number // 收款经销商
  distributorId?: number // 收货方
  businessBelong?: number // 业务归属
  creatorId?: number // 业务员id
}

// 销售单 API
export const OrdersInfoApi = {
  // 查询销售单分页
  getOrdersInfoPage: async (params: any) => {
    return await request.get({ url: `/fx/orders-info/page`, params })
  },
  // 根据销售单id查询销售单
  getOrdersInfoByIds: async (ids: number[]) => {
    return await request.get({ url: `/fx/orders-info/getByIds?ids=`+ids })
  },

  // 查询销售单详情
  getOrdersInfo: async (id: number) => {
    return await request.get({ url: `/fx/orders-info/get?id=` + id })
  },

  // 查询销售单详情
  getOrdersInfoByOrderId: async (orderId: string) => {
    return await request.get({ url: `/fx/orders-info/getByOrderId?orderId=` + orderId })
  },

  // 新增销售单
  createOrdersInfo: async (data: OrdersInfoVO) => {
    return await request.post({ url: `/fx/orders-info/create`, data })
  },

  // 保存销售单
  saveOrdersInfo: async (data: OrdersInfoVO) => {
    return await request.post({ url: `/fx/orders-info/save`, data })
  },

  // 修改销售单
  updateOrdersInfo: async (data: OrdersInfoVO) => {
    return await request.put({ url: `/fx/orders-info/update`, data })
  },

  // 删除销售单
  deleteOrdersInfo: async (id: number) => {
    return await request.delete({ url: `/fx/orders-info/delete?id=` + id })
  },

  // 导出销售单 Excel
  exportOrdersInfo: async (params) => {
    return await request.download({ url: `/fx/orders-info/export-excel`, params })
  },

  // 查询待退货销售单
  getReturnOrdersInfoPage: async (params: any) => {
    return await request.get({ url: `/fx/orders-info/return_page`, params })
  },

// ==================== 子表（分销-销售订单明细） ====================

  // 获得分销-销售订单明细列表
  getOrdersDetailListByOrderId: async (orderId) => {
    return await request.get({ url: `/fx/orders-info/orders-detail/list-by-order-id?orderId=` + orderId })
  },


  cancelProcessInstanceByStartUser: async (data) => {
    return await request.post({ url: '/fx/orders-info/cancel-by-start-user', data: data })
  },

  startProcessInstanceByStartUser: async (id: number) => {
    return await request.get({ url: '/fx/orders-info/start-by-start-user?id='+ id })
  }
}
