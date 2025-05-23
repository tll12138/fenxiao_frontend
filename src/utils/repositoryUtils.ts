import { SendRepositoryApi } from '@/api/fx/sendrepository'

// 获取发货仓库列表（带缓存）
let warehouseCache: Array<{ label: string; value: string }> = []
export async function getWarehouseOptions() {
  if (warehouseCache.length) return warehouseCache

  try {
    const res = await SendRepositoryApi.getSendRepositoryPage({
      pageNo: 1,
      pageSize: 100
    })

    warehouseCache = res.list.map(item => ({
      label: item.name,
      value: item.code,
      id: item.id
    }))

    return warehouseCache
  } catch (e) {
    console.error('获取仓库列表失败:', e)
    return []
  }
}

// 清空缓存（当需要刷新数据时调用）
export function clearWarehouseCache() {
  warehouseCache = []
}
