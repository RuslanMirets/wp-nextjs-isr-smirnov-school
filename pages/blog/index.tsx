import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { PostApollo } from "@/src/apollo/post.apollo";
import Blog from "@/src/screens/blog/Blog";
import { IRequestTime } from "@/src/types/request.interface";
import { GetStaticProps } from "next";

const BlogPage = ({ requestBuildTime }: IRequestTime) => {
	return <Blog requestBuildTime={requestBuildTime} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();

	const start = Date.now();

	await apolloClient.query({
		query: PostApollo.GET_ALL,
	});

	const end = Date.now() - start;

	return addApolloState(apolloClient, {
		props: {
			requestBuildTime: end,
		},
	});
};

export default BlogPage;
