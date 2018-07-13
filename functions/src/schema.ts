import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
  type Repository {
    id: Int!
    name: String
    url: String
  }

  type Query {
    repositories: [Repository]
  }
`;

export default makeExecutableSchema({
  resolvers: {
    Query: {
      repositories() {
        return [];
      }
    }
  },
  typeDefs
});
