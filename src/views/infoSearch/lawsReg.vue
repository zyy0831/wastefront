<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="序号" width="150"></el-table-column>
      <el-table-column prop="name" label="上报月份" width="120"></el-table-column>
           <el-table-column prop="gcity" label="上报城市" width="120"></el-table-column>
      <el-table-column prop="province" label="编号" width="120"></el-table-column>
      <el-table-column prop="city" label="标题" width="120"></el-table-column>
      <el-table-column prop="addres" label="制度类型" width="300"></el-table-column>
      <el-table-column prop="yn" label="是否公开" width="120"></el-table-column>
      <el-table-column prop="xg" label="修改状态" width="120"></el-table-column>
       <el-table-column fixed="right" label="操作" width="100">
        
        <template>
          <el-button type="text" @click="dialogVisible = true">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示  " :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-table :data="tableData" border styles="width: 100%">
        <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <template>
            <el-button type="text" @click="dialogVisible = true">查看</el-button>
          </template>
       
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "1",
          name: "2020-07",
          province: "上海",
          city: "普陀区",
          addres: "上海市普陀区金沙江路 1518 弄",
          zip: "200333",
           gcity:"洛阳市",
          yn:"可公开",
          xg:" "

        },
        {
          date: "2",
          name: "2020-07",
          province: "上海",
          city: "普陀区",
          addres: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
           gcity:"洛阳市",
          yn:"可公开",
          xg:" "
        },
        {
          date: "3",
          name: "2020-07",
          province: "上海",
          city: "普陀区",
          addres: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
         gcity:"洛阳市",
          yn:"可公开",
          xg:" "
        },
        {
          date: "4",
          name: "2020-07",
          province: "上海",
          city: "普陀区",
          addres: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
         gcity:"洛阳市",
          yn:"可公开",
          xg:" "
        },
      ],
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
    //   console.log(123);
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>

<style scoped>