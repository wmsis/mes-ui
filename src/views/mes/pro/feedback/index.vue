<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="报工类型" prop="feedbackType">
        <el-select v-model="queryParams.feedbackType" placeholder="请选择报工类型" clearable>
          <el-option
            v-for="dict in dict.type.mes_feedback_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工作站ID" prop="workstationId">
        <el-input
          v-model="queryParams.workstationId"
          placeholder="请输入工作站ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作站编号" prop="workstationCode">
        <el-input
          v-model="queryParams.workstationCode"
          placeholder="请输入工作站编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工作站名称" prop="workstationName">
        <el-input
          v-model="queryParams.workstationName"
          placeholder="请输入工作站名称"
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
      <el-form-item label="生产工单名称" prop="workorderName">
        <el-input
          v-model="queryParams.workorderName"
          placeholder="请输入生产工单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产任务ID" prop="taskId">
        <el-input
          v-model="queryParams.taskId"
          placeholder="请输入生产任务ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产任务编号" prop="taskCode">
        <el-input
          v-model="queryParams.taskCode"
          placeholder="请输入生产任务编号"
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
      <el-form-item label="排产数量" prop="quantity">
        <el-input
          v-model="queryParams.quantity"
          placeholder="请输入排产数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本次报工数量" prop="quantityFeedback">
        <el-input
          v-model="queryParams.quantityFeedback"
          placeholder="请输入本次报工数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="合格品数量" prop="quantityQualified">
        <el-input
          v-model="queryParams.quantityQualified"
          placeholder="请输入合格品数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="不良品数量" prop="quantityUnquanlified">
        <el-input
          v-model="queryParams.quantityUnquanlified"
          placeholder="请输入不良品数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报工用户名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入报工用户名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报工途径" prop="feedbackChannel">
        <el-input
          v-model="queryParams.feedbackChannel"
          placeholder="请输入报工途径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报工时间" prop="feedbackTime">
        <el-date-picker clearable
          v-model="queryParams.feedbackTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择报工时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="记录人" prop="recordUser">
        <el-input
          v-model="queryParams.recordUser"
          placeholder="请输入记录人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
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
          v-hasPermi="['pro:feedback:add']"
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
          v-hasPermi="['pro:feedback:edit']"
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
          v-hasPermi="['pro:feedback:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pro:feedback:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="feedbackList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录ID" align="center" prop="recordId" />
      <el-table-column label="报工类型" align="center" prop="feedbackType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_feedback_type" :value="scope.row.feedbackType"/>
        </template>
      </el-table-column>
      <el-table-column label="工作站ID" align="center" prop="workstationId" />
      <el-table-column label="工作站编号" align="center" prop="workstationCode" />
      <el-table-column label="工作站名称" align="center" prop="workstationName" />
      <el-table-column label="生产工单ID" align="center" prop="workorderId" />
      <el-table-column label="生产工单编号" align="center" prop="workorderCode" />
      <el-table-column label="生产工单名称" align="center" prop="workorderName" />
      <el-table-column label="生产任务ID" align="center" prop="taskId" />
      <el-table-column label="生产任务编号" align="center" prop="taskCode" />
      <el-table-column label="产品物料ID" align="center" prop="itemId" />
      <el-table-column label="产品物料编码" align="center" prop="itemCode" />
      <el-table-column label="产品物料名称" align="center" prop="itemName" />
      <el-table-column label="规格型号" align="center" prop="specification" />
      <el-table-column label="排产数量" align="center" prop="quantity" />
      <el-table-column label="本次报工数量" align="center" prop="quantityFeedback" />
      <el-table-column label="合格品数量" align="center" prop="quantityQualified" />
      <el-table-column label="不良品数量" align="center" prop="quantityUnquanlified" />
      <el-table-column label="报工用户名" align="center" prop="userName" />
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="报工途径" align="center" prop="feedbackChannel" />
      <el-table-column label="报工时间" align="center" prop="feedbackTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.feedbackTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="记录人" align="center" prop="recordUser" />
      <el-table-column label="状态" align="center" prop="status">
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
            v-hasPermi="['pro:feedback:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pro:feedback:remove']"
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

    <!-- 添加或修改生产报工记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="报工类型" prop="feedbackType">
          <el-select v-model="form.feedbackType" placeholder="请选择报工类型">
            <el-option
              v-for="dict in dict.type.mes_feedback_type"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作站ID" prop="workstationId">
          <el-input v-model="form.workstationId" placeholder="请输入工作站ID" />
        </el-form-item>
        <el-form-item label="工作站编号" prop="workstationCode">
          <el-input v-model="form.workstationCode" placeholder="请输入工作站编号" />
        </el-form-item>
        <el-form-item label="工作站名称" prop="workstationName">
          <el-input v-model="form.workstationName" placeholder="请输入工作站名称" />
        </el-form-item>
        <el-form-item label="生产工单ID" prop="workorderId">
          <el-input v-model="form.workorderId" placeholder="请输入生产工单ID" />
        </el-form-item>
        <el-form-item label="生产工单编号" prop="workorderCode">
          <el-input v-model="form.workorderCode" placeholder="请输入生产工单编号" />
        </el-form-item>
        <el-form-item label="生产工单名称" prop="workorderName">
          <el-input v-model="form.workorderName" placeholder="请输入生产工单名称" />
        </el-form-item>
        <el-form-item label="生产任务ID" prop="taskId">
          <el-input v-model="form.taskId" placeholder="请输入生产任务ID" />
        </el-form-item>
        <el-form-item label="生产任务编号" prop="taskCode">
          <el-input v-model="form.taskCode" placeholder="请输入生产任务编号" />
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
        <el-form-item label="排产数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入排产数量" />
        </el-form-item>
        <el-form-item label="本次报工数量" prop="quantityFeedback">
          <el-input v-model="form.quantityFeedback" placeholder="请输入本次报工数量" />
        </el-form-item>
        <el-form-item label="合格品数量" prop="quantityQualified">
          <el-input v-model="form.quantityQualified" placeholder="请输入合格品数量" />
        </el-form-item>
        <el-form-item label="不良品数量" prop="quantityUnquanlified">
          <el-input v-model="form.quantityUnquanlified" placeholder="请输入不良品数量" />
        </el-form-item>
        <el-form-item label="报工用户名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入报工用户名" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="报工途径" prop="feedbackChannel">
          <el-input v-model="form.feedbackChannel" placeholder="请输入报工途径" />
        </el-form-item>
        <el-form-item label="报工时间" prop="feedbackTime">
          <el-date-picker clearable
            v-model="form.feedbackTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择报工时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="记录人" prop="recordUser">
          <el-input v-model="form.recordUser" placeholder="请输入记录人" />
        </el-form-item>
        <el-form-item label="状态">
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
import { listFeedback, getFeedback, delFeedback, addFeedback, updateFeedback } from "@/api/mes/pro/feedback";

