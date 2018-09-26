import { createLocalVue, shallowMount } from "@vue/test-utils";
import Router from "vue-router";

import { specialLanguages } from "../../domain";
import AllLanguages from "../AllLanguages.vue";

const localVue = createLocalVue();

localVue.use(Router);

test("Render a component", () => {
  shallowMount(AllLanguages, {
    localVue,
    propsData: { languages: [specialLanguages.all, specialLanguages.unknown] },
    router: new Router()
  });
});
