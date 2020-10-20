 <template>
  <el-table :data="jgTable" height="800">
    <el-table-column align="center"  prop="time" label="时间"></el-table-column>
    <el-table-column align="center"  prop="Total" label="垃圾总存量"></el-table-column>
    <el-table-column align="center"  prop="type" label="上报类型"></el-table-column>
    <el-table-column align="center"  prop="mode" label="存放方式"></el-table-column>
    <el-table-column align="center"  prop="xg" label="修改状态"></el-table-column>
    
  </el-table>
</template>
<script>
import * as getStock from "../../api/company";
export default {
  data() {
    return {
      jgTable: [{
        time: "",
        Total: "",
        type: "",
        mode: "",
        xg: "", 
      }],
    };
  },
  methods: {
    getCompany01() {
      // 获取监管单位数据
      getStock.getStock().then((res) => {
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