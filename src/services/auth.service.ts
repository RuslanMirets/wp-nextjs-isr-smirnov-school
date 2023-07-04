import Cookies from "js-cookie";
import { fetchData } from "../api/wp-api";

export const AuthService = {
	async refreshToken(refreshToken: string) {
		const data = await fetchData(`
			mutation RefreshAuthToken {
				refreshJwtAuthToken(input: {jwtRefreshToken: ${refreshToken}) {
					authToken
				}
			}
		`);
		Cookies.set("jwtAuthToken", data.data.refreshJwtAuthToken.authToken);

		return data;
	},
};
