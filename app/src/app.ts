import { register } from "register-service-worker";
import Vue from "vue";
import Router from "vue-router";
import { Store } from "vuex";

import { ApolloProvider } from "vue-apollo";
import App from "./components/App.vue";
import createApolloProvider from "./infra/apollo";
import createRouter from "./router";
import createStore, { IState } from "./store";

register("/service-worker.js", {});

Vue.config.productionTip = false;

export default async function(): Promise<{
  app: Vue;
  apolloProvider: ApolloProvider;
  router: Router;
  store: Store<IState>;
}> {
  const apolloProvider = await createApolloProvider();
  const router = createRouter();
  const store = createStore();

  return {
    apolloProvider,
    app: new Vue({
      apolloProvider,
      render: h => h(App),
      router,
      store
    }),
    router,
    store
  };
}
