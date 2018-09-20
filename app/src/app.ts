import { register } from "register-service-worker";
import Vue from "vue";

import App from "./components/App.vue";
import createApolloProvider from "./infra/apollo";
import createRouter from "./router";
import createStore from "./store";

register("/service-worker.js", {});

Vue.config.productionTip = false;

export default async function(): Promise<Vue> {
  return new Vue({
    apolloProvider: await createApolloProvider(),
    render: h => h(App),
    router: createRouter(),
    store: createStore()
  });
}
