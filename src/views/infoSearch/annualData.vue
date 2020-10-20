 <template>
  <el-table :data="jgTable" height="800">
    <el-table-column prop="time" label="年份"></el-table-column>
    <el-table-column prop="yield" label="产生量（万方）"></el-table-column>
    <el-table-column prop="variation" label="变化量（万方）"></el-table-column>
    <el-table-column prop="stock" label="存量（万方）"></el-table-column>
    <el-table-column prop="xg" label="修改状态"></el-table-column>
    
  </el-table>
</template>
<script>
import * as getAnnualdata from "../../api/company";
export default {
  data() {
    return {
      jgTable: [{
        time: "",
        yield: "",
        variation: "",
        stock: "",
        xg: "",
      }],
    };
  },
  methods: {
    getCompany01() {
      // 获取监管单位数据
      getAnnualdata.getAnnualdata().then((res) => {
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