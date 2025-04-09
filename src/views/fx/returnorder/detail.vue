<template >
  <div class="flex justify-center width: 100%">
    <div class="order-detail">
    <header class="page-header">
      <h2>退货单详情</h2>
      <!-- <p>PQ Return Order Detail</p> -->
    </header>

    <main class="content-wrapper">
      <!-- 基础信息部分 -->
      <section class="info-section">
        <div class="section-header">
          <span class="icon">📋</span>
          <h2>基础信息</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">单据编号</span>
            <span class="info-value">{{ formData.orderId }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">单据日期</span>
            <span class="info-value">{{ formData.orderDate?.join('-') }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">退货类型</span>
            <span class="info-value">
              <dict-span-tag :type="DICT_TYPE.FX_RETURN_TYPE" :value="formData.returnType" />
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">原销售单</span>
            <span class="info-value">{{ formData.originOrder }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">退货方</span>
            <span class="info-value">{{ formData.returnUserName }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">退货经销商</span>
            <span class="info-value">
              <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="formData.returnDealer" />
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">收货仓库</span>
            <span class="info-value">{{ formData.warehouse }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">仓库功能</span>
            <span class="info-value">
              <dict-tag :type="DICT_TYPE.FX_WAREHOUSE_FEATURE" :value="formData.warehouseFeature" />
            </span>
          </div>
          <div class="info-item">
            <span class="info-label">收货经销商</span>
            <span class="info-value">
              <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_ENTITY" :value="formData.receiveDealer" />
            </span>
          </div>
<!--          <div class="info-item">-->
<!--            <span class="info-label">收货方</span>-->
<!--            <span class="info-value">{{ formData.distributorName }}</span>-->
<!--          </div>-->
          <div class="info-item">
            <span class="info-label">物流单号</span>
            <span class="info-value">{{ formData.logisticsNumber }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">备注内容</span>
            <span class="info-value">{{ formData.remark }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">退货业务类型</span>
            <span class="info-value">
              <dict-span-tag :type="DICT_TYPE.FX_BUSINESS_TYPE" :value="formData.returnBusinessType" />
            </span>
          </div>
        </div>
      </section>

      <!-- 商品信息部分 -->
      <section class="info-section">
        <div class="section-header">
          <span class="icon">📦</span>
          <h2>商品信息</h2>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>商品编号</th>
                <th>商品名称</th>
                <th>规格</th>
                <th>原销售价</th>
                <th>退货价</th>
                <th>退货数量</th>
                <th>退货金额</th>
                <th>原单数量</th>
                <th>退货类型</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in formData.ordersDetails" :key="item.skuId">
                <td>{{ item.skuId }}</td>
                <td>{{ item.skuName }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.originalPrice }}</td>
                <td>{{ item.returnPrice }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.saleAmt }}</td>
                <td>{{ item.originalCount }}</td>
                <td>
                  <dict-tag :type="DICT_TYPE.FX_DETAIL_RETURN_TYPE" :value="item.retType" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 汇总信息部分 -->
      <section class="info-section">
        <div class="section-header">
          <span class="icon">📊</span>
          <h2>汇总信息</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">原单数量</span>
            <span class="info-value">{{ formData.originQuantity }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">总退货金额</span>
            <span class="info-value">{{ formData.totalReturnAmount }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">总退货数量</span>
            <span class="info-value">{{ formData.totalReturnQuantity }}</span>
          </div>
        </div>
      </section>
    </main>
    <button class="floating-print-button" @click="printPage">
      <el-icon><Printer /></el-icon>
    </button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { propTypes } from '@/utils/propTypes'
import { ReturnOrderApi, ReturnOrderVO } from '@/api/fx/returnorder'
import {Printer} from '@element-plus/icons-vue'

const { query } = useRoute()
const props = defineProps({
  id: propTypes.number.def(undefined)
})
const queryId = query.id as unknown as number
const loading = ref(false)
const formData = reactive({} as ReturnOrderVO)

defineOptions({ name: 'ReturnOrderViewDetail' })

onMounted(() => {
  getDetail()
})

const getDetail = async () => {
  loading.value = false
  try {
    const res = await ReturnOrderApi.getReturnOrder(props.id || queryId)
    Object.assign(formData, res)
  } finally {
    loading.value = false
  }
}

const printPage = () => {
  const orderDetailElement = document.querySelector('.order-detail')
  if (!orderDetailElement) {
    console.warn('未找到打印内容')
    return
  }
  const content = orderDetailElement.innerHTML

  // 获取所有外部样式表
  const styleSheets = Array.from(document.styleSheets || [])
  let styles = ''

  // 收集所有样式
  styleSheets.forEach(styleSheet => {
    if (!styleSheet) return
    
    try {
      if (styleSheet.href) {
        styles += `<link rel="stylesheet" href="${styleSheet.href}">`
      } else if (styleSheet.cssRules) {
        const cssRules = Array.from(styleSheet.cssRules || [])
        const cssText = cssRules
          .filter(rule => rule)
          .map(rule => rule.cssText)
          .join('\n')
        if (cssText) {
          styles += `<style>${cssText}</style>`
        }
      }
    } catch (e) {
      // 跨域样式表可能会报错，直接使用link标签
      if (styleSheet.href) {
        styles += `<link rel="stylesheet" href="${styleSheet.href}">`
      }
    }
  })

  const printWindow = window.open('', '_blank')
  if (!printWindow) {
    console.warn('无法打开打印窗口，请检查是否被浏览器拦截')
    return
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>打印订单详情</title>
        ${styles}
        <style>
          body {
            padding: 20px;
          }
          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="order-detail">${content}</div>
      </body>
    </html>
  `)
  printWindow.document.close()

  // 等待样式加载完成后再打印
  setTimeout(() => {
    if (printWindow) {
      printWindow.focus()
      printWindow.print()
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          // 关闭打印窗口后，关闭此页面
          printWindow.close()
        }
      }, 800)
    }
  }, 500)
}

defineExpose({ open: getDetail })
</script>

<style lang="scss" scoped>
.order-detail {
  width: 66%;
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.info-section {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e2e8f0;
    
    .icon {
      font-size: 1.5rem;
      margin-right: 0.75rem;
    }
    
    h2 {
      font-size: 1.25rem;
      color: #2d3748;
      margin: 0;
      font-weight: 600;
    }
  }
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    background: #edf2f7;
  }
  
  .info-label {
    min-width: 100px;
    color: #4a5568;
    font-weight: 500;
  }
  
  .info-value {
    color: #2d3748;
    flex: 1;
    word-break: break-word;
  }
}

.table-wrapper {
  overflow-x: auto;
  margin: 1rem -1.5rem;
  padding: 0 1.5rem;
  
  @media print {
    margin: 0;
    padding: 0;
  }
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background: #f8fafc;
    color: #4a5568;
    font-weight: 600;
  }
  
  tr:hover td {
    background: #f8fafc;
  }
}

// 响应式调整
@media (max-width: 768px) {

  .order-detail {
    width: 80%;
  }
  .info-section {
    padding: 1rem;
  }
  
  .data-table {
    font-size: 0.875rem;
    
    th, td {
      padding: 0.5rem;
    }
  }
}

@media (max-width: 480px) {

  .order-detail {
    width: 100%;
  }
  .info-item {
    flex-direction: column;
    
    .info-label {
      margin-bottom: 0.25rem;
    }
  }
}

// 打印样式优化
@media print {
  .order-detail {
    background: white;
    padding: 0;
    margin: 0;
  }
  .floating-print-button{
    display: none;
  }

  .info-section {
    box-shadow: none;
    padding: 10px 0;
    margin-bottom: 15px;
    page-break-inside: avoid;
    
    .section-header {
      margin-bottom: 10px;
      padding-bottom: 5px;
      
      h2 {
        font-size: 14px;
      }
    }
  }

  .info-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }

  .info-item {
    padding: 5px;
    background: none;
    page-break-inside: avoid;
    
    &:hover {
      background: none;
    }
    
    .info-label {
      font-size: 12px;
    }
    
    .info-value {
      font-size: 12px;
    }
  }

  .data-table {
    font-size: 12px;
    
    th, td {
      padding: 5px;
    }
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }

  @page {
    margin: 1cm;
    size: auto;
  }
}

.floating-print-button {
  position: fixed;
  bottom: 100px;
  right: 100px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #409EFF;
  color: white;
  border: none;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 8px rgba(0,0,0,0.2);
    background-color: #66b1ff;
  }

  i {
    font-size: 24px;
  }
}
</style>
