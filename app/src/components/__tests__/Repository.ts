import { shallowMount } from '@vue/test-utils';

import Repository from '../Repository.vue';

test('Render a component', () => {
  shallowMount(Repository, {
    propsData: {
      date: new Date(),
      language: 'JavaScript',
      name: 'My repository',
      stars: 42,
      url: 'https://github.com/foo/bar'
    }
  });
});
