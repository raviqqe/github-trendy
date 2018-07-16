import Vue from 'vue';

import App from './App.vue';
import apolloProvider from './infra/apollo';
import './register-service-worker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  provide: apolloProvider.provide(),
  render: h => h(App),
  router,
  store
}).$mount('#app');
