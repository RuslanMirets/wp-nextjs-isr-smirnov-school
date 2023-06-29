export const fetchData = async (query: string) => {
	const headers = { "Content-Type": "application/json" };

	const start = Date.now();

	const response = await fetch(`${process.env.WORDPRESS_API_URL}/graphql`, {
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
