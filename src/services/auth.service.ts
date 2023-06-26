import { fetchData } from "../api/wp-api";

export const AuthService = {
	async loginUser(username: string, password: string) {
		const data = await fetchData(`
		mutation LoginUser {
			login(input: { username: "${username}", password: "${password}" }) {
				user {
					id
					userId
					name
					firstName
					lastName
					username
					email
					avatar {
						url
					}
					roles {
						nodes {
							name
						}
					}
				}
			}
		}
  `);
		return data;
	},
};
