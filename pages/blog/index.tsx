import Blog from "@/src/screens/blog/Blog";
import { PostService } from "@/src/services/post.service";
import { PostsType } from "@/src/types/post.interface";
import { GetStaticProps } from "next";

const BlogPage = ({ posts }: PostsType) => {
	return <Blog posts={posts} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const data = await PostService.getAll();

	return {
		props: {
			posts: data.data.posts.nodes,
		},
	};
};

export default BlogPage;
