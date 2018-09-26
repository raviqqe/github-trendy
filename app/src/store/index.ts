import { pickBy, uniq } from "lodash";
import { duration } from "moment";
import Vue from "vue";
import Vuex, { Payload, Store } from "vuex";
import VuexPersist from "vuex-persist";

import * as apollo from "../infra/apollo";

Vue.use(Vuex);

interface IState {
  menuOpen: boolean; // only for small windows
  recentlyViewedLanguageIDs: { [languageID: string]: number };
}

export default (): Store<IState> => {
  const store = new Store<IState>({
    actions: {},
    mutations: {
      cleanRecentlyViewedLanguages(state: IState) {
        state.recentlyViewedLanguageIDs = pickBy(
          state.recentlyViewedLanguageIDs,
          (time: number) => duration(Date.now() - time).days() <= 7
        );
      },
      viewLanguage(state: IState, id: string) {
        state.recentlyViewedLanguageIDs = {
          ...state.recentlyViewedLanguageIDs,
          [id]: Date.now()
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

  store.commit("cleanRecentlyViewedLanguages");

  return store;
};
