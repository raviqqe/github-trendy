import { ApolloServer, gql } from "apollo-server-express";
import { Duration } from "luxon";

import { fetchLanguage, fetchRepositories } from "./github";

const repositoryMaxAge: number = Duration.fromObject({
  hours: 12
}).as("seconds");

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
    languages(languageIDs: [ID]!): [Language]
    repositories(languageID: ID): [Repository] @cacheControl(maxAge: ${repositoryMaxAge})
  }
`;

export default new ApolloServer({
  cacheControl: {
    defaultMaxAge: Duration.fromObject({ weeks: 2 }).as("seconds")
  },
  formatError: error => {
    console.error(error);
    return error;
  },
  resolvers: {
    Query: {
      async languages(_, { languageIDs }) {
        return await Promise.all(languageIDs.map(fetchLanguage));
      },
      async repositories(_, { languageID }) {
        return await fetchRepositories(languageID);
      }
    }
  },
  typeDefs
});
