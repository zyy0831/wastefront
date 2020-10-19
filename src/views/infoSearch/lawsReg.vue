<template>
  <div>
    <!-- <img src="http://localhost:3000/static/images/test.jpg"> -->
    <img :src=imgSrc>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column  v-model="table.city" label="上报城市" width="150"></el-table-column>
      <el-table-column v-model="table.num" label="序号" width="120"></el-table-column>
      <el-table-column v-model="table.tile" label="标题" width="120"></el-table-column>
      <el-table-column v-model="table.type" label="类型" width="120"></el-table-column>
      <el-table-column v-model="table.open" label="状态" width="120"></el-table-column>
      <el-table-column v-model="table.xg" label="是否修改" width="300"></el-table-column>

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
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button type="text" @click="downFile">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import * as getPathAPI from '../../api/getPath'
  import * as getlaywers from '../../api/laywers'
  export default {
    data() {
      return {
        table:{ 
          city:"",
          num:"",
          tile:"",
          type:"",
          open:"",
          xg:"",
        },
        dialogVisible: false,
        serverPath:"http://localhost:3000/static",
        imgSrc:'',
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
      downFile() {
        const servPath = 'http://10.100.16.139:3000/download/downFile/'
        let id = '1';
        window.location.href = servPath + id;
      },
            getlaywers() { // 获取审核状态下拉框值
        laywersAPI.getlaywers().then(response => {
          this.table = response.data[0];
        }).catch(err => {
         console.log(err);
        })
      },
      getImgPath(id){
        getPathAPI.getImgPath(id).then(res=>{
          this.imgSrc = this.serverPath + res.data
        }).catch(err=>{
          console.log(err);
        })
      },
    //    getInfo(city) {
    //   this.curCity.city = city;
    //   cityInfoAPI.getCityInfo(this.curCity).then((res) => {
    //     this.form = res.data[0];
    //     console.log(this.form);
    //   });
    // },

    mounted(){
      this.getImgPath(1)
    }
  }
  }
</script>

<style scoped></style>