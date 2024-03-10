<script setup lang='ts'>

</script>

<template>
    <el-container class='h-screen p-2'>
      <el-aside class='menu w-20 h-full overflow-y-hidden'>
        <div class='flex justify-start items-center bg-white '>
          <div class='left'><img src='/public/logo.png' alt='logo' class='w-10'></div>
          <div class='left'><span class='font-size-4 font-black m-l-2'>湘西龙山摄影共创平台</span></div>
        </div>
        <div class='flex flex-col font-size-6'>
          <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose"
            style='border-right: 0 !important;'
          >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><location /></el-icon>
                <span>Navigator One</span>
              </template>
              <el-menu-item-group title="Group One">
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
              </el-menu-item-group>
              <el-sub-menu index="1-4">
                <template #title>item four</template>
                <el-menu-item index="1-4-1">item one</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Navigator Two</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <el-icon><document /></el-icon>
              <span>Navigator Three</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><setting /></el-icon>
              <span>Navigator Four</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <RouterView></RouterView>
      </el-container>
    </el-container>
</template>

<style scoped lang='scss'>
.menu{
  border-right: 1px solid #c7c4c4ad;
}

</style>