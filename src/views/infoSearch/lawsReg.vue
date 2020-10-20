 <template>
  <el-table :data="jgTable">
    <el-table-column prop="time" label="上报时间"></el-table-column>
    <el-table-column prop="num" label="编号"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="zd" label="制度类型"></el-table-column>
    <el-table-column prop="yesorno" label="是否公开"></el-table-column>
    <el-table-column prop="xg" label="修改状态"></el-table-column>

  </el-table>
</template>
<script>
import * as getCompanyAPI from "../../api/company";
export default {
  data() {
    return {
      jgTable: [{
        time: "",
        num: "",
        title: "",
        zd: "",
        yesorno: "",
        xg: "",
      }],
    };
  },
  methods: {
    getCompany01() {
      // 获取监管单位数据
      getCompanyAPI.getCompany().then((res) => {
          console.log(res);
          this.jgTable = res.data;
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCompany01();
    // jgTable = api.data
  },
};
</script>