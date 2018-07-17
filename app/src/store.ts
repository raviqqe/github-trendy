import Vue from 'vue';
import Vuex from 'vuex';

import * as apollo from './infra/apollo';

Vue.use(Vuex);

interface IState {
  cacheInitialized: boolean;
}

const store = new Vuex.Store({
  actions: {
    async initializeCache(context) {
      await apollo.initializeCache();
      context.commit('initializeCache');
    }
  },
  mutations: {
    initializeCache(state: IState) {
      state.cacheInitialized = true;
    }
  },
  state: { cacheInitialized: false }
});

store.dispatch('initializeCache');

export default store;
