<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          Orçamento 3D
        </router-link>
      </div>
    </nav>

    <NotificationList />
    
    <div class="loading-overlay" v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import NotificationList from './components/NotificationList.vue'

export default defineComponent({
  name: 'App',
  
  components: {
    NotificationList
  },
  
  setup() {
    const store = useStore()
    
    const loading = computed(() => store.state.loading)
    
    return {
      loading
    }
  }
})
</script>

<style lang="scss">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
</style>
