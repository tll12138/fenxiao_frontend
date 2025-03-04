<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="店铺编码" prop="shopId">
        <el-input v-model="queryParams.shopId" placeholder="请输入店铺编码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="下单时间" prop="orderDate">
        <el-date-picker v-model="queryParams.orderDate" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="店铺状态" prop="shopStatus">
        <el-select v-model="queryParams.shopStatus" placeholder="请选择店铺状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="买家账号" prop="shopBuyerId">
        <el-input v-model="queryParams.shopBuyerId" placeholder="请输入买家账号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="省" prop="receiverState">
        <el-input v-model="queryParams.receiverState" placeholder="请输入省" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="市" prop="receiverCity">
        <el-input v-model="queryParams.receiverCity" placeholder="请输入市" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="区" prop="receiverDistrict">
        <el-input v-model="queryParams.receiverDistrict" placeholder="请输入区" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="地址" prop="receiverAddress">
        <el-input v-model="queryParams.receiverAddress" placeholder="请输入地址" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="收件人" prop="receiverName">
        <el-input v-model="queryParams.receiverName" placeholder="请输入收件人" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="receiverPhone">
        <el-input v-model="queryParams.receiverPhone" placeholder="请输入联系电话" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="手机" prop="receiverMobile">
        <el-input v-model="queryParams.receiverMobile" placeholder="请输入手机" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="应付金额" prop="payAmount">
        <el-input v-model="queryParams.payAmount" placeholder="请输入应付金额" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="运费" prop="freight">
        <el-input v-model="queryParams.freight" placeholder="请输入运费" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="卖家备注" prop="remark">
        <el-input v-model="queryParams.remark" placeholder="请输入卖家备注" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="是否货到付款" prop="isCod">
        <el-input v-model="queryParams.isCod" placeholder="请输入是否货到付款" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="修改日期" prop="shopModified">
        <el-date-picker clearable v-model="queryParams.shopModified" type="date" value-format="yyyy-MM-dd" placeholder="选择修改日期" />
      </el-form-item>
      <el-form-item label="快递单号" prop="lId">
        <el-input v-model="queryParams.lId" placeholder="请输入快递单号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递公司名称" prop="logisticsCompany">
        <el-input v-model="queryParams.logisticsCompany" placeholder="请输入快递公司名称" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="订单异常描述" prop="questionDesc">
        <el-input v-model="queryParams.questionDesc" placeholder="请输入订单异常描述" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="卖家标签（旗帜）" prop="sellerFlag">
        <el-input v-model="queryParams.sellerFlag" placeholder="请输入卖家标签（旗帜）" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递公司编码" prop="lcId">
        <el-input v-model="queryParams.lcId" placeholder="请输入快递公司编码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="传ERP时间" prop="toErpTime">
        <el-date-picker v-model="queryParams.toErpTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="传输标记" prop="erpStatus">
        <el-select v-model="queryParams.erpStatus" placeholder="请选择传输标记" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="queryParams.orderNo" placeholder="请输入订单号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="聚水潭内部单号" prop="oId">
        <el-input v-model="queryParams.oId" placeholder="请输入聚水潭内部单号" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="订单状态 2取消 3取消成功 4取消失败" prop="orderStatus">
        <el-select v-model="queryParams.orderStatus" placeholder="请选择订单状态 2取消 3取消成功 4取消失败" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="仓库中文名称（作为聚水潭标签传值）" prop="warehouse">
        <el-input v-model="queryParams.warehouse" placeholder="请输入仓库中文名称（作为聚水潭标签传值）" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="SALE销售单,MARKET营销寄样,ZP_ADJUST内部仓正品调整,CP_ADJUST内部仓次品调整" prop="soFrom">
        <el-input v-model="queryParams.soFrom" placeholder="请输入SALE销售单,MARKET营销寄样,ZP_ADJUST内部仓正品调整,CP_ADJUST内部仓次品调整" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="错误信息" prop="errorMsg">
        <el-input v-model="queryParams.errorMsg" placeholder="请输入错误信息" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="调入仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" prop="linkWarehouse">
        <el-input v-model="queryParams.linkWarehouse" placeholder="请输入调入仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="调出仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" prop="warehouseId">
        <el-input v-model="queryParams.warehouseId" placeholder="请输入调出仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="内部调拨单号ID" prop="allocateInId">
        <el-input v-model="queryParams.allocateInId" placeholder="请输入内部调拨单号ID" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="是否出库 1已出库，0没有，2出库失败" prop="isOut">
        <el-input v-model="queryParams.isOut" placeholder="请输入是否出库 1已出库，0没有，2出库失败" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="失败重试次数" prop="errorNum">
        <el-input v-model="queryParams.errorNum" placeholder="请输入失败重试次数" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openForm(undefined)"
                   v-hasPermi="['fx:ec2jst-order:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['fx:ec2jst-order:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
            <el-table-column label="序号" align="center" prop="id">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.id" />
        </template>
      </el-table-column>
      <el-table-column label="店铺编码" align="center" prop="shopId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.shopId" />
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center" prop="orderDate">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.orderDate" />
        </template>
      </el-table-column>
      <el-table-column label="店铺状态" align="center" prop="shopStatus">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.shopStatus" />
        </template>
      </el-table-column>
      <el-table-column label="买家账号" align="center" prop="shopBuyerId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.shopBuyerId" />
        </template>
      </el-table-column>
      <el-table-column label="省" align="center" prop="receiverState">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverState" />
        </template>
      </el-table-column>
      <el-table-column label="市" align="center" prop="receiverCity">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverCity" />
        </template>
      </el-table-column>
      <el-table-column label="区" align="center" prop="receiverDistrict">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverDistrict" />
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" prop="receiverAddress">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverAddress" />
        </template>
      </el-table-column>
      <el-table-column label="收件人" align="center" prop="receiverName">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverName" />
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center" prop="receiverPhone">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverPhone" />
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center" prop="receiverMobile">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.receiverMobile" />
        </template>
      </el-table-column>
      <el-table-column label="应付金额" align="center" prop="payAmount">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.payAmount" />
        </template>
      </el-table-column>
      <el-table-column label="运费" align="center" prop="freight">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.freight" />
        </template>
      </el-table-column>
      <el-table-column label="卖家备注" align="center" prop="remark">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="是否货到付款" align="center" prop="isCod">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.isCod" />
        </template>
      </el-table-column>
      <el-table-column label="修改日期" align="center" prop="shopModified" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.shopModified) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递单号" align="center" prop="lId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.lId" />
        </template>
      </el-table-column>
      <el-table-column label="快递公司名称" align="center" prop="logisticsCompany">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.logisticsCompany" />
        </template>
      </el-table-column>
      <el-table-column label="订单异常描述" align="center" prop="questionDesc">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.questionDesc" />
        </template>
      </el-table-column>
      <el-table-column label="卖家标签（旗帜）" align="center" prop="sellerFlag">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.sellerFlag" />
        </template>
      </el-table-column>
      <el-table-column label="快递公司编码" align="center" prop="lcId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.lcId" />
        </template>
      </el-table-column>
      <el-table-column label="传ERP时间" align="center" prop="toErpTime">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.toErpTime" />
        </template>
      </el-table-column>
      <el-table-column label="传输标记" align="center" prop="erpStatus">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.erpStatus" />
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center" prop="orderNo">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.orderNo" />
        </template>
      </el-table-column>
      <el-table-column label="聚水潭内部单号" align="center" prop="oId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.oId" />
        </template>
      </el-table-column>
      <el-table-column label="订单状态 2取消 3取消成功 4取消失败" align="center" prop="orderStatus">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.orderStatus" />
        </template>
      </el-table-column>
      <el-table-column label="仓库中文名称（作为聚水潭标签传值）" align="center" prop="warehouse">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.warehouse" />
        </template>
      </el-table-column>
      <el-table-column label="SALE销售单,MARKET营销寄样,ZP_ADJUST内部仓正品调整,CP_ADJUST内部仓次品调整" align="center" prop="soFrom">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.soFrom" />
        </template>
      </el-table-column>
      <el-table-column label="错误信息" align="center" prop="errorMsg">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.errorMsg" />
        </template>
      </el-table-column>
      <el-table-column label="调入仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" align="center" prop="linkWarehouse">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.linkWarehouse" />
        </template>
      </el-table-column>
      <el-table-column label="调出仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" align="center" prop="warehouseId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.warehouseId" />
        </template>
      </el-table-column>
      <el-table-column label="内部调拨单号ID" align="center" prop="allocateInId">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.allocateInId" />
        </template>
      </el-table-column>
      <el-table-column label="是否出库 1已出库，0没有，2出库失败" align="center" prop="isOut">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.isOut" />
        </template>
      </el-table-column>
      <el-table-column label="失败重试次数" align="center" prop="errorNum">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.$dictType.toUpperCase()" :value="scope.row.errorNum" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['fx:ec2jst-order:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['fx:ec2jst-order:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <Ec2jstOrderForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as Ec2jstOrderApi from '@/api/fx/ec2jstorder';
