<template>
  <div ref="gantt"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt';
export default {
  name: 'GanttChar',
  data() {
    return {
      newObj: {}
    }
  },
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    },
    optType: {
      type: String,
      default (){
        return 'view'
      }
    },
    ids: {
      type: Array,
      default (){
        return []
      }
    }
  },

  created() {
  },

  mounted: function () {
    // 初始化甘特图配置
    this.initConfig();
    gantt.plugins({
      marker: true
    });
    // 甘特图初始化和导入数据
    gantt.init(this.$refs.gantt);
    gantt.parse(this.tasks);
  },

  methods: {
    // 初始化甘特图数据
    initData() {

    },
    reload() {
      gantt.clearAll();
      this.addTodayLine();
      gantt.parse(this.$props.tasks);
      gantt.render();
    },
    addTodayLine() {
      // 时间线
      var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "今天",
        title: "今天: " + date_to_str(today)
      });
    },
    // 初始化甘特图配置
    initConfig() {
      // 1 基础配置
      // 1.1 甘特图是否只读
      if(this.optType =='view'){
        gantt.config.readonly = true;
      }else{
        gantt.config.readonly = false;
      }
      
      // 1.2 表格列设置
      gantt.config.duration_unit="day";//设置持续时间单位
      gantt.config.duration_step=1;     //设置与“duration”数据属性的一个单位对应的“gantt.config.duration_unit”单位数
      gantt.config.grid_width=520;
      gantt.config.columns = [
        {name:"text", label:"任务名", tree:true, width:'200' },
        {name:"workstation",label:"工作站",align:"center",width:'*'},
        {name:"process",label:"工序",align:"center",width:'*'},        
        {name:"start_date", label:"开始时间", align:"center", width:'*' },
        {name:"end_date", label:"结束时间", align:"center" , width:'*'},
      ];
      // 1.3 设置中文
      gantt.i18n.setLocale("cn");
      // 1.4 鼠标悬浮框
      gantt.plugins({tooltip: true});// 启用tooltip悬浮框
      gantt.templates.tooltip_text = function(start, end, task) {
        if(task.type=='project'){
          return "<b style='text-align:left;'>生产工单:</b> " + task.text +"    <span style='text-align:left;'>" +" 完成比例："+ Math.round(task.progress * 100) + "% </span>";
        }else{
          return "<b style='text-align:left;'>生产任务:</b> "+task.process+" "+ task.text +"    <span style='text-align:left;'>" +" 完成比例："+ Math.round(task.progress * 100) + "% </span>";
        }
      };

      // 1.5 初始化的时候就展开树结构
      gantt.config.open_tree_initially = true;
      // 1.6 显示到任务上的文本
      gantt.templates.task_text = function (start, end, task) {
        if(task.type=='project'){
          return "<b style='text-align:left;'>生产工单:</b> " + task.text +"    <span style='text-align:left;'>" +" 完成比例："+ Math.round(task.progress * 100) + "% </span>";
        }else{
          return "<b style='text-align:left;'>生产任务:</b> "+task.process+" "+ task.text +"    <span style='text-align:left;'>" +" 完成比例："+ Math.round(task.progress * 100) + "% </span>";
        }
        
      };
      // 1.7 显示单元格
      gantt.config.show_task_cells = true;

      // 2 时间配置
      var weekScaleTemplate = function (date) {
        var dateToStr = gantt.date.date_to_str("%M %d");
        var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
        return dateToStr(date) + " - " + dateToStr(endDate);
      };

      var dayTemplate = function(date){
        var dateToStr = gantt.date.date_to_str("%M %d");
        var weekDay = gantt.date.date_to_str("%D");
        return dateToStr(date) + "(" + weekDay(date) + ")";
      };

      var daysStyle = function(date){
          if(date.getDay() === 0 || date.getDay() === 6){
            return "weekend";
          }
          return "";
      };

      gantt.config.scales =[
        {unit:"week", step:1,format: weekScaleTemplate},          //星期刻度样式
        {unit:"day", step:1,format: dayTemplate,css: daysStyle},  //天刻度样式
        {unit:"hour", step:8,format: "%H:%i"}, //这里的step要根据当前的班次设置来。如果是三班倒则是8，如果是两班倒则是12。
      ]
      
      gantt.config.scale_height = 50; //甘特图表头高度

      // 2.4 定义从后端获取或发送到后端的日期数据解析格式
      gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

      

    }
  }
}
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  /* 任务名前的logo */
  .gantt_tree_icon.gantt_file, .gantt_tree_icon.gantt_folder_open, .gantt_tree_icon.gantt_folder_closed{width: 10px; background-image: none;}
  /* 任务线 */
  .gantt_task_line{
    /* height: 16px !important;
    line-height: 16px !important;
    margin-top: 8px;
    border: none !important;
    border-radius: 8px; */
  }
  .gantt_task_line.gantt_milestone{border-radius: 0;}
  /* 里程碑 */
  .gantt_task_line.gantt_milestone{
    width: 12px !important;
    height: 16px !important;
    border: none !important;
    background-color: inherit !important;
    background-size: cover;
  }
  /* 里程碑icon */
  .gantt_task_line.gantt_milestone .gantt_task_content{
    width: 12px;
    height: 16px;
    margin-left: 40px;
    transform: rotate(0deg) !important;
    background-image: url('../../../../assets/logo/logo.png') !important;
  }
  /* 左侧悬浮单元格背景色 */
  .gantt_grid_data .gantt_row.odd:hover, .gantt_grid_data .gantt_row:hover{background-color: #f3f1fe !important;}
  /* 选中一行背景色 */
  .gantt_grid_data .gantt_row.gantt_selected, .gantt_grid_data .gantt_row.odd.gantt_selected, .gantt_task_row.gantt_selected{background-color: #f3f1fe !important;}
  /* 选中一行每个单元格右border颜色 */
  .gantt_task_row.gantt_selected .gantt_task_cell{border-right-color: #f3f1fe !important;}

  /* 标记线 */
  .gantt_marker{background-color: #f4ae05;opacity: .8;}


  /*滚动条整体样式*/
  .gantt-wrapper ::-webkit-scrollbar {
    width: 14px;  /*宽分别对应竖滚动条的尺寸*/
    height: 6px;  /*高分别对应横滚动条的尺寸*/
  }

  /*滚动条里面轨道*/
  .gantt-wrapper ::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,.2);
    border-radius: 5px;
  }
  /*滚动条里面拖动条*/
  .gantt-wrapper ::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,.3);
    border-radius: 5px;
  }
  .gantt-wrapper ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0,0,0,.5);
    border-radius: 5px;
  }

  /* 展开收起背景图片 */
  .gantt_tree_icon.gantt_close, .gantt_tree_icon.gantt_open{
    background-image: none !important;
    position: relative;
  }
  /* 收起小三角 */
  .gantt_tree_icon.gantt_close::after{
    position: absolute;
    content: '';
    top: 14px;
    left: 10px;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    border-top: 6px solid #999999;

  }
  /* 展开小三角 */
  .gantt_tree_icon.gantt_open::after{
    position: absolute;
    content: '';
    top: 12px;
    left: 12px;
    border-bottom: 6px solid transparent;
    border-top: 6px solid transparent;
    border-left: 6px solid #999999;
  }
  /* 下方滚动条宽度 */
  .gantt_layout_cell .gantt_hor_scroll{
    width: calc(100% - 199px) !important;
    left: 199px;
  }

  .scaleStyle{
    height: 20px;
  }
  /* 周末背景颜色 */
  .weekend{
    background: rgb(189, 185, 186) !important;
    width: 30s
  }  
</style>