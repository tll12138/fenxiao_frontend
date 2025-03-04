import request from '@/config/axios'
// 创建分销订单上传中间
export function createEc2jstOrder(data) {
  return request({
    url: '/fx/ec2jst-order/create',
    method: 'post',
    data: data
  })
}

// 更新分销订单上传中间
export function updateEc2jstOrder(data) {
  return request({
    url: '/fx/ec2jst-order/update',
    method: 'put',
    data: data
  })
}

// 删除分销订单上传中间
export function deleteEc2jstOrder(id) {
  return request({
    url: '/fx/ec2jst-order/delete?id=' + id,
    method: 'delete'
  })
}

// 获得分销订单上传中间
export function getEc2jstOrder(id) {
  return request({
    url: '/fx/ec2jst-order/get?id=' + id,
    method: 'get'
  })
}

// 获得分销订单上传中间分页
export function getEc2jstOrderPage(params) {
  return request({
    url: '/fx/ec2jst-order/page',
    method: 'get',
    params
  })
}
// 导出分销订单上传中间 Excel
export function exportEc2jstOrderExcel(params) {
  return request({
    url: '/fx/ec2jst-order/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

