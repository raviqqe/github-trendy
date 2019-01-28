import { mapValues } from "lodash";
import Vue from "vue";
import Vuex, { Payload, Store } from "vuex";
import VuexPersist from "vuex-persist";

import { languageIDs, specialLanguageIDs } from "../domain";
import * as apollo from "../drivers/apollo";

export const maxViewPoints: number = 4;

Vue.use(Vuex);

interface ILanguageState {
  loading: boolean;
  viewPoints: number;
}

interface ILanguagesState {
  [id: string]: ILanguageState;
}

export interface IState {
  menuOpen: boolean; // only for small windows
  languages: ILanguagesState;
}

export default (): Store<IState> => {
  const store = new Store<IState>({
    actions: {},
    mutations: {
      startLoading(state: IState, id: string): void {
        state.languages = {
          ...state.languages,
          [id]: { ...state.languages[id], loading: true }
        };
      },
      finishLoading(state: IState, id: string): void {
        state.languages = {
          ...state.languages,
          [id]: { ...state.languages[id], loading: false }
        };
      },
      reduceLanguageViewPoints(state: IState): void {
        state.languages = mapValues(state.languages, language => ({
          ...language,
          viewPoints: language.viewPoints - 1
        }));
      },
      viewLanguage(state: IState, id: string): void {
        state.languages = {
          ...state.languages,
          [id]: { ...state.languages[id], viewPoints: maxViewPoints }
        };
      },
      toggleMenu(state: IState): void {
        state.menuOpen = !state.menuOpen;
      }
    },
    plugins: [
      new VuexPersist<IState>({
        modules: ["languages"],
        storage: window.localStorage
      }).plugin
    ],
    state: { languages: {}, menuOpen: false }
  });

  store.commit("reduceLanguageViewPoints");

  return store;
};
