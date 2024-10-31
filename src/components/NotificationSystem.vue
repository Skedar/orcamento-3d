<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notificationClass(notification.type)"
        @click="removeNotification(notification.id)"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useNotification } from '@/composables/useNotification'

export default defineComponent({
  name: 'NotificationSystem',
  
  setup() {
    const { notifications, removeNotification } = useNotification()

    const notificationClass = (type) => ({
      'notification-info': type === 'info',
      'notification-success': type === 'success',
      'notification-error': type === 'error',
      'notification-warning': type === 'warning'
    })

    return {
      notifications,
      removeNotification,
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
  cursor: pointer;
  min-width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  
  &-info {
    background: #2196F3;
    color: white;
  }
  
  &-success {
    background: #4CAF50;
    color: white;
  }
  
  &-error {
    background: #F44336;
    color: white;
  }
  
  &-warning {
    background: #FF9800;
    color: white;
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