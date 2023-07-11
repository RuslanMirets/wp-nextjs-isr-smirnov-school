import { gql } from "@apollo/client";

export const OrderApollo = {
	GET_BY_USER: gql`
		query Orders {
			customer {
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
