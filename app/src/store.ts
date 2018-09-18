import Vue from "vue";
import Vuex, { Store } from "vuex";

import * as apollo from "./infra/apollo";
import * as media from "./infra/media";

Vue.use(Vuex);

interface IState {
  menuOpen: boolean; // only for small windows
  windowSmall: boolean;
}

export default function(): Store<IState> {
  const store = new Store<IState>({
    actions: {},
    mutations: {
      toggleMenu(state: IState) {
        state.menuOpen = !state.menuOpen;
      },
      setWindowSmall(state: IState, windowSmall: boolean) {
        state.windowSmall = windowSmall;
      }
    },
    state: {
      menuOpen: false,
      windowSmall: media.windowSmall
    }
  });

  media.onWindowResize((windowSmall: boolean) =>
    store.commit("setWindowSmall", windowSmall)
  );

  return store;
}
