import { axiosClassic } from "../api/interceptors";

export const EventService = {
	async getAll() {
		const response = await axiosClassic.get("/wp-json/tribe/events/v1/events");
		return response.data;
	},
};
