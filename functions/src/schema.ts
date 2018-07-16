import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';

import { fetchTrendingRepositories, IRepository } from './github';

const typeDefs = `
  type Repository {
    id: ID!
    name: String!
    url: String!
  }

  type Query {
    repositories(language: String): [Repository]
  }
`;

export default makeExecutableSchema({
  resolvers: {
    Query: {
      async repositories(_, { language }) {
        return await fetchTrendingRepositories(language);
      }
    },
    Repository: {
      id({ url }: IRepository) {
        return url;
      }
    }
  },
  typeDefs
});
