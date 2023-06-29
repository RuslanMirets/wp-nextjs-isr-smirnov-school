import Cookies from "js-cookie";
import { fetchData } from "../api/wp-api";

export const AuthService = {
	async login(username: string, password: string) {
		const data = await fetchData(`
			mutation LoginUser {
				login(input: { username: "${username}", password: "${password}" }) {
					user {
						id
						userId
						name
						email
						avatar {
							url
						}
						jwtAuthToken
						jwtRefreshToken
					}
				}
			}
		`);

		const user = data.data.login.user;

		const { jwtAuthToken, jwtRefreshToken, ...returnUser } = user;

		if (user.jwtAuthToken) {
			Cookies.set("next-jwtAuthToken", user.jwtAuthToken);
			Cookies.set("next-jwtRefreshToken", user.jwtRefreshToken);
			localStorage.setItem("next-user", JSON.stringify(returnUser));
		}

		return data;
	},
};
