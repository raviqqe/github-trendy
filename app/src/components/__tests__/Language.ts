import { shallowMount } from '@vue/test-utils';

import Language from '../Language.vue';

test('Render a component', () => {
  shallowMount(Language, {
    propsData: {
      color: 'yellow',
      id: 'javascript',
      name: 'JavaScript'
    },
    stubs: ['router-link']
  });
});
