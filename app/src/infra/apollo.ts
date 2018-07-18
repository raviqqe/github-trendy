import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { getToken } from './firebase';

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
    link: setContext(async (_, { headers }) => {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    }).concat(
      createHttpLink({
        uri:
          'https://us-central1-github-new-trends.cloudfunctions.net/functions/graphql'
      })
    )
  }),
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-first'
    }
  }
});
