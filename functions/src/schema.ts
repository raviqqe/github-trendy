import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';

import { languages } from './firebase';
import { fetchTrendingRepositories, IRepository } from './github';

const typeDefs = `
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
    repositories(languageID: ID): [Repository]
  }
`;

export default makeExecutableSchema({
  resolvers: {
    Query: {
      async repositories(_, { languageID }) {
        const repositories = languages.repositories(languageID);

        await repositories.store(await fetchTrendingRepositories(languageID));

        return await repositories.fetch();
      }
    }
  },
  typeDefs
});
