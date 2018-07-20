import { shallowMount } from '@vue/test-utils';

import Language from '../Language.vue';

test('Render a component', () => {
  shallowMount(Language, {
    propsData: {
      name: 'JavaScript',
      path: 'javascript'
    }
  });
});
