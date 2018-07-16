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
    repositories: [Repository]
  }
`;

export default makeExecutableSchema({
  resolvers: {
    Query: {
      async repositories() {
        return await fetchTrendingRepositories();
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
