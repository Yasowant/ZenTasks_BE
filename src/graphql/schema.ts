import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    refreshToken: String!
  }

  type Query {
    getUser(id: ID!): User!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    updateUser(id: ID!, name: String, email: String): User!
    logout(refreshToken: String!): Boolean!
  }
`);
