import { PostApollo } from "@/src/apollo/post.apollo";
import Layout from "@/src/components/Layout";
import PostsList from "@/src/components/posts-list/PostsList";
import RequestTime from "@/src/components/request-time/RequestTime";
import { IRequestTime } from "@/src/types/request.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const Blog = ({ requestTime }: IRequestTime) => {
	const start = Date.now();

	const { data } = useQuery(PostApollo.GET_ALL);

	const end = Date.now() - start;
	const [time, setTime] = useState(0);
	useEffect(() => {
		setTime(end);
	}, []);

	const posts = data?.posts.nodes;

	return (
		<Layout title="Блог">
			<Container>
				<Heading>Блог</Heading>
				<RequestTime requestTime={requestTime} receiveTime={time} />
				<PostsList posts={posts} />
			</Container>
		</Layout>
	);
};

export default Blog;
