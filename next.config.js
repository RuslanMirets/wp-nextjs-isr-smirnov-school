/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		WORDPRESS_API_URL: process.env.WORDPRESS_API_URL,
		REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN,
	},
	images: {
		domains: [
			"dev.smirnov.school",
			"lh3.googleusercontent.com",
			"localhost",
			"avatars.yandex.net",
		],
	},
};

module.exports = nextConfig;
