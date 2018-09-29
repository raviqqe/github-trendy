import { mapValues, pickBy, uniq } from "lodash";
import Vue from "vue";
import Vuex, { Payload, Store } from "vuex";
import VuexPersist from "vuex-persist";

import * as apollo from "../infra/apollo";

export const maxViewPoints: number = 4;

Vue.use(Vuex);

interface IState {
  menuOpen: boolean; // only for small windows
  recentlyViewedLanguageIDs: { [languageID: string]: number };
}

export default (): Store<IState> => {
  const store = new Store<IState>({
    actions: {},
    mutations: {
      reduceLanguageViewPoints(state: IState) {
        state.recentlyViewedLanguageIDs = pickBy(
          mapValues(
            state.recentlyViewedLanguageIDs,
            (points: number) => points - 1
          ),
          (points: number) => points > 0
        );
      },
      viewLanguage(state: IState, id: string) {
        state.recentlyViewedLanguageIDs = {
          ...state.recentlyViewedLanguageIDs,
          [id]: maxViewPoints
        };
      },
      toggleMenu(state: IState) {
        state.menuOpen = !state.menuOpen;
      }
    },
    plugins: [
      new VuexPersist<IState, Payload>({
        modules: ["recentlyViewedLanguageIDs"],
        storage: window.localStorage
      }).plugin
    ],
    state: {
      menuOpen: false,
      recentlyViewedLanguageIDs: {}
    }
  });

  store.commit("reduceLanguageViewPoints");

  return store;
};
