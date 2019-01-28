import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import Vue from "vue";
import VueApollo from "vue-apollo";
import { Store } from "vuex";

import configuration from "../configuration.json";
import { languageIDs, specialLanguageIDs } from "../domain";
import { IState } from "../store";

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

export default async function(store: Store<IState>): Promise<VueApollo> {
  const cache = new InMemoryCache();

  const client = new ApolloClient({
    cache,
    link: new HttpLink({
      fetchOptions: { method: "GET" },
      uri: configuration.graphQLEndpointURL
    })
  });

  await persistCache({
    cache,
    maxSize: false,
    storage: window.localStorage
  });

  for (const languageID of [...languageIDs, ...specialLanguageIDs]) {
    store.commit("startLoading", languageID);

    (async () => {
      await client.query({
        fetchPolicy: "network-only",
        query: repositoriesQuery,
        variables: { languageID }
      });

      store.commit("finishLoading", languageID);
    })();
  }

  return new VueApollo({ defaultClient: client });
}
