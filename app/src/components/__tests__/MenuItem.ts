import { createLocalVue, shallowMount } from '@vue/test-utils';
import Router from 'vue-router';

import MenuItem from '../MenuItem.vue';

const localVue = createLocalVue();

localVue.use(Router);

test('Render a component', () => {
  shallowMount(MenuItem, {
    localVue,
    router: new Router()
  });
});
