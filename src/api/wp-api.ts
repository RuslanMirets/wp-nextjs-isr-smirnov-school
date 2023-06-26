import axios from "axios";

export const fetchData = async (query: string) => {
	const headers = { "Content-Type": "application/json" };

	const start = Date.now();

	const response = await fetch(`http://localhost/smirnov-school/graphql`, {
		next: { revalidate: 60 },
		headers,
		method: "POST",
		body: JSON.stringify({
			query,
		}),
	});

	if (!response.ok) throw new Error("Failed to fetch data");

	const end = Date.now() - start;

	const json = await response.json();
	return { ...json, requestTime: end };

	// return response.json();
};

// export const fetchData = async (query: string) => {
// 	const start = Date.now();

// 	const response = await axios.request({
// 		method: "POST",
// 		url: `${process.env.WORDPRESS_API_URL}/graphql`,
// 		headers: { "Content-Type": "application/json" },
// 		data: { query: query },
// 	});

// 	const end = Date.now() - start;

// 	return { ...response.data, requestTime: end };
// };
