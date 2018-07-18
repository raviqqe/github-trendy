import Vue from 'vue';
import Vuex from 'vuex';

import * as apollo from './infra/apollo';
import * as firebase from './infra/firebase';

Vue.use(Vuex);

interface IState {
  cacheInitialized: boolean;
  firebaseInitialized: boolean;
}

const store = new Vuex.Store<IState>({
  actions: {
    async initializeCache(context) {
      await apollo.initializeCache();
      context.commit('initializeCache');
    },
    async initializeFirebase(context) {
      await firebase.initialize();
      context.commit('initializeFirebase');
    }
  },
  mutations: {
    initializeCache(state: IState) {
      state.cacheInitialized = true;
    },
    initializeFirebase(state: IState) {
      state.firebaseInitialized = true;
    }
  },
  state: {
    cacheInitialized: false,
    firebaseInitialized: false
  }
});

store.dispatch('initializeCache');
store.dispatch('initializeFirebase');

export default store;
