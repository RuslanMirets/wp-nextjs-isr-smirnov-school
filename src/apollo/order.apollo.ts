import { gql } from "@apollo/client";

export const OrderApollo = {
	GET_BY_USER: gql`
		query Orders {
			customer(customerId: 7938) {
				email
				orders {
					nodes {
						date
						lineItems {
							nodes {
								product {
									node {
										name
									}
								}
							}
						}
					}
				}
			}
		}
	`,
};
