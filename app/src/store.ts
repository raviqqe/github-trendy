import Vue from 'vue';
import Vuex from 'vuex';

import * as apollo from './infra/apollo';

Vue.use(Vuex);

interface IState {
  apolloInitialized: boolean;
}

const store = new Vuex.Store<IState>({
  actions: {
    async initializeApollo(context) {
      await apollo.initialize();
      context.commit('initializeApollo');
    }
  },
  mutations: {
    initializeApollo(state: IState) {
      state.apolloInitialized = true;
    }
  },
  state: {
    apolloInitialized: false
  }
});

store.dispatch('initializeApollo');

export default store;
