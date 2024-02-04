<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--分类数据-->
      <el-col :span="6" :xs="24">
        <div class="head-container">
          <el-input v-model="treeName" placeholder="请输入项目名称" clearable size="small" prefix-icon="el-icon-search" style="margin-bottom: 20px" />
        </div>
        <div class="head-container">
          <el-tree :data="treeOptions" :props="defaultProps" :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" default-expand-all @node-click="handleNodeClick" />
        </div>
      </el-col>
      <!--物料数据-->
      <el-col :span="18" :xs="24">
        <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
          <el-form-item label="机柜名称" prop="name">
            <el-input v-model="queryParams.name" placeholder="请输入机柜名称" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="机柜编号" prop="code">
            <el-input v-model="queryParams.code" placeholder="请输入机柜编号" clearable @keyup.enter.native="handleQuery" />
          </el-form-item>
          <el-form-item label="工单类型" prop="type">
            <el-select v-model="queryParams.type" placeholder="请选择工单类型" clearable>
              <el-option v-for="dict in dict.type.workorder_type" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用" prop="enableFlag">
            <el-select v-model="queryParams.enableFlag" placeholder="请选择是否启用" clearable>
              <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['pm:workorder:add']">新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['pm:workorder:edit']">修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['pm:workorder:remove']">删除</el-button>
          </el-col>
          <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
        <el-table v-loading="loading" :data="workorderList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="机柜ID" align="center" prop="id" v-if="false" />
          <el-table-column label="子任务ID" align="center" prop="childtaskId" />
          <el-table-column label="机柜名称" align="center" prop="name" />
          <el-table-column label="机柜编号" align="center" prop="code" />
          <el-table-column label="工单类型" align="center" prop="type">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.workorder_type" :value="scope.row.type" />
            </template>
          </el-table-column>
          <el-table-column label="机柜附件" align="center" prop="file" v-if="false"/>
          <el-table-column label="是否启用" align="center" prop="enableFlag">
            <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_yes_no" :value="scope.row.enableFlag" />
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="remark" v-if="false"/>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['pm:workorder:edit']">修改</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['pm:workorder:remove']">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
      </el-col>
    </el-row>

    <!-- 添加或修改设计工单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="子任务ID" prop="childtaskId">
          <treeselect v-model="form.childtaskId" :options="treeOptions" :show-count="true" disabled v-if="optType=='view'" />
          <treeselect v-model="form.childtaskId" :options="treeOptions" :show-count="true" placeholder="请选择所属分类" v-else :disable-branch-nodes="true" />
        </el-form-item>
        <el-form-item label="机柜名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入机柜名称" />
        </el-form-item>
        <el-form-item label="工单类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择工单类型">
            <el-option v-for="dict in dict.type.workorder_type" :key="dict.value" :label="dict.label" :value="parseInt(dict.value)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机柜附件" v-if="false">
          <file-upload v-model="form.file" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.enableFlag">
            <el-radio v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <el-tabs type="border-card" v-if="form.id != null">        
        <el-tab-pane label="采购BOM">
          <Bomlist v-if="form.id !=null" :optType="optType" :workorderId="form.id"></Bomlist>
        </el-tab-pane>
        <el-tab-pane label="生产BOM">
          <file-upload v-model="form.bomProduce" />
        </el-tab-pane>
        <el-tab-pane label="施工BOM">
          <file-upload v-model="form.bomBuild" />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listWorkorder, getWorkorder, delWorkorder, addWorkorder, updateWorkorder } from "@/api/mes/pm/workorder";
import { treeselect } from "@/api/mes/pm/tree";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import Bomlist from "./bomlist";

export default {
  name: "Workorder",
  dicts: ['sys_yes_no', 'workorder_type'],
  components: { Treeselect, Bomlist },
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
      // 设计工单表格数据
      workorderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //弹框的操作类型 view add edit
      optType: undefined,
      // 项目名称
      treeName: undefined,
      // 项目树选项
      treeOptions: undefined,
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        treeId: null,
        name: null,
        code: null,
        type: null,
        enableFlag: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        childtaskId: [
          { required: true, message: "子任务ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "机柜名称不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "工单类型不能为空", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    // 根据名称筛选分类树
    treeName(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.getList();
    this.getTreeselect();
  },
  methods: {
    /** 查询设计工单列表 */
    getList() {
      this.loading = true;
      listWorkorder(this.queryParams).then(response => {
        this.workorderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 查询分类下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.treeOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.treeId = data.id;
      this.handleQuery();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        childtaskId: null,
        name: null,
        code: null,
        type: null,
        //file: null,
        bomPurchase: null,
        bomProduce: null,
        bomBuild: null,
        enableFlag: 'Y',
        remark: null,
        optType: undefined,
        attr1: null,
        attr2: null,
        attr3: null,
        attr4: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        deleteTime: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设计工单";
      this.optType = "add";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWorkorder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.optType = "edit";
        this.title = "修改设计工单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWorkorder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWorkorder(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除设计工单编号为"' + ids + '"的数据项？').then(function() {
        return delWorkorder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};

</script>
