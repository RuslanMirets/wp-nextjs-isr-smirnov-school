import Layout from "@/src/components/Layout";
import PostsList from "@/src/components/posts-list/PostsList";
import { PostsType } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";

const Blog = ({ posts }: PostsType) => {
	return (
		<Layout title="Блог">
			<Container>
				<Heading>Блог</Heading>
				<PostsList posts={posts} />
			</Container>
		</Layout>
	);
};

export default Blog;