export default {
  name: "Feedback",
  dicts: ['mes_order_status', 'mes_feedback_type'],
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
      // 生产报工记录表格数据
      feedbackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        feedbackType: null,
        workstationId: null,
        workstationCode: null,
        workstationName: null,
        workorderId: null,
        workorderCode: null,
        workorderName: null,
        taskId: null,
        taskCode: null,
        itemId: null,
        itemCode: null,
        itemName: null,
        specification: null,
        quantity: null,
        quantityFeedback: null,
        quantityQualified: null,
        quantityUnquanlified: null,
        userName: null,
        nickName: null,
        feedbackChannel: null,
        feedbackTime: null,
        recordUser: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        feedbackType: [
          { required: true, message: "报工类型不能为空", trigger: "change" }
        ],
        workstationId: [
          { required: true, message: "工作站ID不能为空", trigger: "blur" }
        ],
        workorderId: [
          { required: true, message: "生产工单ID不能为空", trigger: "blur" }
        ],
        itemId: [
          { required: true, message: "产品物料ID不能为空", trigger: "blur" }
        ],
        itemCode: [
          { required: true, message: "产品物料编码不能为空", trigger: "blur" }
        ],
        itemName: [
          { required: true, message: "产品物料名称不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询生产报工记录列表 */
    getList() {
      this.loading = true;
      listFeedback(this.queryParams).then(response => {
        this.feedbackList = response.rows;
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
        recordId: null,
        feedbackType: null,
        workstationId: null,
        workstationCode: null,
        workstationName: null,
        workorderId: null,
        workorderCode: null,
        workorderName: null,
        taskId: null,
        taskCode: null,
        itemId: null,
        itemCode: null,
        itemName: null,
        specification: null,
        quantity: null,
        quantityFeedback: null,
        quantityQualified: null,
        quantityUnquanlified: null,
        userName: null,
        nickName: null,
        feedbackChannel: null,
        feedbackTime: null,
        recordUser: null,
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
      this.ids = selection.map(item => item.recordId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加生产报工记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const recordId = row.recordId || this.ids
      getFeedback(recordId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改生产报工记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.recordId != null) {
            updateFeedback(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeedback(this.form).then(response => {
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
      const recordIds = row.recordId || this.ids;
      this.$modal.confirm('是否确认删除生产报工记录编号为"' + recordIds + '"的数据项？').then(function() {
        return delFeedback(recordIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('pro/feedback/export', {
        ...this.queryParams
      }, `feedback_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
