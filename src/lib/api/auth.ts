import { UserAuthenticationWithPasswordResult } from "../types/auth";
import { graphql, useGraphql } from "./base";

export function useUsers() {
  return useGraphql(/* GraphQL */ `
    query {
      users {
        id
        name
      }
    }
  `);
}

export async function authenticateUserWithPassword(variables: {
  email: string;
  password: string;
}) {
  const response = await graphql(
    /* GraphQL */ `
      mutation Mutation($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
          ... on UserAuthenticationWithPasswordSuccess {
            item {
              name
              email
              role
            }
            sessionToken
          }
          ... on UserAuthenticationWithPasswordFailure {
            message
          }
        }
      }
    `,
    variables
  );
  return response.data
    ?.authenticateUserWithPassword as UserAuthenticationWithPasswordResult;
}
