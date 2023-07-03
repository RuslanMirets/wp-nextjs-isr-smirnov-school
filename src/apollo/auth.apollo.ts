import { gql } from "@apollo/client";

export const AuthApollo = {
	LOGIN: gql`
		mutation Login($username: String!, $password: String!) {
			login(input: { username: $username, password: $password }) {
				user {
					databaseId
					name
					email
					jwtAuthToken
					jwtRefreshToken
				}
			}
		}
	`,
};
