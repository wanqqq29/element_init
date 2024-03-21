import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      name: 'aa',
      children: [
        {
          path: '/',
          name: 'index',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/IndexView.vue')
        }, {
          path: 'studio',
          name: 'studio',
          component: () => import('../views/Studio/IndexView.vue')
        }, {
          path: 'studio-my',
          name: 'studio-my',
          component: () => import('../views/Studio/MyList.vue')
        }, {
          path: 'equiment',
          name: 'equiment',
          component: () => import('../views/Equiment/IndexView.vue')
        }, {
          path: 'equiment-my',
          name: 'equiment-my',
          component: () => import('../views/Equiment/MyList.vue')
        }, {
          path: 'task-all',
          name: 'task-all',
          component: () => import('../views/Task/AllTaskView.vue')
        }, {
          path: 'task-my',
          name: 'task-my',
          component: () => import('../views/Task/MyTaskView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }

  ]
})

//添加导航守卫
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !localStorage.getItem('token')) {
    next({ name: 'login' })
  } else {
    next()
  }

})


export default router
