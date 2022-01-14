import Vuex from 'vuex'
import Vue from 'vue'
import authModule from './auth'

Vue.use(Vuex)

const store = {
  modules: {
    'auth': authModule,
  },
}

export default new Vuex.Store(store)