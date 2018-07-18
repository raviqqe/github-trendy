import Vue from 'vue';
import Router from 'vue-router';

import Page from './components/Page.vue';
import { languages } from './domain';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: languages[0].path },
    { component: Page, path: '/:language' }
  ]
});
