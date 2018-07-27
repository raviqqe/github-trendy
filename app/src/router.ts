import Vue from 'vue';
import Router from 'vue-router';

import Days from './components/Days.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { component: Days, path: '/' },
    { component: Days, path: '/:language' }
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
