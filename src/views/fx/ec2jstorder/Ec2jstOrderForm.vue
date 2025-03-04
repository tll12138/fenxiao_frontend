<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="店铺编码" prop="shopId">
                      <el-input v-model="formData.shopId" placeholder="请输入店铺编码" />
                    </el-form-item>
                    <el-form-item label="下单时间" prop="orderDate">
                      <el-date-picker clearable v-model="formData.orderDate" type="date" value-format="timestamp" placeholder="选择下单时间" />
                    </el-form-item>
                    <el-form-item label="店铺状态" prop="shopStatus">
                      <el-radio-group v-model="formData.shopStatus">
                            <el-radio v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                                      :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="买家账号" prop="shopBuyerId">
                      <el-input v-model="formData.shopBuyerId" placeholder="请输入买家账号" />
                    </el-form-item>
                    <el-form-item label="省" prop="receiverState">
                      <el-input v-model="formData.receiverState" placeholder="请输入省" />
                    </el-form-item>
                    <el-form-item label="市" prop="receiverCity">
                      <el-input v-model="formData.receiverCity" placeholder="请输入市" />
                    </el-form-item>
                    <el-form-item label="区" prop="receiverDistrict">
                      <el-input v-model="formData.receiverDistrict" placeholder="请输入区" />
                    </el-form-item>
                    <el-form-item label="地址" prop="receiverAddress">
                      <el-input v-model="formData.receiverAddress" placeholder="请输入地址" />
                    </el-form-item>
                    <el-form-item label="收件人" prop="receiverName">
                      <el-input v-model="formData.receiverName" placeholder="请输入收件人" />
                    </el-form-item>
                    <el-form-item label="联系电话" prop="receiverPhone">
                      <el-input v-model="formData.receiverPhone" placeholder="请输入联系电话" />
                    </el-form-item>
                    <el-form-item label="手机" prop="receiverMobile">
                      <el-input v-model="formData.receiverMobile" placeholder="请输入手机" />
                    </el-form-item>
                    <el-form-item label="应付金额" prop="payAmount">
                      <el-input v-model="formData.payAmount" placeholder="请输入应付金额" />
                    </el-form-item>
                    <el-form-item label="运费" prop="freight">
                      <el-input v-model="formData.freight" placeholder="请输入运费" />
                    </el-form-item>
                    <el-form-item label="卖家备注" prop="remark">
                      <el-input v-model="formData.remark" placeholder="请输入卖家备注" />
                    </el-form-item>
                    <el-form-item label="是否货到付款" prop="isCod">
                      <el-input v-model="formData.isCod" placeholder="请输入是否货到付款" />
                    </el-form-item>
                    <el-form-item label="修改日期" prop="shopModified">
                      <el-date-picker clearable v-model="formData.shopModified" type="date" value-format="timestamp" placeholder="选择修改日期" />
                    </el-form-item>
                    <el-form-item label="快递单号" prop="lId">
                      <el-input v-model="formData.lId" placeholder="请输入快递单号" />
                    </el-form-item>
                    <el-form-item label="快递公司名称" prop="logisticsCompany">
                      <el-input v-model="formData.logisticsCompany" placeholder="请输入快递公司名称" />
                    </el-form-item>
                    <el-form-item label="订单异常描述" prop="questionDesc">
                      <el-input v-model="formData.questionDesc" placeholder="请输入订单异常描述" />
                    </el-form-item>
                    <el-form-item label="卖家标签（旗帜）" prop="sellerFlag">
                      <el-input v-model="formData.sellerFlag" placeholder="请输入卖家标签（旗帜）" />
                    </el-form-item>
                    <el-form-item label="快递公司编码" prop="lcId">
                      <el-input v-model="formData.lcId" placeholder="请输入快递公司编码" />
                    </el-form-item>
                    <el-form-item label="传ERP时间" prop="toErpTime">
                      <el-date-picker clearable v-model="formData.toErpTime" type="date" value-format="timestamp" placeholder="选择传ERP时间" />
                    </el-form-item>
                    <el-form-item label="传输标记" prop="erpStatus">
                      <el-radio-group v-model="formData.erpStatus">
                            <el-radio v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                                      :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="订单号" prop="orderNo">
                      <el-input v-model="formData.orderNo" placeholder="请输入订单号" />
                    </el-form-item>
                    <el-form-item label="聚水潭内部单号" prop="oId">
                      <el-input v-model="formData.oId" placeholder="请输入聚水潭内部单号" />
                    </el-form-item>
                    <el-form-item label="订单状态 2取消 3取消成功 4取消失败" prop="orderStatus">
                      <el-radio-group v-model="formData.orderStatus">
                            <el-radio v-for="dict in this.getDictDatas(DICT_TYPE.$dictType.toUpperCase())"
                                      :key="dict.value" :label="parseInt(dict.value)"
