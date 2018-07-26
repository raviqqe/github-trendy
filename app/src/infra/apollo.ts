import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import { languageIDs } from '../domain';
import * as firebase from './firebase';

Vue.use(VueApollo);

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${await firebase.getToken()}`
    }
  })).concat(
    new HttpLink({
      fetchOptions: { method: 'GET' },
      uri:
        'https://us-central1-github-new-trends.cloudfunctions.net/functions/graphql'
    })
  )
});

export const repositoriesQuery = gql`
  query Query($languageID: ID) {
    repositories(languageID: $languageID) {
      id
      date
      description
      language {
        color
        id
        name
      }
      name
      stars
      url
    }
  }
`;

export async function initialize(): Promise<void> {
  await Promise.all([
    firebase.initialize(),
    persistCache({
      cache,
      storage: window.localStorage
    })
  ]);

  for (const languageID of languageIDs) {
    client.query({
      fetchPolicy: 'network-only',
      query: repositoriesQuery,
      variables: { languageID }
    });
  }
}

export default new VueApollo({ defaultClient: client });
