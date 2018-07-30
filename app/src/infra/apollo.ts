import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

import configuration from '../configuration.json';
import { languageIDs, specialLanguageIDs } from '../domain';
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
      uri: configuration.graphQLEndpointURL
    })
  )
});

export const daysQuery = gql`
  query Query($languageID: ID) {
    days(languageID: $languageID) {
      id
      date
      repositories {
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
  }
`;

export const languagesQuery = gql`
  query Query($languageIDs: [ID]!) {
    languages(languageIDs: $languageIDs) {
      id
      color
      name
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

  for (const languageID of [...languageIDs, ...specialLanguageIDs]) {
    client.query({
      fetchPolicy: 'network-only',
      query: daysQuery,
      variables: { languageID }
    });
  }
}

export default new VueApollo({ defaultClient: client });
