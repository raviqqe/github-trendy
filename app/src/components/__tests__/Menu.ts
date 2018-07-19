import { shallowMount } from '@vue/test-utils';

import Menu from '../Menu.vue';

test('Render a component', () => {
  shallowMount(Menu, { stubs: ['router-link'] });
});
