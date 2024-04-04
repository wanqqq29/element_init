<script setup lang='ts'>

import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { AuthStore } from '@/stores/Auth'
import { ElNotification } from 'element-plus'
import moment from 'moment'
import { Fetch } from '@/apis/Fetch'

const router = useRouter()

const active = ref('/')

const handleOpen = (key: any) => {
  active.value = key.index
  router.push({
    name: key.index
  })
}

const formatTime = (time: any) => {
  // 解析时间字符串
  const date = moment.utc(time)
  // 格式化日期和时间
  return date.format('YYYY-MM-DD HH:mm:ss')
}

const readMessage = (id: number) => {
  Fetch(`/message/${id}/`, {
    method: 'PUT',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

const authStore = AuthStore()


//新开一个worker 来处理消息通知
const worker = ref()
const initWorker = () => {
  if (window.Worker) {
    worker.value = new Worker(new URL('./worker.ts', import.meta.url))
    worker.value.onmessage = (e: any) => {
      // 处理从Worker接收到的数据
      if (e.data) {
        ElNotification({
          title: '温馨提示',
          message: `${formatTime(e.data.created_time)}: ${e.data.content}`,
          duration: 0,
          onClose: readMessage(e.data.id)
        })
      }
    }
    worker.value.onerror = (error: any) => {
      // 处理Worker错误
      console.log('Worker error:', error)
    }
    worker.value.postMessage({ action: 'getMessage', token: localStorage.getItem('token') })
  } else {
    alert('Your browser does not support Web Workers.')
  }
}
initWorker()

onMounted(() => {
  const current_roter = router.currentRoute.value.name
  active.value = current_roter as string
  authStore.setinfo()
})

onUnmounted(() => {
  worker.value.terminate()
})

</script>

<template>
  <el-container class='h-screen'>
    <el-aside class='menu w-20 h-full overflow-y-hidden p-2'>
      <div class='flex justify-start items-center bg-white cursor-pointer' @click='handleOpen("index")'>
        <div class='left'><img src='/src/assets/logo.png' alt='logo' class='w-10'></div>
        <div class='left'><span class='font-size-4 font-black m-l-2'>湘西龙山摄影共创平台</span></div>
      </div>
      <div class='flex flex-col font-size-6'>
        <el-menu
          :default-active='active'
          style='border-right: 0 !important;'
        >
          <el-menu-item @click='handleOpen' index='self-info'>个人中心</el-menu-item>
          <el-menu-item @click='handleOpen' index='task-my'>查看被分配任务</el-menu-item>
          <el-menu-item @click='handleOpen' index='studio'>
            <span>全部影棚</span>
          </el-menu-item>
          <el-menu-item @click='handleOpen' index='studio-my'>
            <span>影棚预约记录</span>
          </el-menu-item>
          <el-menu-item @click='handleOpen' index='equiment'>
            <span>设备列表</span>
          </el-menu-item>
          <el-menu-item @click='handleOpen' index='equiment-my'>
            <span>设备借用记录</span>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header class='bg-blue text-white font-size-4 border-0 text-center flex flex-items-center'>
        <div class='w-full flex row justify-end'>
          欢迎您：
          <div>{{ authStore.username }}</div>
        </div>
      </el-header>
      <div class='p-2'>
        <RouterView></RouterView>
      </div>
    </el-container>
  </el-container>
</template>

<style scoped lang='scss'>
.menu {
  border-right: 1px solid #c7c4c4ad;
}

</style>