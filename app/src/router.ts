import Vue from 'vue';
import Router from 'vue-router';

import Repositories from './components/Repositories.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { component: Repositories, path: '/' },
    { component: Repositories, path: '/:language' }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
