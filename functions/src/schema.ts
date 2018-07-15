import { makeExecutableSchema } from 'graphql-tools';

import { fetchGitHubTrends, IRepository } from './github-trends';

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
        return await fetchGitHubTrends();
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
