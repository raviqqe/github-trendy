import { createLocalVue, shallowMount } from "@vue/test-utils";
import Router from "vue-router";
import Vuex, { Store } from "vuex";

import { specialLanguages } from "../../domain";
import RecentlyViewedLanguages from "../RecentlyViewedLanguages.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Router);

test("Render a component", () => {
  shallowMount(RecentlyViewedLanguages, {
    localVue,
    propsData: { languages: [specialLanguages.all, specialLanguages.unknown] },
    router: new Router(),
    store: new Store({
      state: {
        recentlyViewedLanguageIDs: {
          [specialLanguages.all.id]: Date.now()
        }
      }
    })
  });
});
