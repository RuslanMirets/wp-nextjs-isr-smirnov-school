import { gql } from "@apollo/client";

export const CartApollo = {
	GET_CART: gql`
		query GetCart {
			cart {
				total(format: RAW)
				isEmpty
				contents {
					nodes {
						quantity
						product {
							node {
								title
							}
						}
					}
				}
			}
		}
	`,

	ADD_TO_CART: gql`
		mutation AddToCart($productId: Int!, $quantity: Int = 1) {
			addToCart(input: { productId: $productId, quantity: $quantity }) {
				cart {
					total(format: RAW)
					contents {
						nodes {
							product {
								node {
									title
								}
							}
						}
					}
				}
			}
		}
	`,
};
