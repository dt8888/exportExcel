import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    adress: ''
  },
  actions: {
    changeAdress (ctx,adress) {
      ctx.commit('changeAdress',adress)
    }
  },
  mutations: {
    changeAdress (state,adress) {
      state.adress = adress
    }
  }
})
