import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';

import Repositories from '../Repositories.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(Router);

test('Render a component', () => {
  shallowMount(Repositories, {
    localVue,
    router: new Router(),
    store: new Vuex.Store({
      getters: {
        apolloInitialized: () => true
      }
    })
  });
});
