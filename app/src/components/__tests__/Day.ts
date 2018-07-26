import { shallowMount } from '@vue/test-utils';

import Day from '../Day.vue';

test('Render a component', () => {
  shallowMount(Day, {
    propsData: {
      date: new Date(),
      repositories: []
    }
  });
});
