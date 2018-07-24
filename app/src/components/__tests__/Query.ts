import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex from 'vuex';

import Query from '../Query.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

test('Render a component', () => {
  shallowMount(Query, {
    localVue,
    propsData: { query: {}, variables: {} },
    store: new Vuex.Store({})
  });
});
