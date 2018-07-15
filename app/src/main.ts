import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import App from './App.vue';
import './register-service-worker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri:
      'https://us-central1-github-new-trends.cloudfunctions.net/functions/graphql'
  }),
  defaultOptions: {
    $query: {
      loadingKey: 'loading'
    }
  }
});

new Vue({
  provide: apolloProvider.provide(),
  render: h => h(App),
  router,
  store
}).$mount('#app');
