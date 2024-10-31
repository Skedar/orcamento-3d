import { createStore } from 'vuex'
import notification from './modules/notification'

export default createStore({
  modules: {
    notification
  },
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SET_LOADING(state, value) {
      state.loading = value
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    setLoading({ commit }, value) {
      commit('SET_LOADING', value)
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    }
  }
}) 