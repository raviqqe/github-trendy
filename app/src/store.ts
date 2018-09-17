import Vue from "vue";
import Vuex from "vuex";

import * as apollo from "./infra/apollo";
import * as media from "./infra/media";

Vue.use(Vuex);

interface IState {
  apolloInitialized: boolean;
  menuOpen: boolean; // only for small windows
  windowSmall: boolean;
}

const store = new Vuex.Store<IState>({
  actions: {
    async initializeApollo(context) {
      await apollo.initialize();
      context.commit("initializeApollo");
    }
  },
  mutations: {
    initializeApollo(state: IState) {
      state.apolloInitialized = true;
    },
    toggleMenu(state: IState) {
      state.menuOpen = !state.menuOpen;
    },
    setWindowSmall(state: IState, windowSmall: boolean) {
      state.windowSmall = windowSmall;
    }
  },
  state: {
    apolloInitialized: false,
    menuOpen: false,
    windowSmall: media.windowSmall
  }
});

store.dispatch("initializeApollo");
media.onWindowResize((windowSmall: boolean) =>
  store.commit("setWindowSmall", windowSmall)
);

export default store;
