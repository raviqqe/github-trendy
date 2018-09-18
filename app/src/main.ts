import Vue from "vue";

import App from "./components/App.vue";
import createApolloProvider from "./infra/apollo";
import "./register-service-worker";
import createRouter from "./router";
import createStore from "./store";

Vue.config.productionTip = false;

(async () => {
  new Vue({
    apolloProvider: await createApolloProvider(),
    render: h => h(App),
    router: createRouter(),
    store: createStore()
  }).$mount("#app");
})();
