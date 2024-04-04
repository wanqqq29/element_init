<script setup lang='ts'>

import { Fetch } from '@/apis/Fetch'
import { ref } from 'vue'
import moment from 'moment'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const order_list = ref([])
const time_options = ref<[{ label: string, value: string }]>()
const load = () => {
  Fetch('/task/my/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    order_list.value = data
  })
}

const dialogDom = ref(false)
const form = ref({})
const detail = (info: string) => {
  dialogDom.value = true
  form.value = info
}

load()
</script>

<template>
  <el-table :data='order_list'>
    <el-table-column
      label='任务ID'
      prop='id'
    ></el-table-column>
    <el-table-column label='任务名称' prop='task_name'></el-table-column>
    <el-table-column label='任务描述' prop='task_description'></el-table-column>
    <el-table-column label='任务日期' prop='task_date'></el-table-column>
    <el-table-column label='任务状态' prop='status'>
      <template #default='scope'>
        <el-tag v-if='scope.row.status == -1' type='success'>进行中</el-tag>
        <el-tag v-if='scope.row.status == 0' type='success'>未开始</el-tag>
        <el-tag v-if='scope.row.status == 1'>已完成</el-tag>
        <el-tag v-if='scope.row.status == 2' type='warning'>超时</el-tag>
      </template>
    </el-table-column>
    <el-table-column label='任务地点' prop='task_studio_name'></el-table-column>

    <el-table-column label='操作' width='200px'>
      <template #default='scope'>
        <el-button type='primary' @click='detail(scope.row)'>详情</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model='dialogDom' :title='form.task_name + "任务需求:"' width='500'>
    <el-form :model='form' class='m-y-0 ma p-2'>
      <el-form-item label='文案需求'>
        <el-input class='h-20 mb-2' type='textarea' v-model='form.task_copy' disabled></el-input>
      </el-form-item>
      <el-form-item label='客户需求'>
        <el-input class='h-20 mb-2' type='textarea' v-model='form.task_customer' disabled></el-input>
      </el-form-item>
      <el-form-item label='剪辑需求'>
        <el-input class='h-20 mb-2' type='textarea' v-model='form.task_edit' disabled></el-input>
      </el-form-item>
      <el-form-item label='拍摄需求'>
        <el-input class='h-20 mb-2' type='textarea' v-model='form.task_shoot' disabled></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class='dialog-footer'>
        <el-button type='primary' @click='dialogDom = false'>
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>