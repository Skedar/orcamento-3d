<template>
  <div class="home">
    <div class="container py-5">
      <h1 class="mb-4">Orçamento de Impressão 3D</h1>
      
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">Novo Orçamento</h5>
              <p class="card-text">
                Faça um orçamento rápido para sua impressão 3D.
                Basta enviar seu arquivo e escolher as opções desejadas.
              </p>
              <router-link 
                to="/orcamento" 
                class="btn btn-primary"
              >
                Começar Orçamento
              </router-link>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <h5 class="card-title">Como Funciona</h5>
              <ul class="list-unstyled">
                <li class="mb-2">
                  <i class="fas fa-upload me-2"></i>
                  Envie seu arquivo 3D
                </li>
                <li class="mb-2">
                  <i class="fas fa-cog me-2"></i>
                  Escolha material e qualidade
                </li>
                <li class="mb-2">
                  <i class="fas fa-calculator me-2"></i>
                  Receba o orçamento instantâneo
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'
import NotificationList from '@/components/NotificationList.vue'

export default {
  name: 'HomePage',
  components: {
    FileUpload,
    NotificationList
  },
  setup() {
    return {
      // suas props aqui
    }
  }
}
</script>