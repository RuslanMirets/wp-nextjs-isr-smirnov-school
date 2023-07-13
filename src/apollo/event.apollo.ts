import { gql } from "@apollo/client";

export const EventApollo = {
	GET_BY_ID: gql`
		query GetById($id: ID!, $idType: EventIdType = DATABASE_ID) {
			event(id: $id, idType: $idType) {
				title
				startDate
				excerpt
				wooTickets {
					nodes {
						databaseId
						title
					}
				}
			}
		}
	`,
};
