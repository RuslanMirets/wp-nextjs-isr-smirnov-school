import { gql } from "@apollo/client";

export const AuthApollo = {
	LOGIN: gql`
		mutation Login($username: String!, $password: String!) {
			login(input: { username: $username, password: $password }) {
				user {
					id
					userId
					name
					email
					avatar {
						url
					}
					jwtAuthToken
					jwtRefreshToken
				}
			}
		}
	`,
};
