<template>
  <!-- 一阶段 -->
  <div class="report-check">
    <el-card class="box-card">
      <div slot="header">
        <span style="color:rgb(64,158,255);">{{ info.name }}的报告册</span>
      </div>
      <div class="clearfix">
        <div class="text item twoItem">
          <span class="header-title">学院</span>
          <span class="header-content">{{ info.college }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">专业</span>
          <span class="header-content">{{ info.major }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学号</span>
          <span class="header-content">{{ info.stuNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">学院指导教师工号</span>
          <span class="header-content">{{ info.teacherNo }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习单位</span>
          <span class="header-content">{{ info.corpName }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习岗位</span>
          <span class="header-content">{{ info.corpPosition }}</span>
        </div>
        <div class="text item twoItem">
          <span class="header-title">实习日期</span>
          <span class="header-content"
            >{{ res.gmtStart }} 至 {{ res.gmtEnd }}</span
          >
        </div>
      </div>

      <div class="state-title">第一阶段</div>
      <form-item
        title="第一阶段实习总结"
        :content="res.stage1Summary"
      ></form-item>
      <form-item
        title="第一阶段实习指导方式"
        :content="res.stage1GuideWay"
        :time="res.stage1GuideDate"
      ></form-item>
      <el-form
        :model="res"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        :disabled="disabled"
      >
        <el-form-item label="教师评语" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.stage1Comment"
          ></el-input>
          <limit :maxLength="500" :testString="res.stage1Comment"></limit>
        </el-form-item>
        <div class="block">
          <el-date-picker
            v-model="res.stage1Date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="item-title">成绩评定</div>
        <el-select
          v-model="res.stage1Grade"
          placeholder="请选择"
          :disabled="disabled"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form>
      <!-- 二阶段 -->
      <div class="state-title">第二阶段</div>
      <form-item
        title="第二阶段实习总结"
        :content="res.stage2Summary"
      ></form-item>
      <form-item
        title="第二阶段实习指导方式"
        :content="res.stage2GuideWay"
        :time="res.stage2GuideDate"
      ></form-item>
      <el-form
        :model="res"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        :disabled="disabled"
      >
        <el-form-item label="教师评语" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.stage2Comment"
          ></el-input>
          <limit :maxLength="500" :testString="res.stage2Comment"></limit>
        </el-form-item>
        <div class="block">
          <el-date-picker
            v-model="res.stage2Date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <!-- <el-form-item label="成绩评定" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.stage2Grade"
          ></el-input>
        </el-form-item> -->
        <div class="item-title">成绩评定</div>
        <el-form-item>
          <el-select v-model="res.stage2Grade" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="block">
          <el-date-picker
            v-model="res.tage2GradeDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </el-form>

      <div class="state-title">总评</div>
      <el-form
        :model="res"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        label-position="top"
        :disabled="disabled"
      >
        <el-form-item label="评语" prop="res">
          <el-input
            type="textarea"
            :rows="5"
            v-model="res.totalGrade"
          ></el-input>
        </el-form-item>

        <div class="item-title">成绩</div>
        <el-form-item>
          <el-select v-model="res.totalScore" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitReport">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import formItem from "../../components/content/form-block";
import limit from "../../components/content/limit-number";
import { Obj2html } from "../../command/utils";
import {
  getStudentReport,
  getStudentInfoById,
  completeReport
} from "../../network/index";
export default {
  components: {
    formItem,
    limit
  },
  data() {
    return {
      disabled: true,
      info: {
        name: "加载中",
        college: "加载中",
        major: "加载中",
        stuNo: "加载中",
        teacherNo: "加载中",
        corpName: "加载中",
        corpPosition: "加载中"
      },
      res: {
        gmtStart: "加载中",
        gmtEnd: "加载中",
        stage1Summary: "加载中",
        stage1GuideWay: "加载中",
        stage1GuideDate: "加载中",
        stage1Comment: "",
        stage1Date: "加载中",
        stage1GradeDate: "",
        stage1Grade: "",
        stage2Summary: "加载中",
        stage2GuideWay: "加载中",
        stage2Comment: "",
        // stage1GradeDate 2.与stage1Dtae  2相同
        stage2GuideDate: "加载中",
        stage2Date: "加载中",
        stage2GradeDate: "",
        stage2Grade: "",
        totalGrade: "",
        totalScore: ""
      },
      rules: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      options: [
        {
          value: "优秀",
          label: "优秀"
        },
        {
          value: "良好",
          label: "良好"
        },
        {
          value: "中等",
          label: "中等"
        },
        {
          value: "及格",
          label: "及格"
        },
        {
          value: "不及格",
          label: "不及格"
        }
      ]
    };
  },
  methods: {
    submitReport() {
      this.$confirm("确认提交？", "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "info"
      })
        .then(() => {
          // console.log(this.res);]
          if (this.res.stage1Comment.length < 60) {
            this.$alert("一阶段评语不能低于60字", "提交失败", {
              confirmButtonText: "确定"
            });
            return false;
          }
          if (
            this.res.stage2Comment.length != 0 &&
            this.res.stage2Comment.length < 60
          ) {
            this.$alert("二阶段评语不能低于60字", "提交失败", {
              confirmButtonText: "确定"
            });
            return false;
          }
          if (
            this.res.totalGrade.length != 0 &&
            this.res.totalGrade.length < 60
          ) {
            this.$alert("总评不能低于60字", "提交失败", {
              confirmButtonText: "确定"
            });
          }
          let obj = {};
          obj.id = this.res.id;
          obj.stuNo = this.res.stuNo;
          if (this.res.stage1Comment) {
            obj.stage1Comment = this.res.stage1Comment;
          }
          if (this.res.stage1Grade) {
            obj.stage1Grade = this.res.stage1Grade;
          }
          if (this.res.stage2Comment) {
            obj.stage2Comment = this.res.stage2Comment;
          }
          if (this.res.stage2Grade) {
            obj.stage2Grade = this.res.stage2Grade;
          }
          if (this.res.totalGrade) {
            obj.totalGrade = this.res.totalGrade;
          }
          if (this.res.totalScore) {
            obj.totalScore = this.res.totalScore;
          }

          if (this.res.stage1Date) {
            if (typeof this.res.stage1Date == "string") {
              obj.stage1Date = this.res.stage1Date;
            } else {
              obj.stage1Date =
                this.res.stage1Date.getFullYear() +
                "-" +
                (this.res.stage1Date.getMonth() + 1) +
                "-" +
                this.res.stage1Date.getDate();
            }
            obj.stage1GradeDate = obj.stage1Date;
          }
          if (this.res.stage2Date) {
            if (typeof this.res.stage2Date == "string") {
              obj.stage2Date = this.res.stage2Date;
            } else {
              obj.stage2Date =
                this.res.stage2Date.getFullYear() +
                "-" +
                (this.res.stage2Date.getMonth() + 1) +
                "-" +
                this.res.stage2Date.getDate();
            }
            obj.stage2GradeDate = obj.stage2Date;
          }
          // console.log(obj);
          completeReport(obj).then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.$message({
                type: "success",
                message: "提交成功!"
              });
              this.$router.back();
            } else {
              this.$message({
                type: "error",
                message: "提交失败：" + res.data.message
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  },
  mounted() {
    let stuNo = this.$route.params.stuNo;
    getStudentInfoById(stuNo).then(res => {
      // console.log(res);
      if (res.data.status == 1) {
        this.info = res.data.data;
        getStudentReport(stuNo).then(resp => {
          // console.log(resp);
          if (resp.data.status == 1) {
            this.res = Obj2html(resp.data.data);
            if (this.res.stage1Comment == null) {
              this.res.stage1Comment = "";
            }
            if (this.res.stage2Comment == null) {
              this.res.stage2Comment = "";
            }
            if (!this.res.stage1Summary) {
              this.res.stage1Summary = "暂无";
            }
            if (!this.res.stage1GuideWay) {
              this.res.stage1GuideWay = "暂无";
            }
            if (!this.res.stage2Summary) {
              this.res.stage2Summary = "暂无";
            }
            if (!this.res.stage2GuideWay) {
              this.res.stage2GuideWay = "暂无";
            }
            this.disabled = !this.$store.state.isReportStage3Open;
            if (this.disabled) {
              this.$alert("未到评价时间", "提示", {
                confirmButtonText: "确定"
              });
            }
          }
        });
      }
    });
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.twoItem {
  width: 50%;
  float: left;
}
.box-card {
  width: 80%;
  transition: none;
}
.header-title,
.header-content {
  display: inline-block;
}
.header-title {
  color: #378f8c;
  margin-right: 8px;
}
.header-content {
  width: 350px;
}
.report-check {
  display: flex;
  justify-content: center;
}
.summary {
  margin-left: 20px;
  width: 456px;
}
.Divider {
  padding: 10px 0;
  color: rgb(64, 158, 255);
  /* border-bottom: 1px solid #ddd; */
}
.state-title {
  padding: 20px 0;
  font-weight: 700;
  font-size: 20px;
}
.item-title {
  line-height: 40px;
}
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>
