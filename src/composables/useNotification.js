import { ref } from 'vue'

const notifications = ref([])

export function useNotification() {
  const notify = (message, type = 'info', duration = 5000) => {
    const id = Date.now()
    
    notifications.value.push({
      id,
      message,
      type,
      show: true
    })

    setTimeout(() => {
      removeNotification(id)
    }, duration)
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    notify,
    removeNotification
  }
} 