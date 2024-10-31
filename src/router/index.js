import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/orcamento',
    name: 'Orcamento',
    component: () => import('@/views/Orcamento.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/views/Perfil.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 