import Ec2jstOrderForm from './Ec2jstOrderForm.vue';
export default {
  name: "Ec2jstOrder",
  components: {
          Ec2jstOrderForm,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
              // 总条数
        total: 0,
      // 分销订单上传中间列表
      list: [],
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 选中行
      currentRow: {},
      // 查询参数
      queryParams: {
                    pageNo: 1,
            pageSize: 10,
        shopId: null,
        orderDate: [],
        shopStatus: null,
        shopBuyerId: null,
        receiverState: null,
        receiverCity: null,
        receiverDistrict: null,
        receiverAddress: null,
        receiverName: null,
        receiverPhone: null,
        receiverMobile: null,
        payAmount: null,
        freight: null,
        remark: null,
        isCod: null,
        shopModified: null,
        lId: null,
        logisticsCompany: null,
        questionDesc: null,
        sellerFlag: null,
        lcId: null,
        toErpTime: [],
        erpStatus: null,
        orderNo: null,
        oId: null,
        orderStatus: null,
        warehouse: null,
        soFrom: null,
        errorMsg: null,
        linkWarehouse: null,
        warehouseId: null,
        allocateInId: null,
        isOut: null,
        errorNum: null,
      },
            };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      try {
      this.loading = true;
              const res = await Ec2jstOrderApi.getEc2jstOrderPage(this.queryParams);
        this.list = res.data.list;
        this.total = res.data.total;
      } finally {
        this.loading = false;
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 添加/修改操作 */
    openForm(id) {
      this.$refs["formRef"].open(id);
    },
    /** 删除按钮操作 */
    async handleDelete(row) {
      const id = row.id;
      await this.$modal.confirm('是否确认删除分销订单上传中间编号为"' + id + '"的数据项?')
      try {
       await Ec2jstOrderApi.deleteEc2jstOrder(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有分销订单上传中间数据项?');
      try {
        this.exportLoading = true;
        const res = await Ec2jstOrderApi.exportEc2jstOrderExcel(this.queryParams);
        this.$download.excel(res, '分销订单上传中间.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
