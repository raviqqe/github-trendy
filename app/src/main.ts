import Vue from "vue";

import App from "./components/App.vue";
import apolloProvider from "./infra/apollo";
import "./register-service-worker";
import createRouter from "./router";
import createStore from "./store";

Vue.config.productionTip = false;

new Vue({
  apolloProvider,
  render: h => h(App),
  router: createRouter(),
  store: createStore()
}).$mount("#app");
