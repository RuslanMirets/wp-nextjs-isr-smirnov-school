import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { PostApollo } from "@/src/apollo/post.apollo";
import Post from "@/src/screens/post/Post";
import { IPosts } from "@/src/types/post.interface";
import { GetStaticPaths, GetStaticProps } from "next";

const PostPage = () => {
	return <Post />;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();

	const { data } = await apolloClient.query({ query: PostApollo.GET_ALL });

	const posts: IPosts[] = data?.posts?.nodes;

	const paths = posts.map((post) => {
		return {
			params: {
				slug: post.slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug as string;

	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: PostApollo.GET_BY_SLUG,
		variables: { id: slug },
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default PostPage;
