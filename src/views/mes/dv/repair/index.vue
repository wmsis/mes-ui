<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="维修单编号" prop="repairCode">
        <el-input
          v-model="queryParams.repairCode"
          placeholder="请输入维修单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="维修单名称" prop="repairName">
        <el-input
          v-model="queryParams.repairName"
          placeholder="请输入维修单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备ID" prop="machineryId">
        <el-input
          v-model="queryParams.machineryId"
          placeholder="请输入设备ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备编码" prop="machineryCode">
        <el-input
          v-model="queryParams.machineryCode"
          placeholder="请输入设备编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="machineryName">
        <el-input
          v-model="queryParams.machineryName"
          placeholder="请输入设备名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="品牌" prop="machineryBrand">
        <el-input
          v-model="queryParams.machineryBrand"
          placeholder="请输入品牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="规格型号" prop="machinerySpec">
        <el-input
          v-model="queryParams.machinerySpec"
          placeholder="请输入规格型号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备类型ID" prop="machineryTypeId">
        <el-input
          v-model="queryParams.machineryTypeId"
          placeholder="请输入设备类型ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报修日期" prop="requireDate">
        <el-date-picker clearable
          v-model="queryParams.requireDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择报修日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维修完成日期" prop="finishDate">
        <el-date-picker clearable
          v-model="queryParams.finishDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择维修完成日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="验收日期" prop="confirmDate">
        <el-date-picker clearable
          v-model="queryParams.confirmDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择验收日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维修结果" prop="repairResult">
        <el-select v-model="queryParams.repairResult" placeholder="请选择维修结果" clearable>
          <el-option
            v-for="dict in dict.type.mes_repair_result"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="维修人员" prop="acceptedBy">
        <el-input
          v-model="queryParams.acceptedBy"
          placeholder="请输入维修人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="验收人员" prop="confirmBy">
        <el-input
          v-model="queryParams.confirmBy"
          placeholder="请输入验收人员"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['dv:repair:add']"
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
          v-hasPermi="['dv:repair:edit']"
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
          v-hasPermi="['dv:repair:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dv:repair:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="repairList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="维修单ID" align="center" prop="repairId" />
      <el-table-column label="维修单编号" align="center" prop="repairCode" />
      <el-table-column label="维修单名称" align="center" prop="repairName" />
      <el-table-column label="设备ID" align="center" prop="machineryId" />
      <el-table-column label="设备编码" align="center" prop="machineryCode" />
      <el-table-column label="设备名称" align="center" prop="machineryName" />
      <el-table-column label="品牌" align="center" prop="machineryBrand" />
      <el-table-column label="规格型号" align="center" prop="machinerySpec" />
      <el-table-column label="设备类型ID" align="center" prop="machineryTypeId" />
      <el-table-column label="报修日期" align="center" prop="requireDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.requireDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修完成日期" align="center" prop="finishDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.finishDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="验收日期" align="center" prop="confirmDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.confirmDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修结果" align="center" prop="repairResult">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_repair_result" :value="scope.row.repairResult"/>
        </template>
      </el-table-column>
      <el-table-column label="维修人员" align="center" prop="acceptedBy" />
      <el-table-column label="验收人员" align="center" prop="confirmBy" />
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
            v-hasPermi="['dv:repair:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dv:repair:remove']"
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

    <!-- 添加或修改设备维修单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="维修单编号" prop="repairCode">
          <el-input v-model="form.repairCode" placeholder="请输入维修单编号" />
        </el-form-item>
        <el-form-item label="维修单名称" prop="repairName">
          <el-input v-model="form.repairName" placeholder="请输入维修单名称" />
        </el-form-item>
        <el-form-item label="设备ID" prop="machineryId">
          <el-input v-model="form.machineryId" placeholder="请输入设备ID" />
        </el-form-item>
        <el-form-item label="设备编码" prop="machineryCode">
          <el-input v-model="form.machineryCode" placeholder="请输入设备编码" />
        </el-form-item>
        <el-form-item label="设备名称" prop="machineryName">
          <el-input v-model="form.machineryName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="品牌" prop="machineryBrand">
          <el-input v-model="form.machineryBrand" placeholder="请输入品牌" />
        </el-form-item>
        <el-form-item label="规格型号" prop="machinerySpec">
          <el-input v-model="form.machinerySpec" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="设备类型ID" prop="machineryTypeId">
          <el-input v-model="form.machineryTypeId" placeholder="请输入设备类型ID" />
        </el-form-item>
        <el-form-item label="报修日期" prop="requireDate">
          <el-date-picker clearable
            v-model="form.requireDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择报修日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修完成日期" prop="finishDate">
          <el-date-picker clearable
            v-model="form.finishDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择维修完成日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="验收日期" prop="confirmDate">
          <el-date-picker clearable
            v-model="form.confirmDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择验收日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修结果">
          <el-radio-group v-model="form.repairResult">
            <el-radio
              v-for="dict in dict.type.mes_repair_result"
              :key="dict.value"
:label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="维修人员" prop="acceptedBy">
          <el-input v-model="form.acceptedBy" placeholder="请输入维修人员" />
        </el-form-item>
        <el-form-item label="验收人员" prop="confirmBy">
          <el-input v-model="form.confirmBy" placeholder="请输入验收人员" />
        </el-form-item>
        <el-form-item label="单据状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择单据状态">
            <el-option
              v-for="dict in dict.type.mes_order_status"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
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
import { listRepair, getRepair, delRepair, addRepair, updateRepair } from "@/api/mes/dv/repair";

export default {
  name: "Repair",
  dicts: ['mes_repair_result', 'mes_order_status'],
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
      // 设备维修单表格数据
      repairList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        repairCode: null,
        repairName: null,
        machineryId: null,
        machineryCode: null,
        machineryName: null,
        machineryBrand: null,
        machinerySpec: null,
        machineryTypeId: null,
        requireDate: null,
        finishDate: null,
        confirmDate: null,
        repairResult: null,
        acceptedBy: null,
        confirmBy: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        repairCode: [
          { required: true, message: "维修单编号不能为空", trigger: "blur" }
        ],
        machineryId: [
          { required: true, message: "设备ID不能为空", trigger: "blur" }
        ],
        machineryCode: [
          { required: true, message: "设备编码不能为空", trigger: "blur" }
        ],
        machineryName: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        machineryTypeId: [
          { required: true, message: "设备类型ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询设备维修单列表 */
    getList() {
      this.loading = true;
      listRepair(this.queryParams).then(response => {
        this.repairList = response.rows;
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
        repairId: null,
        repairCode: null,
        repairName: null,
        machineryId: null,
        machineryCode: null,
        machineryName: null,
        machineryBrand: null,
        machinerySpec: null,
        machineryTypeId: null,
        requireDate: null,
        finishDate: null,
        confirmDate: null,
        repairResult: "0",
        acceptedBy: null,
        confirmBy: null,
        status: null,
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
      this.ids = selection.map(item => item.repairId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设备维修单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const repairId = row.repairId || this.ids
      getRepair(repairId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设备维修单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.repairId != null) {
            updateRepair(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRepair(this.form).then(response => {
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
      const repairIds = row.repairId || this.ids;
      this.$modal.confirm('是否确认删除设备维修单编号为"' + repairIds + '"的数据项？').then(function() {
        return delRepair(repairIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('dv/repair/export', {
        ...this.queryParams
      }, `repair_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
