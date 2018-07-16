import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';

import Repositories from '../Repositories.vue';

test('Render a component', () => {
  const localVue = createLocalVue();

  localVue.use(Router);

  shallowMount(Repositories, { localVue, router: new Router() });
});
