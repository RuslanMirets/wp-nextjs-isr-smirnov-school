import Post from "@/src/screens/post/Post";
import { PostService } from "@/src/services/post.service";
import { IPosts, PostType } from "@/src/types/post.interface";
import { GetStaticPaths, GetStaticProps } from "next";

const PostPage = ({ post }: PostType) => {
	return <Post post={post} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await PostService.getAll();

	const posts: IPosts[] = response?.data?.posts?.nodes;

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
	const response = await PostService.getBySlug(slug);

	const post = response.data.post;

	return {
		props: {
			post: post,
		},
	};
};

export default PostPage;
