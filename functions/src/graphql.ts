import { ApolloServer, gql } from 'apollo-server-express';
import * as fs from 'fs';
import * as path from 'path';

import configuration from './configuration.json';
import { languages } from './firebase';
import {
  fetchLanguage,
  fetchTrendingRepositories,
  IRepository
} from './github';

const typeDefs = gql`
  type Repository {
    id: ID!
    date: Float!
    description: String
    language: Language
    name: String!
    stars: Int!
    url: String!
  }

  type Language {
    color: String!
    id: ID!
    name: String!
  }

  type Query {
    languages(languageIDs: [ID]!): [Language]
    repositories(languageID: ID): [Repository]
  }
`;

export default new ApolloServer({
  cacheControl: {
    defaultMaxAge: configuration.cacheExpirationTime
  },
  resolvers: {
    Query: {
      async languages(_, { languageIDs }) {
        return await Promise.all(languageIDs.map(fetchLanguage));
      },
      async repositories(_, { languageID }) {
        const repositories = languages.repositories(languageID || 'default');

        await repositories.store(await fetchTrendingRepositories(languageID));

        return await repositories.fetch();
      }
    }
  },
  tracing: true,
  typeDefs
});
