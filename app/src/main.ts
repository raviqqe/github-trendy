import { register } from "register-service-worker";
import Vue from "vue";

import App from "./components/App.vue";
import { pathToLanguageID } from "./domain";
import createApolloProvider from "./infra/apollo";
import createRouter from "./router";
import createStore from "./store";

register("/service-worker.js", {});

Vue.config.productionTip = false;

(async () => {
  const router = createRouter();
  const store = createStore();

  new Vue({
    apolloProvider: await createApolloProvider(store),
    render: h => h(App),
    router,
    store
  }).$mount("#app");

  store.commit("viewLanguage", pathToLanguageID(router.currentRoute.path));
})();
