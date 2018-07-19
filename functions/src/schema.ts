import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';

import { languages } from './firebase';
import { fetchTrendingRepositories, IRepository } from './github';

const typeDefs = `
  type Repository {
    id: ID!
    date: Float!
    language: String!
    name: String!
    stars: Int!
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
        const repositories = languages.repositories(language);

        await repositories.store(await fetchTrendingRepositories(language));

        return await repositories.fetch();
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
