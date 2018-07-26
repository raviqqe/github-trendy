import { shallowMount } from '@vue/test-utils';

import Repository from '../Repository.vue';

test('Render a component', () => {
  shallowMount(Repository, {
    propsData: {
      description: 'This is good.',
      language: { color: 'yellow', id: 'javascript', name: 'JavaScript' },
      name: 'My repository',
      stars: 42,
      url: 'https://github.com/foo/bar'
    }
  });
});