>{{dict.label}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="仓库中文名称（作为聚水潭标签传值）" prop="warehouse">
                      <el-input v-model="formData.warehouse" placeholder="请输入仓库中文名称（作为聚水潭标签传值）" />
                    </el-form-item>
                    <el-form-item label="SALE销售单,MARKET营销寄样,ZP_ADJUST内部仓正品调整,CP_ADJUST内部仓次品调整" prop="soFrom">
                      <el-input v-model="formData.soFrom" placeholder="请输入SALE销售单,MARKET营销寄样,ZP_ADJUST内部仓正品调整,CP_ADJUST内部仓次品调整" />
                    </el-form-item>
                    <el-form-item label="错误信息" prop="errorMsg">
                      <el-input v-model="formData.errorMsg" placeholder="请输入错误信息" />
                    </el-form-item>
                    <el-form-item label="调入仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" prop="linkWarehouse">
                      <el-input v-model="formData.linkWarehouse" placeholder="请输入调入仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" />
                    </el-form-item>
                    <el-form-item label="调出仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" prop="warehouseId">
                      <el-input v-model="formData.warehouseId" placeholder="请输入调出仓公司内仓库id，主仓=1，销退仓=2，进货仓=3，次品仓=4，自定义1仓=6，自定义2仓=7，自定义3仓=8（对应ERP仓库资料设定页面）" />
                    </el-form-item>
                    <el-form-item label="内部调拨单号ID" prop="allocateInId">
                      <el-input v-model="formData.allocateInId" placeholder="请输入内部调拨单号ID" />
                    </el-form-item>
                    <el-form-item label="是否出库 1已出库，0没有，2出库失败" prop="isOut">
                      <el-input v-model="formData.isOut" placeholder="请输入是否出库 1已出库，0没有，2出库失败" />
                    </el-form-item>
                    <el-form-item label="失败重试次数" prop="errorNum">
                      <el-input v-model="formData.errorNum" placeholder="请输入失败重试次数" />
                    </el-form-item>
      </el-form>
              <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :disabled="formLoading">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as Ec2jstOrderApi from '@/api/fx/ec2jstorder';
      export default {
    name: "Ec2jstOrderForm",
    components: {
                    },
    data() {
      return {
        // 弹出层标题
        dialogTitle: "",
        // 是否显示弹出层
        dialogVisible: false,
        // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
        formLoading: false,
        // 表单参数
        formData: {
                            id: undefined,
                            shopId: undefined,
                            orderDate: undefined,
                            shopStatus: undefined,
                            shopBuyerId: undefined,
                            receiverState: undefined,
                            receiverCity: undefined,
                            receiverDistrict: undefined,
                            receiverAddress: undefined,
                            receiverName: undefined,
                            receiverPhone: undefined,
                            receiverMobile: undefined,
                            payAmount: undefined,
                            freight: undefined,
                            remark: undefined,
                            isCod: undefined,
                            shopModified: undefined,
                            lId: undefined,
                            logisticsCompany: undefined,
                            questionDesc: undefined,
                            sellerFlag: undefined,
                            lcId: undefined,
                            toErpTime: undefined,
                            erpStatus: undefined,
                            orderNo: undefined,
                            oId: undefined,
                            orderStatus: undefined,
                            warehouse: undefined,
                            soFrom: undefined,
                            errorMsg: undefined,
                            linkWarehouse: undefined,
                            warehouseId: undefined,
                            allocateInId: undefined,
                            isOut: undefined,
                            errorNum: undefined,
        },
        // 表单校验
        formRules: {
        },
                        };
    },
    methods: {
      /** 打开弹窗 */
     async open(id) {
        this.dialogVisible = true;
        this.reset();
        // 修改时，设置数据
        if (id) {
          this.formLoading = true;
          try {
            const res = await Ec2jstOrderApi.getEc2jstOrder(id);
            this.formData = res.data;
            this.title = "修改分销订单上传中间";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增分销订单上传中间";
              },
      /** 提交按钮 */
      async submitForm() {
        // 校验主表
        await this.$refs["formRef"].validate();
                  this.formLoading = true;
        try {
          const data = this.formData;
                  // 修改的提交
          if (data.id) {
            await Ec2jstOrderApi.updateEc2jstOrder(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await Ec2jstOrderApi.createEc2jstOrder(data);
          this.$modal.msgSuccess("新增成功");
          this.dialogVisible = false;
          this.$emit('success');
        } finally {
          this.formLoading = false;
        }
      },
                      /** 表单重置 */
      reset() {
        this.formData = {
                            id: undefined,
                            shopId: undefined,
                            orderDate: undefined,
                            shopStatus: undefined,
                            shopBuyerId: undefined,
                            receiverState: undefined,
                            receiverCity: undefined,
                            receiverDistrict: undefined,
                            receiverAddress: undefined,
                            receiverName: undefined,
                            receiverPhone: undefined,
                            receiverMobile: undefined,
                            payAmount: undefined,
                            freight: undefined,
                            remark: undefined,
                            isCod: undefined,
                            shopModified: undefined,
                            lId: undefined,
                            logisticsCompany: undefined,
                            questionDesc: undefined,
                            sellerFlag: undefined,
                            lcId: undefined,
                            toErpTime: undefined,
                            erpStatus: undefined,
                            orderNo: undefined,
                            oId: undefined,
                            orderStatus: undefined,
                            warehouse: undefined,
                            soFrom: undefined,
                            errorMsg: undefined,
                            linkWarehouse: undefined,
                            warehouseId: undefined,
                            allocateInId: undefined,
                            isOut: undefined,
                            errorNum: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
