import Vue from "vue";
import ApolloSSR from "vue-apollo/ssr";

import createApp from "./app";
import App from "./components/App.vue";

Vue.use(ApolloSSR);

export default async (): Promise<Vue> => {
  const { app, apolloProvider, router, store } = await createApp();

  await new Promise(resolve => router.onReady(resolve));

  await ApolloSSR.prefetchAll(
    apolloProvider,
    [App, ...router.getMatchedComponents()],
    {
      route: router.currentRoute,
      store
    }
  );

  return app;
};
