import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 1,
    userInfo: {}
  },
  mutations: {
    setType(state, type) {
      // console.log(type)
      state.type = type
    },

    saveUserInfo(state, type) {
      state.userInfo = type
    }
  },
  actions: {
    saveUserInfo({ commit }, data) {
      commit('saveUserInfo', data)
    }
  },
  modules: {
  }
})
