import Vue from 'vue';

import App from './App.vue';
import './register-service-worker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');