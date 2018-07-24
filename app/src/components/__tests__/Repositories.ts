import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';

import Repositories from '../Repositories.vue';

const localVue = createLocalVue();

localVue.use(Router);

test('Render a component', () => {
  shallowMount(Repositories, {
    localVue,
    router: new Router()
  });
});
