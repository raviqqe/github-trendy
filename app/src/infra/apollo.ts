import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: window.localStorage
});

export async function initializeCache(): Promise<void> {
  await persistor.restore();
  await persistor.persist();
}

export default new VueApollo({
  defaultClient: new ApolloClient({
    cache,
    uri:
      'https://us-central1-github-new-trends.cloudfunctions.net/functions/graphql'
  }),
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-first'
    }
  }
});
