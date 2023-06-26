import { fetchData } from "../api/wp-api";

export const ProductService = {
	async getAll() {
		const data = await fetchData(`
		query getAll {
			products(where: { type: SIMPLE }, first: 99) {
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
  `);
		return data;
	},
};
