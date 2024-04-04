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
  Fetch('/studio/studio_equipment/my/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    order_list.value = data
  })
}

const dialogDom = ref(false)
const order_id = ref('')
const form = ref({})
const borrowStudio = (id: string) => {
  dialogDom.value = true
  order_id.value = String(id)
}

//上传
const handleFinishImageSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  form.value.return_image = response.url
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submit = () => {
  Fetch(`/studio/studio_order/${order_id.value}/return/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form.value)
  }).then(res => res.json()).then((data) => {
    ElMessage.success('归还')
    load()
    dialogDom.value = false
  })
}
const deleteOrder = (borrow_id)=>{
  Fetch(`/studio/studio_equipment/${borrow_id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    ElMessage.success('撤回')
    load()
  })

}

load()
</script>

<template>
  <el-table :data='order_list'>
    <el-table-column
      label='借用编号'
      prop='id'
    ></el-table-column>
    <el-table-column
      label='初始照片'
      prop='borrow_image'
    >
      <template #default='scope'>
        <img :src="'http://localhost:8000/'+scope.row.borrow_image" alt='' style='width: 100px; height: 100px' />
      </template>
    </el-table-column>
    <el-table-column label='借用日期' prop='borrow_date'></el-table-column>
    <el-table-column label='借用时间' prop='borrow_time'></el-table-column>
    <el-table-column label='借用描述' prop='borrow_description'></el-table-column>
    <el-table-column label='借用状态' prop='status'>
      <template #default='scope'>
        <el-tag v-if='scope.row.status == -1' type='success'>进行中</el-tag>
        <el-tag v-if='scope.row.status == 0' type='success'>未开始</el-tag>
        <el-tag v-if='scope.row.status == 1'>已完成</el-tag>
        <el-tag v-if='scope.row.status == 2' type='warning'>超时</el-tag>
      </template>
    </el-table-column>
    <el-table-column label='操作' width='200px'>
      <template #default='scope'>
        <el-button type='primary' v-if='scope.row.status==-1'  @click='borrowStudio(scope.row.id)'>归还</el-button>
        <el-button type='warning' v-if='scope.row.status==0' @click='deleteOrder(scope.row.id)'>撤回</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model='dialogDom' title='Shipping address' width='500'>
    <el-form :model='form'>
      <el-form-item label='完成图片'>
        <el-upload
          class='avatar-uploader'
          action='http://localhost:8000/api/studio/upload/'
          :show-file-list='false'
          :on-success='handleFinishImageSuccess'
          :before-upload='beforeAvatarUpload'
        >
          <img v-if='form.return_image' :src='"http://localhost:8000/"+form.return_image' class='avatar' />
          <el-icon v-else class='avatar-uploader-icon'>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class='dialog-footer'>
        <el-button @click='dialogDom = false'>Cancel</el-button>
        <el-button type='primary' @click='submit'>
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