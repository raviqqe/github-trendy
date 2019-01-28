import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import Router from "vue-router";
import Vuex, { Store } from "vuex";

import { IState } from "src/store";
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
    store: new Store<IState>({
      state: {
        languages: {
          [specialLanguages.all.id]: { loading: false, viewPoints: 1 }
        },
        menuOpen: false
      }
    })
  });
});

test("Don't render a component with no recently viewed languages", () => {
  const wrapper = mount(RecentlyViewedLanguages, {
    localVue,
    propsData: { languages: [specialLanguages.all, specialLanguages.unknown] },
    router: new Router(),
    store: new Store<IState>({
      state: {
        languages: {},
        menuOpen: false
      }
    })
  });

  expect(wrapper.text()).toBe("");
});
