import { gql } from "@apollo/client";

export const PostApollo = {
	GET_ALL: gql`
		query GetAll {
			posts(where: { categoryNotIn: "366" }, first: 999) {
				nodes {
					databaseId
					slug
					title
					excerpt
					date
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
			}
		}
	`,
	GET_BY_SLUG: gql`
		query GetBySlug($id: ID!) {
			post(id: $id, idType: SLUG) {
				databaseId
				title
				content
			}
		}
	`,
	GET_BY_SEARCH: gql`
		query GetBySearch($search: String) {
			posts(where: { search: $search }) {
				nodes {
					databaseId
					slug
					title
					excerpt
					date
					featuredImage {
						node {
							sourceUrl
						}
					}
				}
			}
		}
	`,
};
