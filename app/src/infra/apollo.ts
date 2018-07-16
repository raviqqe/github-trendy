import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
});

export default new VueApollo({
  defaultClient: new ApolloClient({
    cache,
    uri:
      'https://us-central1-github-new-trends.cloudfunctions.net/functions/graphql'
  }),
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-and-network',
      loadingKey: 'loading'
    }
  }
});
