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

	GET_PAYMENTS: gql`
		query GetAll {
			paymentGateways {
				nodes {
					id
					title
					description
					icon
				}
			}
		}
	`,

	CHECKOUT: gql`
		mutation CHECKOUT_MUTATION(
			$paymentMethod: String
			$firstName: String
			$lastName: String
			$email: String
			$phone: String
		) {
			checkout(
				input: {
					paymentMethod: $paymentMethod
					billing: {
						firstName: $firstName
						lastName: $lastName
						email: $email
						phone: $phone
					}
				}
			) {
				clientMutationId
				order {
					id
					orderKey
					orderNumber
					status
					refunds {
						nodes {
							amount
						}
					}
				}
				result
				redirect
			}
		}
	`,
};
