<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="装箱单ID" prop="transferId">
        <el-input
          v-model="queryParams.transferId"
          placeholder="请输入装箱单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库存记录ID" prop="materialStockId">
        <el-input
          v-model="queryParams.materialStockId"
          placeholder="请输入库存记录ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品物料ID" prop="itemId">
        <el-input
          v-model="queryParams.itemId"
          placeholder="请输入产品物料ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品物料编码" prop="itemCode">
        <el-input
          v-model="queryParams.itemCode"
          placeholder="请输入产品物料编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品物料名称" prop="itemName">
        <el-input
          v-model="queryParams.itemName"
          placeholder="请输入产品物料名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unitOfMeasure">
        <el-input
          v-model="queryParams.unitOfMeasure"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="装箱数量" prop="quantityTransfer">
        <el-input
          v-model="queryParams.quantityTransfer"
          placeholder="请输入装箱数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产工单ID" prop="workorderId">
        <el-input
          v-model="queryParams.workorderId"
          placeholder="请输入生产工单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产工单编号" prop="workorderCode">
        <el-input
          v-model="queryParams.workorderCode"
          placeholder="请输入生产工单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次号" prop="batchCode">
        <el-input
          v-model="queryParams.batchCode"
          placeholder="请输入批次号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出仓库ID" prop="fromWarehouseId">
        <el-input
          v-model="queryParams.fromWarehouseId"
          placeholder="请输入移出仓库ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出仓库编码" prop="fromWarehouseCode">
        <el-input
          v-model="queryParams.fromWarehouseCode"
          placeholder="请输入移出仓库编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出仓库名称" prop="fromWarehouseName">
        <el-input
          v-model="queryParams.fromWarehouseName"
          placeholder="请输入移出仓库名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库区ID" prop="fromLocationId">
        <el-input
          v-model="queryParams.fromLocationId"
          placeholder="请输入移出库区ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库区编码" prop="fromLocationCode">
        <el-input
          v-model="queryParams.fromLocationCode"
          placeholder="请输入移出库区编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库区名称" prop="fromLocationName">
        <el-input
          v-model="queryParams.fromLocationName"
          placeholder="请输入移出库区名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库位ID" prop="fromAreaId">
        <el-input
          v-model="queryParams.fromAreaId"
          placeholder="请输入移出库位ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库位编码" prop="fromAreaCode">
        <el-input
          v-model="queryParams.fromAreaCode"
          placeholder="请输入移出库位编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移出库位名称" prop="fromAreaName">
        <el-input
          v-model="queryParams.fromAreaName"
          placeholder="请输入移出库位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入仓库ID" prop="toWarehouseId">
        <el-input
          v-model="queryParams.toWarehouseId"
          placeholder="请输入移入仓库ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入仓库编码" prop="toWarehouseCode">
        <el-input
          v-model="queryParams.toWarehouseCode"
          placeholder="请输入移入仓库编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入仓库名称" prop="toWarehouseName">
        <el-input
          v-model="queryParams.toWarehouseName"
          placeholder="请输入移入仓库名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库区ID" prop="toLocationId">
        <el-input
          v-model="queryParams.toLocationId"
          placeholder="请输入移入库区ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库区编码" prop="toLocationCode">
        <el-input
          v-model="queryParams.toLocationCode"
          placeholder="请输入移入库区编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库区名称" prop="toLocationName">
        <el-input
          v-model="queryParams.toLocationName"
          placeholder="请输入移入库区名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库位ID" prop="toAreaId">
        <el-input
          v-model="queryParams.toAreaId"
          placeholder="请输入移入库位ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库位编码" prop="toAreaCode">
        <el-input
          v-model="queryParams.toAreaCode"
          placeholder="请输入移入库位编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="移入库位名称" prop="toAreaName">
        <el-input
          v-model="queryParams.toAreaName"
          placeholder="请输入移入库位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="有效期" prop="expireDate">
        <el-date-picker clearable
          v-model="queryParams.expireDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择有效期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="供应商ID" prop="vendorId">
        <el-input
          v-model="queryParams.vendorId"
          placeholder="请输入供应商ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商编码" prop="vendorCode">
        <el-input
          v-model="queryParams.vendorCode"
          placeholder="请输入供应商编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商名称" prop="vendorName">
        <el-input
          v-model="queryParams.vendorName"
          placeholder="请输入供应商名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="供应商简称" prop="vendorNick">
        <el-input
          v-model="queryParams.vendorNick"
          placeholder="请输入供应商简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['wm:transferline:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['wm:transferline:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['wm:transferline:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wm:transferline:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transferlineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="明细行ID" align="center" prop="lineId" />
      <el-table-column label="装箱单ID" align="center" prop="transferId" />
      <el-table-column label="库存记录ID" align="center" prop="materialStockId" />
      <el-table-column label="产品物料ID" align="center" prop="itemId" />
      <el-table-column label="产品物料编码" align="center" prop="itemCode" />
      <el-table-column label="产品物料名称" align="center" prop="itemName" />
      <el-table-column label="规格型号" align="center" prop="specification" />
      <el-table-column label="单位" align="center" prop="unitOfMeasure" />
      <el-table-column label="装箱数量" align="center" prop="quantityTransfer" />
      <el-table-column label="生产工单ID" align="center" prop="workorderId" />
      <el-table-column label="生产工单编号" align="center" prop="workorderCode" />
      <el-table-column label="批次号" align="center" prop="batchCode" />
      <el-table-column label="移出仓库ID" align="center" prop="fromWarehouseId" />
      <el-table-column label="移出仓库编码" align="center" prop="fromWarehouseCode" />
      <el-table-column label="移出仓库名称" align="center" prop="fromWarehouseName" />
      <el-table-column label="移出库区ID" align="center" prop="fromLocationId" />
      <el-table-column label="移出库区编码" align="center" prop="fromLocationCode" />
      <el-table-column label="移出库区名称" align="center" prop="fromLocationName" />
      <el-table-column label="移出库位ID" align="center" prop="fromAreaId" />
      <el-table-column label="移出库位编码" align="center" prop="fromAreaCode" />
      <el-table-column label="移出库位名称" align="center" prop="fromAreaName" />
      <el-table-column label="移入仓库ID" align="center" prop="toWarehouseId" />
      <el-table-column label="移入仓库编码" align="center" prop="toWarehouseCode" />
      <el-table-column label="移入仓库名称" align="center" prop="toWarehouseName" />
      <el-table-column label="移入库区ID" align="center" prop="toLocationId" />
      <el-table-column label="移入库区编码" align="center" prop="toLocationCode" />
      <el-table-column label="移入库区名称" align="center" prop="toLocationName" />
      <el-table-column label="移入库位ID" align="center" prop="toAreaId" />
      <el-table-column label="移入库位编码" align="center" prop="toAreaCode" />
      <el-table-column label="移入库位名称" align="center" prop="toAreaName" />
      <el-table-column label="有效期" align="center" prop="expireDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expireDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商ID" align="center" prop="vendorId" />
      <el-table-column label="供应商编码" align="center" prop="vendorCode" />
      <el-table-column label="供应商名称" align="center" prop="vendorName" />
      <el-table-column label="供应商简称" align="center" prop="vendorNick" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wm:transferline:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wm:transferline:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改转移单行对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="装箱单ID" prop="transferId">
          <el-input v-model="form.transferId" placeholder="请输入装箱单ID" />
        </el-form-item>
        <el-form-item label="库存记录ID" prop="materialStockId">
          <el-input v-model="form.materialStockId" placeholder="请输入库存记录ID" />
        </el-form-item>
        <el-form-item label="产品物料ID" prop="itemId">
          <el-input v-model="form.itemId" placeholder="请输入产品物料ID" />
        </el-form-item>
        <el-form-item label="产品物料编码" prop="itemCode">
          <el-input v-model="form.itemCode" placeholder="请输入产品物料编码" />
        </el-form-item>
        <el-form-item label="产品物料名称" prop="itemName">
          <el-input v-model="form.itemName" placeholder="请输入产品物料名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="specification">
          <el-input v-model="form.specification" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="单位" prop="unitOfMeasure">
          <el-input v-model="form.unitOfMeasure" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="装箱数量" prop="quantityTransfer">
          <el-input v-model="form.quantityTransfer" placeholder="请输入装箱数量" />
        </el-form-item>
        <el-form-item label="生产工单ID" prop="workorderId">
          <el-input v-model="form.workorderId" placeholder="请输入生产工单ID" />
        </el-form-item>
        <el-form-item label="生产工单编号" prop="workorderCode">
          <el-input v-model="form.workorderCode" placeholder="请输入生产工单编号" />
        </el-form-item>
        <el-form-item label="批次号" prop="batchCode">
          <el-input v-model="form.batchCode" placeholder="请输入批次号" />
        </el-form-item>
        <el-form-item label="移出仓库ID" prop="fromWarehouseId">
          <el-input v-model="form.fromWarehouseId" placeholder="请输入移出仓库ID" />
        </el-form-item>
        <el-form-item label="移出仓库编码" prop="fromWarehouseCode">
          <el-input v-model="form.fromWarehouseCode" placeholder="请输入移出仓库编码" />
        </el-form-item>
        <el-form-item label="移出仓库名称" prop="fromWarehouseName">
          <el-input v-model="form.fromWarehouseName" placeholder="请输入移出仓库名称" />
        </el-form-item>
        <el-form-item label="移出库区ID" prop="fromLocationId">
          <el-input v-model="form.fromLocationId" placeholder="请输入移出库区ID" />
        </el-form-item>
        <el-form-item label="移出库区编码" prop="fromLocationCode">
          <el-input v-model="form.fromLocationCode" placeholder="请输入移出库区编码" />
        </el-form-item>
        <el-form-item label="移出库区名称" prop="fromLocationName">
          <el-input v-model="form.fromLocationName" placeholder="请输入移出库区名称" />
        </el-form-item>
        <el-form-item label="移出库位ID" prop="fromAreaId">
          <el-input v-model="form.fromAreaId" placeholder="请输入移出库位ID" />
        </el-form-item>
        <el-form-item label="移出库位编码" prop="fromAreaCode">
          <el-input v-model="form.fromAreaCode" placeholder="请输入移出库位编码" />
        </el-form-item>
        <el-form-item label="移出库位名称" prop="fromAreaName">
          <el-input v-model="form.fromAreaName" placeholder="请输入移出库位名称" />
        </el-form-item>
        <el-form-item label="移入仓库ID" prop="toWarehouseId">
          <el-input v-model="form.toWarehouseId" placeholder="请输入移入仓库ID" />
        </el-form-item>
        <el-form-item label="移入仓库编码" prop="toWarehouseCode">
          <el-input v-model="form.toWarehouseCode" placeholder="请输入移入仓库编码" />
        </el-form-item>
        <el-form-item label="移入仓库名称" prop="toWarehouseName">
          <el-input v-model="form.toWarehouseName" placeholder="请输入移入仓库名称" />
        </el-form-item>
        <el-form-item label="移入库区ID" prop="toLocationId">
          <el-input v-model="form.toLocationId" placeholder="请输入移入库区ID" />
        </el-form-item>
        <el-form-item label="移入库区编码" prop="toLocationCode">
          <el-input v-model="form.toLocationCode" placeholder="请输入移入库区编码" />
        </el-form-item>
        <el-form-item label="移入库区名称" prop="toLocationName">
          <el-input v-model="form.toLocationName" placeholder="请输入移入库区名称" />
        </el-form-item>
        <el-form-item label="移入库位ID" prop="toAreaId">
          <el-input v-model="form.toAreaId" placeholder="请输入移入库位ID" />
        </el-form-item>
        <el-form-item label="移入库位编码" prop="toAreaCode">
          <el-input v-model="form.toAreaCode" placeholder="请输入移入库位编码" />
        </el-form-item>
        <el-form-item label="移入库位名称" prop="toAreaName">
          <el-input v-model="form.toAreaName" placeholder="请输入移入库位名称" />
        </el-form-item>
        <el-form-item label="有效期" prop="expireDate">
          <el-date-picker clearable
            v-model="form.expireDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择有效期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="供应商ID" prop="vendorId">
          <el-input v-model="form.vendorId" placeholder="请输入供应商ID" />
        </el-form-item>
        <el-form-item label="供应商编码" prop="vendorCode">
          <el-input v-model="form.vendorCode" placeholder="请输入供应商编码" />
        </el-form-item>
        <el-form-item label="供应商名称" prop="vendorName">
          <el-input v-model="form.vendorName" placeholder="请输入供应商名称" />
        </el-form-item>
        <el-form-item label="供应商简称" prop="vendorNick">
          <el-input v-model="form.vendorNick" placeholder="请输入供应商简称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTransferline, getTransferline, delTransferline, addTransferline, updateTransferline } from "@/api/mes/wm/transferline";

