import { ApolloServer, gql } from "apollo-server-express";

import { repositoriesToDays } from "../domain";
import { fetchLanguage, fetchRepositories } from "./github";

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
    days(languageID: ID): [Day] @cacheControl(maxAge: 43200)
    languages(languageIDs: [ID]!): [Language] @cacheControl(maxAge: 2592000)
    repositories(languageID: ID): [Repository] @cacheControl(maxAge: 43200)
  }
`;

export default new ApolloServer({
  cacheControl: true,
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
      },
      async days(_, { languageID }) {
        return repositoriesToDays(await fetchRepositories(languageID)).map(
          day => ({ ...day, id: languageID + "-" + day.date })
        );
      }
    }
  },
  typeDefs
});
