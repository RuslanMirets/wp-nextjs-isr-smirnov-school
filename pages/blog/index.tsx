import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { PostApollo } from "@/src/apollo/post.apollo";
import Blog from "@/src/screens/blog/Blog";
import { GetStaticProps } from "next";

const BlogPage = () => {
	return <Blog />;
};

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: PostApollo.GET_ALL,
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default BlogPage;
