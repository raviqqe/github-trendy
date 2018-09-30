import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex, { Store } from "vuex";

import Header from "../Header.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

test("Render a component", () => {
  shallowMount(Header, {
    localVue,
    store: new Store({})
  });
});
