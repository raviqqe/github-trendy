import * as fs from 'fs';
import { makeExecutableSchema } from 'graphql-tools';
import * as path from 'path';

import { fetchTrendingRepositories, IRepository } from './github';

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
  typeDefs: fs.readFileSync(path.resolve(__dirname, 'common.graphql'), 'UTF-8')
});
