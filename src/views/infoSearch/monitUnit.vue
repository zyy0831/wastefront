 <template>
  <el-table :data="jgTable" height="800">
    <el-table-column prop="member" label="成员"></el-table-column>
    <el-table-column prop="tele" label="电话"></el-table-column>
    <el-table-column prop="Company" label="单位"></el-table-column>
    <el-table-column prop="post" label="负责人"></el-table-column>
  </el-table>
</template>
<script>
import * as getCompanyAPI from "../../api/company";
export default {
  data() {
    return {
      jgTable: [{
        member: "",
        tele: "",
        Company: "",
        post: "",
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