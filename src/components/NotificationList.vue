<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notificationClass(notification.type)"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'NotificationList',
  
  setup() {
    const store = useStore()
    
    const notifications = computed(() => store.state.notification.notifications)
    
    const notificationClass = (type) => ({
      'notification-info': type === 'info',
      'notification-success': type === 'success',
      'notification-error': type === 'error',
      'notification-warning': type === 'warning'
    })
    
    return {
      notifications,
      notificationClass
    }
  }
})
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification {
  padding: 15px 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  min-width: 250px;
  
  &-info {
    border-left: 4px solid #2196F3;
  }
  
  &-success {
    border-left: 4px solid #4CAF50;
  }
  
  &-error {
    border-left: 4px solid #F44336;
  }
  
  &-warning {
    border-left: 4px solid #FF9800;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 