export default {
  namespaced: true,
  state: {
    notifications: []
  },
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification)
    },
    REMOVE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id)
    }
  },
  actions: {
    notify({ commit }, { message, type = 'info', timeout = 5000 }) {
      const id = Date.now()
      commit('ADD_NOTIFICATION', { id, message, type })
      
      setTimeout(() => {
        commit('REMOVE_NOTIFICATION', id)
      }, timeout)
    }
  }
} 