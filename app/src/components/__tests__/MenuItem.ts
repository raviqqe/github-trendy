import { createLocalVue, shallowMount } from "@vue/test-utils";
import Router from "vue-router";
import Vuex from "vuex";

import createStore from "../../store";
import MenuItem from "../MenuItem.vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Router);

test("Render a component", () => {
  shallowMount(MenuItem, {
    localVue,
    propsData: { id: "c" },
    router: new Router(),
    store: createStore()
  });
});
