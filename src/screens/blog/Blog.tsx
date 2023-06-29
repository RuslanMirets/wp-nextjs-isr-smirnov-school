import { PostApollo } from "@/src/apollo/post.apollo";
import Layout from "@/src/components/Layout";
import PostsList from "@/src/components/posts-list/PostsList";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";

const Blog = () => {
	const { data } = useQuery(PostApollo.GET_ALL);

	const posts = data?.posts.nodes;

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
