import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import * as firebase from './firebase';

Vue.use(VueApollo);

const cache = new InMemoryCache();

export async function initialize(): Promise<void> {
  await Promise.all([
    firebase.initialize(),
    persistCache({
      cache,
      storage: window.localStorage
    })
  ]);
}

export default new VueApollo({
  defaultClient: new ApolloClient({
    cache,
    link: setContext(async (_, { headers }) => {
      const token = await firebase.getToken();

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ''
        }
      };
    }).concat(
      createHttpLink({
        fetchOptions: { method: 'GET' },
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
