import Vue from 'vue';
import Router from 'vue-router';

import Repositories from './components/Repositories.vue';
import { languages } from './domain';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: languages[0].path },
    { component: Repositories, path: '/:language' }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
