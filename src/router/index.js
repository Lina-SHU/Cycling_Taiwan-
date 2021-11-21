import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    component: () => import('../views/Map.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
