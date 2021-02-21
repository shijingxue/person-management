<template>
  <div class="identifier-manage">
    <!--菜品种类-->
    <div>
      <el-button
        class="add-identifier"
        type="primary"
        size="small"
        @click="addIdentifier">
        添加
      </el-button>
      <!-- <el-button
        class="delete-Identifier"
        size="small"
        @click="deleteIdentifier"
        :disabled="multipleSelectionIdentifier.length === 0">
        批量删除
      </el-button> -->
    </div>

    <!--菜品种类列表-->
    <el-table
      class="identifier-table"
      :stripe="true"
      :data="identifierList"
      :highlight-current-row="true"
      empty-text="暂无菜品种类"
      header-row-class-name="table-header"
      style="width: 100%"
      >
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center">
      </el-table-column>
      <el-table-column
        label="菜品种类内容"
        prop="foodTypeName">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <div class="btn-ope">
            <span @click="editIdentifier(scope.row)">编辑</span>
            <span class="line">|</span>
            <span @click="deleteOneIdentifier(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--菜品种类分页-->
    <!-- <el-pagination
      layout="prev, pager, next"
      :page-size="identifierEachPage"
      :total="identifierTotal"
      :current-page.sync="identifierPage"
      @current-change="getIdentifierList">
    </el-pagination> -->

    <!--添加菜品种类对话框-->
    <el-dialog
      top="30vh"
      width="30%"
      title="添加菜品种类"
      append-to-body
      custom-class="identifier-add-dialog"
      :before-close="cancelAddIdentifier"
      :visible.sync="addIdentifierDialogVisible">

      <!--添加菜品种类输入框组-->
      <div>
        <!--添加菜品种类输入框-->
        <div>
          <el-input
            v-model="addIdentifierValue"
            class="identifier-input"
            size="medium"
            clearable
            placeholder="输入菜品种类">
          </el-input>
          <!--<i class="add-identifier-input el-icon-circle-plus-outline"></i>-->
          <!--<i class="delete-identifier-input el-icon-delete"></i>-->
        </div>
      </div>

      <!--对话框footer-->
      <div slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          @click="cancelAddIdentifier">
          取消
        </el-button>
        <el-button
          class="commit"
          type="primary"
          @click="commitAddIdentifier">
          提交
        </el-button>
      </div>
    </el-dialog>

    <!--编辑菜品种类对话框-->
    <el-dialog
      top="30vh"
      width="530px"
      append-to-body
      custom-class="identifier-edit-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="cancelEditIdentifier"
      :visible.sync="editIdentifierDialogVisible">
      <!--对话框标题-->
      <span slot="title" class="dialog-title">编辑菜品种类</span>

      <!--编辑菜品种类输入框-->
      <el-input
        v-model="willEditIdentifier.foodTypeName"
        size="medium"
        clearable>
      </el-input>

      <!--对话框footer-->
      <div slot="footer" class="dialog-footer">
        <el-button
          class="cancel"
          @click="cancelEditIdentifier">
          取消
        </el-button>
        <el-button
          class="commit"
          type="primary"
          @click="commitEditIdentifier">
          提交
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/api'
  import httpUtil from '@/utils/http-util'

  export default {
    name: 'IdentifierManage',

    data() {
      return {
        identifierList: [], // 菜品种类列表（分页）
        identifierLoading: false, // 菜品种类表格进度条
        addIdentifierDialogVisible: false, // 添加菜品种类对话框显示与否
        editIdentifierDialogVisible: false, // 编辑菜品种类对话框显示与否
        addIdentifierValue: '', // 要添加的菜品种类
        willEditIdentifier: {}, // 要编辑的菜品种类
        editProjectIdentifierDialogVisible: false // 编辑项目菜品种类对话框显示与否
      }
    },
    created() {
      // 获取第一页项目菜品种类
      this.getIdentifierList()
    },
    methods: {

      // 获取菜品种类列表
      getIdentifierList() {
        // 清空已选择的菜品种类

        // 显示进度条
        // this.identifierLoading = true;

        // 分页获取项目菜品种类
        httpUtil.post(api.SELECTALLFOODTYPE, {
          foodTypeName: ''
        }, (response) => {
          // console.log(response)
          this.identifierList = response.data
        }, (error) => {
          const message = error.response.data.message
        })
      },

      // 添加项目菜品种类
      addIdentifier() {
        this.addIdentifierDialogVisible = true
      },

      // 单选菜品种类符
      selectOneByOneIdentifier(selection) {
        this.multipleSelectionIdentifier = selection
      },

      // 全选菜品种类符
      selectAllIdentifier(selection) {
        this.multipleSelectionIdentifier = selection
      },

      // 取消添加项目菜品种类符
      cancelAddIdentifier() {
        // 用户没有输入项目菜品种类
        if (this.addIdentifierValue === '') {
          this.addIdentifierDialogVisible = false
        // eslint-disable-next-line brace-style
        }
        // 用户输入了新的项目菜品种类
        else {
          this.$confirm('此操作将删除输入的项目菜品种类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'confirm-button',
            center: true
          }).then(() => {
            // 隐藏添加项目菜品种类对话框
            this.addIdentifierDialogVisible = false
            // 清空用户输入的项目菜品种类
            this.addIdentifierValue = ''
          }).catch(() => {

          })
        }
      },

      // 提交添加项目菜品种类
      commitAddIdentifier() {
        // 用户没有输入项目菜品种类
        if (this.addIdentifierValue === '') {
          this.$message({
            message: '菜品种类不能为空！',
            type: 'error',
            duration: 3000,
            showClose: false,
            center: false,
            offset: 20
          })
        // eslint-disable-next-line brace-style
        }
        // 用户输入的新的项目菜品种类
        else {
          // 新的项目菜品种类提交服务器
          httpUtil.post(api.ADDFOODTYPE, {
            foodTypeName: this.addIdentifierValue
          }, res => {
            // console.log(res)
            // 如果添加菜品种类成功
            if (res.status === 200) {
              // 隐藏对话框并提示用户添加成功
              this.addIdentifierDialogVisible = false

              this.$message({
                message: '添加菜品种类成功',
                type: 'success',
                duration: 3000,
                showClose: false,
                center: false,
                offset: 20
              })

              // 清空用户输入的菜品种类内容
              this.addIdentifierValue = ''

              // 重新请求菜品种类列表
              this.getIdentifierList()
            }
          }, error => {
            const message = error.response.data.message

            // 用户提示
            this.$message({
              message,
              type: 'error',
              duration: 3000,
              showClose: false,
              center: false,
              offset: 20
            })
          })
        }
      },

      // 编辑菜品种类按钮点击
      editIdentifier(identifier) {
        console.log(identifier)
        this.editIdentifierDialogVisible = true

        // 即将编辑的菜品种类对象
        this.willEditIdentifier = { ...identifier }
      },

      // 取消编辑项目菜品种类
      cancelEditIdentifier() {
        // 验证用户有没有编写菜品种类
        const changeTag = this.identifierList.find(item => {
          return item.foodTypeId === this.willEditIdentifier.foodTypeId
        }).tag === this.willEditIdentifier.foodTypeName

        // 如果没有编辑
        if (changeTag) {
          // 关闭编辑对话框
          this.editIdentifierDialogVisible = false
        // eslint-disable-next-line brace-style
        }
        // 编辑了菜品种类
        else {
          this.$confirm('此操作将放弃修改此菜品种类，是否继续？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            confirmButtonClass: 'confirm-button',
            center: true
          }).then(() => {
            this.editIdentifierDialogVisible = false
          }).catch(() => {

          })
        }
      },

      // 提交编辑项目菜品种类
      commitEditIdentifier() {
        // 验证用户有没有编写菜品种类
        const changeTag = this.identifierList.find(item => {
          return item.foodTypeId === this.willEditIdentifier.foodTypeId
        }).foodTypeName === this.willEditIdentifier.foodTypeName

        // 如果没有编辑
        if (changeTag) {
          // 关闭编辑对话框
          this.editIdentifierDialogVisible = false
        // eslint-disable-next-line brace-style
        }
        // 如果内容为空
        else if (this.willEditIdentifier.foodTypeName === '') {
          this.$message({
            message: '菜品种类内容不能为空',
            type: 'error',
            duration: 3000,
            showClose: false,
            center: false,
            offset: 20
          })
        // eslint-disable-next-line brace-style
        }
        // 提交新菜品种类
        else {
          httpUtil.post(api.EDITFOODTYPE, {
            foodTypeId: this.willEditIdentifier.foodTypeId,
            foodTypeName: this.willEditIdentifier.foodTypeName
          }, res => {
            // 如果编辑菜品种类成功
            if (res.status === 200) {
              // 提示用户编辑成功

              this.$message({
                message: '编辑菜品种类成功',
                type: 'success',
                duration: 3000,
                showClose: false,
                center: false,
                offset: 20
              })

              // 实时更新菜品种类内容
              const newIdentifier = this.identifierList.find(item => {
                return item.foodTypeId === this.willEditIdentifier.foodTypeId
              })

              // 更新菜品种类tag
              this.$set(newIdentifier, 'tag', this.willEditIdentifier.foodTypeName)

              // 隐藏对话框
              this.editIdentifierDialogVisible = false

              // 刷新项目列表更新项目菜品种类
              this.$emit('refresh')
            }
          }, error => {
            // 隐藏对话框
            this.editIdentifierDialogVisible = false

            const message = error.response.data.message

            // 用户提示
            this.$message({
              message,
              type: 'error',
              duration: 3000,
              showClose: false,
              center: false,
              offset: 20
            })
          })
        }
      },

      // 删除单个项目菜品种类
      deleteOneIdentifier(row) {
        this.$confirm('此操作将同时删除项目中的菜品种类，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          confirmButtonClass: 'confirm-button',
          center: true
        }).then(() => {
          // 发送请求删除该菜品种类
          httpUtil.post(api.DELETEFOODTYPE, {
            foodTypeId: row.foodTypeId
          }, res => {
            console.log(res)
            const data = res.status
            // 删除菜品种类成功
            if (data === 200) {
              // 提示用户菜品种类删除成功
              this.$message({
                message: '菜品种类删除成功！',
                type: 'success',
                duration: 3000,
                showClose: false,
                center: false,
                offset: 20
              })
            }

            // 重新请求菜品种类列表
            this.getIdentifierList()

            // 刷新项目列表更新项目菜品种类
            this.$emit('refresh')
          })
        }).catch(() => {
          // const message = error.response.data.message
        })
      }

    }
  }
