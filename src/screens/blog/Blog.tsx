import { PostApollo } from "@/src/apollo/post.apollo";
import Layout from "@/src/components/Layout";
import PostsList from "@/src/components/posts-list/PostsList";
import RequestTime from "@/src/components/request-time/RequestTime";
import { IRequestTime } from "@/src/types/request.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Blog = ({ requestBuildTime }: IRequestTime) => {
	const [requestTime, setRequestTime] = useState(0);

	const { data } = useQuery(PostApollo.GET_ALL, {
		onCompleted: (data) => {
			const requestTime = new Date().getTime() - requestStartTime;
			setRequestTime(requestTime);
		},
	});

	const requestStartTime = new Date().getTime();

	const posts = data?.posts.nodes;

	return (
		<Layout title="Блог">
			<Container>
				<Heading>Блог</Heading>
				<RequestTime
					requestBuildTime={requestBuildTime}
					requestTime={requestTime}
				/>
				<PostsList posts={posts} />
			</Container>
		</Layout>
	);
};

export default Blog;
