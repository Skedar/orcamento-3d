import { createRouter, createWebHistory } from 'vue-router'

// Importar componentes com lazy loading
const Home = () => import('../views/Home.vue')
const Orcamento = () => import('../views/Orcamento.vue')
const Success = () => import('../views/Success.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Início - Orçamento 3D'
    }
  },
  {
    path: '/orcamento',
    name: 'Orcamento',
    component: Orcamento,
    meta: {
      title: 'Novo Orçamento - Orçamento 3D'
    }
  },
  {
    path: '/success',
    name: 'Success',
    component: Success,
    meta: {
      title: 'Orçamento Enviado - Orçamento 3D'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navegação global
router.beforeEach((to, from, next) => {
  // Atualizar título da página
  document.title = to.meta.title || 'Orçamento 3D'
  next()
})

export default router 