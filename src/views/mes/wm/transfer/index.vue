<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="转移单编号" prop="transferCode">
        <el-input
          v-model="queryParams.transferCode"
          placeholder="请输入转移单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转移单名称" prop="transferName">
        <el-input
          v-model="queryParams.transferName"
          placeholder="请输入转移单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="转移单类型" prop="transferType">
        <el-select v-model="queryParams.transferType" placeholder="请选择转移单类型" clearable>
          <el-option
            v-for="dict in dict.type.mes_transfer_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目的地" prop="destination">
        <el-input
          v-model="queryParams.destination"
          placeholder="请输入目的地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="承运商" prop="carrier">
        <el-input
          v-model="queryParams.carrier"
          placeholder="请输入承运商"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="托运单号" prop="bookingNote">
        <el-input
          v-model="queryParams.bookingNote"
          placeholder="请输入托运单号"
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
      <el-form-item label="转移日期" prop="transferDate">
        <el-date-picker clearable
          v-model="queryParams.transferDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择转移日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单据状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择单据状态" clearable>
          <el-option label="请选择字典生成" value="" />
        </el-select>
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
          v-hasPermi="['wm:transfer:add']"
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
          v-hasPermi="['wm:transfer:edit']"
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
          v-hasPermi="['wm:transfer:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wm:transfer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transferList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="转移单ID" align="center" prop="transferId" />
      <el-table-column label="转移单编号" align="center" prop="transferCode" />
      <el-table-column label="转移单名称" align="center" prop="transferName" />
      <el-table-column label="转移单类型" align="center" prop="transferType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_transfer_type" :value="scope.row.transferType"/>
        </template>
      </el-table-column>
      <el-table-column label="目的地" align="center" prop="destination" />
      <el-table-column label="承运商" align="center" prop="carrier" />
      <el-table-column label="托运单号" align="center" prop="bookingNote" />
      <el-table-column label="移出仓库ID" align="center" prop="fromWarehouseId" />
      <el-table-column label="移出仓库编码" align="center" prop="fromWarehouseCode" />
      <el-table-column label="移出仓库名称" align="center" prop="fromWarehouseName" />
      <el-table-column label="移入仓库ID" align="center" prop="toWarehouseId" />
      <el-table-column label="移入仓库编码" align="center" prop="toWarehouseCode" />
      <el-table-column label="移入仓库名称" align="center" prop="toWarehouseName" />
      <el-table-column label="转移日期" align="center" prop="transferDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.transferDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单据状态" align="center" prop="status" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wm:transfer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wm:transfer:remove']"
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

    <!-- 添加或修改转移单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="转移单编号" prop="transferCode">
          <el-input v-model="form.transferCode" placeholder="请输入转移单编号" />
        </el-form-item>
        <el-form-item label="转移单名称" prop="transferName">
          <el-input v-model="form.transferName" placeholder="请输入转移单名称" />
        </el-form-item>
        <el-form-item label="转移单类型">
          <el-radio-group v-model="form.transferType">
            <el-radio
              v-for="dict in dict.type.mes_transfer_type"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="目的地" prop="destination">
          <el-input v-model="form.destination" placeholder="请输入目的地" />
        </el-form-item>
        <el-form-item label="承运商" prop="carrier">
          <el-input v-model="form.carrier" placeholder="请输入承运商" />
        </el-form-item>
        <el-form-item label="托运单号" prop="bookingNote">
          <el-input v-model="form.bookingNote" placeholder="请输入托运单号" />
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
        <el-form-item label="移入仓库ID" prop="toWarehouseId">
          <el-input v-model="form.toWarehouseId" placeholder="请输入移入仓库ID" />
        </el-form-item>
        <el-form-item label="移入仓库编码" prop="toWarehouseCode">
          <el-input v-model="form.toWarehouseCode" placeholder="请输入移入仓库编码" />
        </el-form-item>
        <el-form-item label="移入仓库名称" prop="toWarehouseName">
          <el-input v-model="form.toWarehouseName" placeholder="请输入移入仓库名称" />
        </el-form-item>
        <el-form-item label="转移日期" prop="transferDate">
          <el-date-picker clearable
            v-model="form.transferDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择转移日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-radio-group v-model="form.status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
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
import { listTransfer, getTransfer, delTransfer, addTransfer, updateTransfer } from "@/api/mes/wm/transfer";

export default {
  name: "Transfer",
  dicts: ['mes_transfer_type'],
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
      // 转移单表格数据
      transferList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transferCode: null,        transferName: null,        transferType: null,        destination: null,        carrier: null,        bookingNote: null,        fromWarehouseId: null,        fromWarehouseCode: null,        fromWarehouseName: null,        toWarehouseId: null,        toWarehouseCode: null,        toWarehouseName: null,        transferDate: null,        status: null,      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        transferCode: [
          { required: true, message: "转移单编号不能为空", trigger: "blur" }
        ],        transferName: [
          { required: true, message: "转移单名称不能为空", trigger: "blur" }
        ],        transferType: [
          { required: true, message: "转移单类型不能为空", trigger: "blur" }
        ],      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询转移单列表 */
    getList() {
      this.loading = true;
      listTransfer(this.queryParams).then(response => {
        this.transferList = response.rows;
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
        transferId: null,        transferCode: null,        transferName: null,        transferType: "0",        destination: null,        carrier: null,        bookingNote: null,        fromWarehouseId: null,        fromWarehouseCode: null,        fromWarehouseName: null,        toWarehouseId: null,        toWarehouseCode: null,        toWarehouseName: null,        transferDate: null,        status: "0",        remark: null,        attr1: null,        attr2: null,        attr3: null,        attr4: null,        createBy: null,        createTime: null,        updateBy: null,        updateTime: null      };
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
      this.ids = selection.map(item => item.transferId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加转移单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const transferId = row.transferId || this.ids
      getTransfer(transferId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改转移单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.transferId != null) {
            updateTransfer(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransfer(this.form).then(response => {
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
      const transferIds = row.transferId || this.ids;
      this.$modal.confirm('是否确认删除转移单编号为"' + transferIds + '"的数据项？').then(function() {
        return delTransfer(transferIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wm/transfer/export', {
        ...this.queryParams
      }, `transfer_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
