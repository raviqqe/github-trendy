import Vue from 'vue';
import Router from 'vue-router';

import { languages } from './domain';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [{ component: Home, path: '/:language' }]
});
