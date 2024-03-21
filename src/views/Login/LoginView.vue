<script setup lang='ts'>
import { ref } from 'vue'
import { Login } from '@/apis/Fetch'

const submit = ref({
  'username': '',
  'password': ''
})

const login = () => {
  Login(submit.value.username, submit.value.password)
}
</script>

<template>
  <div class='body  flex items-center justify-center'>
    <div class='card h-180 w-300 flex'>
      <div class='left h-full w-180'>
        <div class='title'>
          Hi! 你好！👏<br>
          欢迎进入湘西龙山摄影共创平台
        </div>
        <img src='/login/image.png?url' alt='image' class='w-full' />
      </div>
      <div class='right h-full w-120'>
        <div class='title'>
          登录系统
        </div>
        <div class='w-full m-t-30'>
          <label>系统账号</label>
          <el-input v-model='submit.username'></el-input>
          <label>密码</label>
          <el-input v-model='submit.password' type='password'></el-input>

          <el-button class='w-full m-t-5 h-10' color='#2f87f4' @click='login'>登录</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped lang='scss'>
.body {
  width: 100vw;
  height: 100vh;
  background: url("/login/bg.png") no-repeat center center;
  background-size: 100% 100%;
  color: white;

  .card {
    border-radius: 50px;
    padding: 50px;

    .left {
      background: linear-gradient(195.71deg, rgba(1, 130, 246, 1) 0%, rgba(0, 110, 238, 1) 100%);
      border-radius: 50px 0 0 50px;
      padding: 100px 50px 50px 50px;
    }

    .right {
      border-radius: 0 50px 50px 0;
      padding: 100px 50px 50px 50px;
      background: url(/login/liner-bg.png), linear-gradient(195.71deg, rgb(86 172 249) 0%, rgb(60 141 235) 100%);
    }

    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 2rem;
      user-select: none;
    }
  }
}

</style>