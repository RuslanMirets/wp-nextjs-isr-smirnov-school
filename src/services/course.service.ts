import axios from "axios";

export const CourseService = {
	async getAll() {
		const response = await axios.get(
			`${process.env.WORDPRESS_API_URL}/wp-json/ldlms/v1/sfwd-courses?per_page=100`,
			{ headers: { "Content-Type": "application/json" } },
		);

		return response.data;
	},
};
