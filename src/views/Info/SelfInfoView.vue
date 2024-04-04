<script setup lang='ts'>
import { ref } from 'vue'
import { Fetch } from '@/apis/Fetch'
import { ElNotification } from 'element-plus'
import { AuthStore } from '@/stores/Auth'

const form = ref({})
const editMode = ref(false)
const loadInfo = () => {
  Fetch('/studio/user_info/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then((data) => {
    if (typeof data === 'string') {
      const authStore = AuthStore()
      form.value.id =authStore.id
      ElNotification({
        title: '错误',
        message: data,
        type: 'error'
      })
    } else {
      form.value = data
    }
  })
}

const saveInfo = () => {
  Fetch('/studio/update_user_info/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form.value)
  }).then(res => res.json()).then((data) => {
    editMode.value = false
  })

}
loadInfo()

</script>

<template>
  <div class='mx-auto w-50% text-center'>
    <div class='font-size-6 mb-4'>个人信息</div>
    <el-form :model='form'>
      <el-form-item label='姓名' prop='name'>
        <el-input v-model='form.name' :disabled='!editMode'></el-input>
      </el-form-item>
      <el-form-item label='性别' prop='sex'>
        <el-radio-group v-model='form.sex' :disabled='!editMode'>
          <el-radio label='男' :value='true'></el-radio>
          <el-radio label='女' :value='false'></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label='工号' prop='id'>
        <el-input v-model='form.id' disabled></el-input>
      </el-form-item>
      <el-form-item label='手机号' prop='phone'>
        <el-input v-model='form.phone' :disabled='!editMode'></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if='!editMode' @click='editMode=true'>编辑</el-button>
    <el-button v-else type='primary' @click='saveInfo'>保存</el-button>
  </div>
</template>

<style scoped>

</style>