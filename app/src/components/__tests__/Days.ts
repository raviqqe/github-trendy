import { createLocalVue, shallowMount } from "@vue/test-utils";
import Router from "vue-router";

import Days from "../Days.vue";

const localVue = createLocalVue();

localVue.use(Router);

test("Render a component", () => {
  shallowMount(Days, {
    localVue,
    router: new Router()
  });
});