</script>

<style scoped>

  .identifier-manage .el-button {
    font-size: 16px;
  }

  /* 菜品种类维护对话框开始 */
  .identifier-manage .el-pagination {
    text-align: center;
    margin: 18px 22px 20px 0;
  }

  .add-identifier {
    width: 80px;
    height: 34px;
    padding: 0;
    background-color: #4189EB;
  }

  .delete-Identifier {
    width: 80px;
    height: 34px;
    padding: 0;
    color: #4189EB;
    border-color: #4189EB;
  }

  .btn-ope {
    color: #037FF2;
    font-size: 14px;
  }

  .btn-ope span:nth-child(2n-1) {
    cursor: pointer;
  }

  .btn-ope .line {
    color: #DADADA;
    margin: 0 8px;
  }

  /* 菜品种类维护对话框结束 */

</style>

<style>

  /*菜品种类表格开始*/
  .identifier-table {
    margin-top: 20px;
  }

  .identifier-table .cell {
    font-size: 16px;
    color: #333333;
  }

  .identifier-table .table-header th {
    height: 45px;
    background: #F1F3FB;
  }

  .identifier-table td {
    height: 45px;
  }

  .identifier-table .el-table__row--striped td {
    background: #F7FAFD !important;
  }

  .identifier-table .edit-identifier {
    color: #4189EB;
    margin-right: 5px;
    font-size: 20px;
    cursor: pointer;
  }

  .identifier-table .delete-identifier {
    font-size: 20px;
    color: #F56B6B;
    cursor: pointer;
  }

  /*菜品种类表格结束*/

  /* 菜品种类维护对话框开始 */
  .identifier-add-dialog .el-dialog__header,
  .identifier-edit-dialog .el-dialog__header {
    border-bottom: 1px solid #DBDFE5;
  }

  /* 菜品种类维护对话框结束 */
</style>
