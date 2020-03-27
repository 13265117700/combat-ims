<template>
  <div class="main-container">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        label="index"
        type="index"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="created_time"
        label="创建日期"
        width="300">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="创建人"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import indexModel from '@/models/index'
export default {
  data () {
    return {
      tableData: [],
      total: null,
      totalPage: null,
      pageSizes: [10, 20, 30, 40],
      pageSize: 10,
      currentPage: 1
    }
  },
  created() {
    indexModel.aritcleIndex().then(res => {
      let data = res.data.data
      this.tableData = data.index
      this.total = data.total[0].total
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
      this.$router.push({path:'/index/aritcle/' + row.id});
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      val = val || 10
      this.pageSize = val
      this.totalPage = Math.ceil(this.total / this.pageSize)
      let currentPage = this.currentPage
      let params = { currentPage, val }
      indexModel.aritcleIndex(params).then(res => {
        let data = res.data.data
        console.log(data)
        this.tableData = data.index
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let currentPage = this.currentPage = val || 1
      console.log(currentPage)
      let  params = { currentPage }
      indexModel.aritcleIndex(params).then(res => {
        let data = res.data.data
        this.tableData = data.index
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-container{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
