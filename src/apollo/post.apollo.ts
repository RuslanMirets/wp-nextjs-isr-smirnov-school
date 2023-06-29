import { gql } from "@apollo/client";

export const PostApollo = {
	GET_ALL: gql`
		query getAll {
			posts(where: { categoryNotIn: "366" }) {
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
		query getBySlug($id: ID!) {
			post(id: $id, idType: SLUG) {
				databaseId
				title
				content
			}
		}
	`,
	GET_BY_SEARCH: gql`
		query getBySearch($search: String) {
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
