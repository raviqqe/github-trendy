import { createLocalVue, shallowMount } from "@vue/test-utils";
import Router from "vue-router";
import Vuex, { Store } from "vuex";

import Menu from "../Menu.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Router);

test("Render a component", () => {
  shallowMount(Menu, {
    localVue,
    router: new Router(),
    store: new Store({})
  });
});