export default {
  name: "Transferline",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 转移单行表格数据
      transferlineList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transferId: null,        materialStockId: null,        itemId: null,        itemCode: null,        itemName: null,        specification: null,        unitOfMeasure: null,        quantityTransfer: null,        workorderId: null,        workorderCode: null,        batchCode: null,        fromWarehouseId: null,        fromWarehouseCode: null,        fromWarehouseName: null,        fromLocationId: null,        fromLocationCode: null,        fromLocationName: null,        fromAreaId: null,        fromAreaCode: null,        fromAreaName: null,        toWarehouseId: null,        toWarehouseCode: null,        toWarehouseName: null,        toLocationId: null,        toLocationCode: null,        toLocationName: null,        toAreaId: null,        toAreaCode: null,        toAreaName: null,        expireDate: null,        vendorId: null,        vendorCode: null,        vendorName: null,        vendorNick: null,      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        transferId: [
          { required: true, message: "装箱单ID不能为空", trigger: "blur" }
        ],        materialStockId: [
          { required: true, message: "库存记录ID不能为空", trigger: "blur" }
        ],        itemId: [
          { required: true, message: "产品物料ID不能为空", trigger: "blur" }
        ],        quantityTransfer: [
          { required: true, message: "装箱数量不能为空", trigger: "blur" }
        ],      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询转移单行列表 */
    getList() {
      this.loading = true;
      listTransferline(this.queryParams).then(response => {
        this.transferlineList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        lineId: null,        transferId: null,        materialStockId: null,        itemId: null,        itemCode: null,        itemName: null,        specification: null,        unitOfMeasure: null,        quantityTransfer: null,        workorderId: null,        workorderCode: null,        batchCode: null,        fromWarehouseId: null,        fromWarehouseCode: null,        fromWarehouseName: null,        fromLocationId: null,        fromLocationCode: null,        fromLocationName: null,        fromAreaId: null,        fromAreaCode: null,        fromAreaName: null,        toWarehouseId: null,        toWarehouseCode: null,        toWarehouseName: null,        toLocationId: null,        toLocationCode: null,        toLocationName: null,        toAreaId: null,        toAreaCode: null,        toAreaName: null,        expireDate: null,        vendorId: null,        vendorCode: null,        vendorName: null,        vendorNick: null,        remark: null,        attr1: null,        attr2: null,        attr3: null,        attr4: null,        createBy: null,        createTime: null,        updateBy: null,        updateTime: null      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.lineId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加转移单行";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const lineId = row.lineId || this.ids
      getTransferline(lineId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改转移单行";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.lineId != null) {
            updateTransferline(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransferline(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const lineIds = row.lineId || this.ids;
      this.$modal.confirm('是否确认删除转移单行编号为"' + lineIds + '"的数据项？').then(function() {
        return delTransferline(lineIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wm/transferline/export', {
        ...this.queryParams
      }, `transferline_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
