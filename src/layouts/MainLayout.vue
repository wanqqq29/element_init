<script setup lang='ts'>

import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { AuthStore } from '@/stores/Auth'

const router = useRouter()

const active = ref('/')

const handleOpen = (key: string) => {
  active.value = key
  router.push({
    name: key
  })
}

const authStore = AuthStore()

onMounted(() => {
  const current_roter = router.currentRoute.value.name
  active.value = current_roter as string
  authStore.setinfo()
})

</script>

<template>
  <el-container class='h-screen'>
    <el-aside class='menu w-20 h-full overflow-y-hidden p-2'>
      <div class='flex justify-start items-center bg-white cursor-pointer' @click='handleOpen("index")'>
        <div class='left'><img src='/public/logo.png' alt='logo' class='w-10'></div>
        <div class='left'><span class='font-size-4 font-black m-l-2'>湘西龙山摄影共创平台</span></div>
      </div>
      <div class='flex flex-col font-size-6'>
        <el-menu
          :default-active='active'
          @open='handleOpen'
          style='border-right: 0 !important;'
        >
          <el-menu-item index='task-all' route='task-all'>查看所有任务</el-menu-item>
          <el-menu-item index='task-my' route='task-my'>查看被分配任务</el-menu-item>
          <el-menu-item index='studio' route='studio'>
            <span>借用影棚</span>
          </el-menu-item>
          <el-menu-item index='equiment' route='equiment'>
            <span>借用设备</span>
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