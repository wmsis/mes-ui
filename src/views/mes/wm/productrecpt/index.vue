<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="入库单编号" prop="recptCode">
        <el-input
          v-model="queryParams.recptCode"
          placeholder="请输入入库单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库单名称" prop="recptName">
        <el-input
          v-model="queryParams.recptName"
          placeholder="请输入入库单名称"
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
      <el-form-item label="生产工单编码" prop="workorderCode">
        <el-input
          v-model="queryParams.workorderCode"
          placeholder="请输入生产工单编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产工单名称" prop="workorderName">
        <el-input
          v-model="queryParams.workorderName"
          placeholder="请输入生产工单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库ID" prop="warehouseId">
        <el-input
          v-model="queryParams.warehouseId"
          placeholder="请输入仓库ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库编码" prop="warehouseCode">
        <el-input
          v-model="queryParams.warehouseCode"
          placeholder="请输入仓库编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库名称" prop="warehouseName">
        <el-input
          v-model="queryParams.warehouseName"
          placeholder="请输入仓库名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库区ID" prop="locationId">
        <el-input
          v-model="queryParams.locationId"
          placeholder="请输入库区ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库区编码" prop="locationCode">
        <el-input
          v-model="queryParams.locationCode"
          placeholder="请输入库区编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库区名称" prop="locationName">
        <el-input
          v-model="queryParams.locationName"
          placeholder="请输入库区名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位ID" prop="areaId">
        <el-input
          v-model="queryParams.areaId"
          placeholder="请输入库位ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位编码" prop="areaCode">
        <el-input
          v-model="queryParams.areaCode"
          placeholder="请输入库位编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库位名称" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入库位名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入库日期" prop="recptDate">
        <el-date-picker clearable
          v-model="queryParams.recptDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择入库日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="单据状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择单据状态" clearable>
          <el-option
            v-for="dict in dict.type.mes_order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
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
          v-hasPermi="['wm:productrecpt:add']"
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
          v-hasPermi="['wm:productrecpt:edit']"
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
          v-hasPermi="['wm:productrecpt:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['wm:productrecpt:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="productrecptList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="入库单ID" align="center" prop="recptId" />
      <el-table-column label="入库单编号" align="center" prop="recptCode" />
      <el-table-column label="入库单名称" align="center" prop="recptName" />
      <el-table-column label="生产工单ID" align="center" prop="workorderId" />
      <el-table-column label="生产工单编码" align="center" prop="workorderCode" />
      <el-table-column label="生产工单名称" align="center" prop="workorderName" />
      <el-table-column label="仓库ID" align="center" prop="warehouseId" />
      <el-table-column label="仓库编码" align="center" prop="warehouseCode" />
      <el-table-column label="仓库名称" align="center" prop="warehouseName" />
      <el-table-column label="库区ID" align="center" prop="locationId" />
      <el-table-column label="库区编码" align="center" prop="locationCode" />
      <el-table-column label="库区名称" align="center" prop="locationName" />
      <el-table-column label="库位ID" align="center" prop="areaId" />
      <el-table-column label="库位编码" align="center" prop="areaCode" />
      <el-table-column label="库位名称" align="center" prop="areaName" />
      <el-table-column label="入库日期" align="center" prop="recptDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.recptDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单据状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_order_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['wm:productrecpt:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['wm:productrecpt:remove']"
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

    <!-- 添加或修改产品入库录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="入库单编号" prop="recptCode">
          <el-input v-model="form.recptCode" placeholder="请输入入库单编号" />
        </el-form-item>
        <el-form-item label="入库单名称" prop="recptName">
          <el-input v-model="form.recptName" placeholder="请输入入库单名称" />
        </el-form-item>
        <el-form-item label="生产工单ID" prop="workorderId">
          <el-input v-model="form.workorderId" placeholder="请输入生产工单ID" />
        </el-form-item>
        <el-form-item label="生产工单编码" prop="workorderCode">
          <el-input v-model="form.workorderCode" placeholder="请输入生产工单编码" />
        </el-form-item>
        <el-form-item label="生产工单名称" prop="workorderName">
          <el-input v-model="form.workorderName" placeholder="请输入生产工单名称" />
        </el-form-item>
        <el-form-item label="仓库ID" prop="warehouseId">
          <el-input v-model="form.warehouseId" placeholder="请输入仓库ID" />
        </el-form-item>
        <el-form-item label="仓库编码" prop="warehouseCode">
          <el-input v-model="form.warehouseCode" placeholder="请输入仓库编码" />
        </el-form-item>
        <el-form-item label="仓库名称" prop="warehouseName">
          <el-input v-model="form.warehouseName" placeholder="请输入仓库名称" />
        </el-form-item>
        <el-form-item label="库区ID" prop="locationId">
          <el-input v-model="form.locationId" placeholder="请输入库区ID" />
        </el-form-item>
        <el-form-item label="库区编码" prop="locationCode">
          <el-input v-model="form.locationCode" placeholder="请输入库区编码" />
        </el-form-item>
        <el-form-item label="库区名称" prop="locationName">
          <el-input v-model="form.locationName" placeholder="请输入库区名称" />
        </el-form-item>
        <el-form-item label="库位ID" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入库位ID" />
        </el-form-item>
        <el-form-item label="库位编码" prop="areaCode">
          <el-input v-model="form.areaCode" placeholder="请输入库位编码" />
        </el-form-item>
        <el-form-item label="库位名称" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入库位名称" />
        </el-form-item>
        <el-form-item label="入库日期" prop="recptDate">
          <el-date-picker clearable
            v-model="form.recptDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入库日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.mes_order_status"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
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
import { listProductrecpt, getProductrecpt, delProductrecpt, addProductrecpt, updateProductrecpt } from "@/api/mes/wm/productrecpt";

export default {
  name: "Productrecpt",
  dicts: ['mes_order_status'],
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
      // 产品入库录表格数据
      productrecptList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        recptCode: null,
        recptName: null,
        workorderId: null,
        workorderCode: null,
        workorderName: null,
        warehouseId: null,
        warehouseCode: null,
        warehouseName: null,
        locationId: null,
        locationCode: null,
        locationName: null,
        areaId: null,
        areaCode: null,
        areaName: null,
        recptDate: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        recptCode: [
          { required: true, message: "入库单编号不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询产品入库录列表 */
    getList() {
      this.loading = true;
      listProductrecpt(this.queryParams).then(response => {
        this.productrecptList = response.rows;
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
        recptId: null,
        recptCode: null,
        recptName: null,
        workorderId: null,
        workorderCode: null,
        workorderName: null,
        warehouseId: null,
        warehouseCode: null,
        warehouseName: null,
        locationId: null,
        locationCode: null,
        locationName: null,
        areaId: null,
        areaCode: null,
        areaName: null,
        recptDate: null,
        status: "0",
        remark: null,
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      };
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
      this.ids = selection.map(item => item.recptId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加产品入库录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const recptId = row.recptId || this.ids
      getProductrecpt(recptId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改产品入库录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.recptId != null) {
            updateProductrecpt(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addProductrecpt(this.form).then(response => {
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
      const recptIds = row.recptId || this.ids;
      this.$modal.confirm('是否确认删除产品入库录编号为"' + recptIds + '"的数据项？').then(function() {
        return delProductrecpt(recptIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wm/productrecpt/export', {
        ...this.queryParams
      }, `productrecpt_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
