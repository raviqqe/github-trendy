import Vue from "vue";
import Vuex, { Store } from "vuex";

import * as apollo from "./infra/apollo";

Vue.use(Vuex);

export interface IState {
  menuOpen: boolean; // only for small windows
}

export default (): Store<IState> =>
  new Store<IState>({
    actions: {},
    mutations: {
      toggleMenu(state: IState) {
        state.menuOpen = !state.menuOpen;
      }
    },
    state: {
      menuOpen: false
    }
  });
