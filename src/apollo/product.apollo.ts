import { gql } from "@apollo/client";

export const ProductApollo = {
	GET_ALL: gql`
		query getAll {
			products(first: 999) {
				nodes {
					databaseId
					title
					featuredImage {
						node {
							sourceUrl
						}
					}
					... on SimpleProduct {
						price(format: RAW)
					}
				}
			}
		}
	`,
};
