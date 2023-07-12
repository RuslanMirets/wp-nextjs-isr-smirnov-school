import { gql } from "@apollo/client";

export const CartApollo = {
	GET_CART: gql`
		query GetCart {
			cart {
				total(format: RAW)
				isEmpty
				contents {
					nodes {
						key
						quantity
						total(format: RAW)
						product {
							node {
								databaseId
								title
								featuredImage {
									node {
										sourceUrl
									}
								}
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
							key
							quantity
							total(format: RAW)
							product {
								node {
									databaseId
									title
									featuredImage {
										node {
											sourceUrl
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`,

	REMOVE_ITEM_FROM_CART: gql`
		mutation RemoveItemFromCart($keys: [ID]) {
			removeItemsFromCart(input: { keys: $keys }) {
				cart {
					total(format: RAW)
					contents {
						nodes {
							key
							quantity
							total(format: RAW)
							product {
								node {
									databaseId
									title
									featuredImage {
										node {
											sourceUrl
										}
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
