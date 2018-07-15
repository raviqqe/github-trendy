import { shallowMount } from '@vue/test-utils';

import Repository from '../Repository.vue';

test('Render a component', () => {
  shallowMount(Repository, {
    propsData: { name: 'My repository', url: 'https://github.com/foo/bar' }
  });
});
