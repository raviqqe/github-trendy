import { ApolloServer, gql } from 'apollo-server-express';
import * as fs from 'fs';
import * as path from 'path';

import configuration from './configuration.json';
import { repositoriesToDays } from './domain';
import { languages } from './firebase';
import { fetchLanguage, fetchRepositories, IRepository } from './github';

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

  type Day {
    id: ID!
    date: Float!
    repositories: [Repository]!
  }

  type Query {
    days(languageID: ID): [Day]
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
        return await fetchRepositories(languageID);
      },
      async days(_, { languageID }) {
        return repositoriesToDays(await fetchRepositories(languageID)).map(
          day => ({ ...day, id: languageID + '-' + day.date })
        );
      }
    }
  },
  tracing: true,
  typeDefs
});
