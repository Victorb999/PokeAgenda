import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemon:{},

  },
  mutations: {
    setarpokemon: (state, champs) =>{      
      state.pokemon = champs
    },

  },
  actions: {
    addPokemon: ( {commit},payload)=>{
      //console.log(payload)
      commit('setarpokemon',payload)
    },
  },
  modules: {
  }
})
