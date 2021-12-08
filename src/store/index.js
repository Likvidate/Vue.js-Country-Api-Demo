import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    visible: false
  },
  getters: {
    visible: state => {
      return state.visible
    }
  },
  mutations: {
    showVis (state, value) {
      state.visible = value
    }
  },
  actions: {
  },
  modules: {
  }
})
