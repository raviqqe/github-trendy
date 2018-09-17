import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";

import Header from "../Header.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

test("Render a component", () => {
  shallowMount(Header, {
    localVue,
    store: new Vuex.Store({})
  });
});
