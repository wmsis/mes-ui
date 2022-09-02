<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="条码类型" prop="barcodeType">
        <el-select v-model="queryParams.barcodeType" placeholder="请选择条码类型">
          <el-option
            v-for="dict in dict.type.mes_barcode_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务编码" prop="bussinessCode">
        <el-input
          v-model="queryParams.bussinessCode"
          placeholder="请输入业务编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务名称" prop="bussinessName">
        <el-input
          v-model="queryParams.bussinessName"
          placeholder="请输入业务名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="barcodeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />     
      <el-table-column label="条码" align="center">
        <template slot-scope="scope">
            <el-image class="barcodeClass" :src="scope.row.url"></el-image>
        </template>
      </el-table-column> 
      <el-table-column label="条码格式" align="center" prop="barcodeFormart">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_barcode_formart" :value="scope.row.barcodeFormart"/>
        </template>
      </el-table-column>          
      <el-table-column label="条码类型" align="center" prop="barcodeType">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.mes_barcode_type" :value="scope.row.barcodeType"/>
        </template>
      </el-table-column>
      <el-table-column label="条码内容" align="center" prop="barcodeContent" />
      <el-table-column label="业务编码" align="center" prop="bussinessCode" />
      <el-table-column label="业务名称" align="center" prop="bussinessName" />
      <el-table-column label="是否生效" align="center" prop="enableFlag" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['mes:wm:barcode:edit']"
          >查看</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['mes:wm:barcode:remove']"
          >打印</el-button>
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

    <!-- 添加或修改条码清单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="条码格式" prop="barcodeFormart">
          <el-input v-model="form.barcodeFormart" placeholder="请输入条码格式" />
        </el-form-item>
        <el-form-item label="条码内容">
          <editor v-model="form.barcodeContent" :min-height="192"/>
        </el-form-item>
        <el-form-item lable="条码类型">
          <el-select v-model="form.barcodeType" placeholder="请选择条码类型">
            <el-option
              v-for="dict in dict.type.mes_barcode_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="条码地址" prop="url">
          <el-input v-model="form.barcodeUrl" placeholder="请输入条码地址" />
        </el-form-item>
        <el-form-item label="是否生效" prop="enableFlag">
          <el-input v-model="form.enableFlag" placeholder="请输入是否生效" />
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
import { listBarcode, getBarcode, delBarcode, addBarcode, updateBarcode } from "@/api/mes/wm/barcode";

export default {
  name: "Barcode",
  dicts: ['mes_barcode_type'],
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
      // 条码清单表格数据
      barcodeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        barcodeFormart: null,
        barcodeType: null,
        barcodeContent: null,
        bussinessId: null,
        bussinessCode: null,
        bussinessName: null,
        barcodeUrl: null,
        enableFlag: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        barcodeFormart: [
          { required: true, message: "条码格式不能为空", trigger: "blur" }
        ],
        barcodeType: [
          { required: true, message: "条码类型不能为空", trigger: "change" }
        ],
        barcodeContent: [
          { required: true, message: "产品物料ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询条码清单列表 */
    getList() {
      this.loading = true;
      listBarcode(this.queryParams).then(response => {
        this.barcodeList = response.rows;
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
        barcodeId: null,
        barcodeFormart: null,
        barcodeType: null,
        barcodeContent: null,
        bussinessId: null,
        bussinessCode: null,
        bussinessName: null,
        barcodeUrl: null,
        enableFlag: null,
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
      this.ids = selection.map(item => item.barcodeId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加条码清单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const barcodeId = row.barcodeId || this.ids
      getBarcode(barcodeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改条码清单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.barcodeId != null) {
            updateBarcode(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBarcode(this.form).then(response => {
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
      const barcodeIds = row.barcodeId || this.ids;
      this.$modal.confirm('是否确认删除条码清单编号为"' + barcodeIds + '"的数据项？').then(function() {
        return delBarcode(barcodeIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('wm/barcode/export', {
        ...this.queryParams
      }, `barcode_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
  .barcodeClass {
    width: 300px;
    height: 200px;
  }

</style>
