import { shallowMount } from '@vue/test-utils';

import App from '../App.vue';

test('Render a component', () => {
  shallowMount(App, { stubs: ['router-link', 'router-view'] });
});
