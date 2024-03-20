<script setup lang='ts'>

import { Fetch } from '@/apis/Fetch'
import { ref } from 'vue'
import moment from 'moment'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const studio_list = ref([])
const time_options = ref<[{ label: string, value: string }]>()
const load = () => {
  Fetch('/studio/stuidos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    studio_list.value = data
  })
  Fetch('/studio/options_order_time/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    time_options.value = data
  })
}

const dialogDom = ref(false)

const form = ref({})
const borrowStudio = (id: string) => {
  dialogDom.value = true
  form.value.studio_id = String(id)
}

//上传
const handleOrderImageSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  form.value.order_image = response.url
}
const handleFinishImageSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  form.value.Finish_image = URL.createObjectURL(uploadFile.raw!)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submit = () => {
  Fetch('/studio/order_studio/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form.value)
  }).then(res => res.json()).then((data) => {
    ElMessage.success('预约成功')
    dialogDom.value = false
  })
}


load()
</script>

<template>
  <el-table :data='studio_list'>
    <el-table-column
      label='影棚编号'
      prop='studio_id'
    ></el-table-column>
    <el-table-column
      label='封面'
      prop='studio_image'
    >
      <template #default='scope'>
        <img :src="'http://localhost:8000/'+scope.row.studio_image" alt='' style='width: 100px; height: 100px' />
      </template>
    </el-table-column>
    <el-table-column label='影棚名称' prop='studio_name'></el-table-column>
    <el-table-column label='地址' prop='studio_address'></el-table-column>
    <el-table-column label='面积' prop='studio_size'></el-table-column>
    <el-table-column label='租金' prop='studio_rent'></el-table-column>
    <el-table-column label='是否可用' prop='studio_status'>
      <template #default='scope'>
        <el-tag v-if='scope.row.studio_status' type='success'>可用</el-tag>
        <el-tag v-else type='danger'>不可用</el-tag>
      </template>
    </el-table-column>
    <el-table-column label='场地类型' prop='studio_type'>
      <template #default='scope'>
        <span v-if='scope.row.studio_type' type='success'>室外</span>
        <span v-else type='danger'>室内</span>
      </template>
    </el-table-column>
    <el-table-column label='描述' prop='studio_description'></el-table-column>
    <el-table-column label='操作' width='100px'>
      <template #default='scope'>
        <el-button type='primary' @click='borrowStudio(scope.row.studio_id)'>预约</el-button>
      </template>
    </el-table-column>
  </el-table>


  <el-dialog v-model='dialogDom' title='Shipping address' width='500'>
    <el-form :model='form'>
      <el-form-item label='预约日期'>
        <el-date-picker
          v-model='form.order_date'
          type='date'
          placeholder='Pick a day'
          format='YYYY-MM-DD'
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label='预约时间'>
        <el-select v-model='form.order_time' placeholder='Please select a zone'>
          <template v-for='(item,key) in time_options' :key='key'>
            <el-option :label='item.label' :value='item.value' />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label='描述'>
        <el-input v-model='form.order_description'></el-input>
      </el-form-item>
      <el-form-item label='初始图片'>
        <el-upload
          class='avatar-uploader'
          action='http://localhost:8000/api/studio/upload/'
          :show-file-list='false'
          :on-success='handleOrderImageSuccess'
          :before-upload='beforeAvatarUpload'
        >
          <img v-if='form.order_image' :src='"http://localhost:8000/"+form.order_image' class='avatar' />
          <el-icon v-else class='avatar-uploader-icon'>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <!--      <el-form-item label='完成图片'>-->
      <!--        <el-upload-->
      <!--          class='avatar-uploader'-->
      <!--          action='http://localhost:8000/api/studio/upload/'-->
      <!--          :show-file-list='false'-->
      <!--          :on-success='handleFinishImageSuccess'-->
      <!--          :before-upload='beforeAvatarUpload'-->
      <!--        >-->
      <!--          <img v-if='form.Finish_image' :src='form.Finish_image' class='avatar' />-->
      <!--          <el-icon v-else class='avatar-uploader-icon'>-->
      <!--            <Plus />-->
      <!--          </el-icon>-->
      <!--        </el-upload>-->
      <!--      </el-form-item>-->
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