import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import Vue from "vue";
import VueApollo from "vue-apollo";

import configuration from "../configuration.json";
import { languageIDs, specialLanguageIDs } from "../domain";

Vue.use(VueApollo);

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

export const languagesQuery = gql`
  query Query($languageIDs: [ID]!) {
    languages(languageIDs: $languageIDs) {
      id
      color
      name
    }
  }
`;

export default async function(): Promise<VueApollo> {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link: setContext(async (_, { headers }) => ({
      headers
    })).concat(
      new HttpLink({
        fetchOptions: { method: "GET" },
        uri: configuration.graphQLEndpointURL
      })
    )
  });

  await persistCache({
    cache,
    storage: window.localStorage
  });

  for (const languageID of [...languageIDs, ...specialLanguageIDs]) {
    client.query({
      fetchPolicy: "network-only",
      query: repositoriesQuery,
      variables: { languageID }
    });
  }

  return new VueApollo({ defaultClient: client });
}
