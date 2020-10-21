 <template>
  <el-table :data="jgTable" height="620">
    <el-table-column align="center"  prop="time" label="上报时间"></el-table-column>
    <el-table-column align="center"  prop="num" label="编号" width="100"></el-table-column>
    <el-table-column align="center"  prop="tile" label="标题" width="400"></el-table-column>
    <el-table-column align="center"  prop="zd" label="制度类型"></el-table-column>
    <el-table-column align="center"  prop="yesorno" label="是否公开"></el-table-column>
    <el-table-column align="center"  prop="xg" label="修改状态"></el-table-column>

  </el-table>
</template>
<script>
import * as getlawyer from "../../api/company";
export default {
  data() {
    return {
      jgTable: [{
        time: "",
        num: "",
        tile: "",
        zd: "",
        yesorno: "",
        xg: "",
      }],
    };
  },
  methods: {
    getCompany01() {
      // 获取监管单位数据
      getlawyer.getlawyer().then((res) => {
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