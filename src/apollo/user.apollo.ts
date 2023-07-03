import { gql } from "@apollo/client";

export const UserApollo = {
	GET_PROFILE: gql`
		query GetProfile {
			viewer {
				databaseId
				email
				name
			}
		}
	`,
};
