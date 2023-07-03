import Layout from "@/src/components/Layout";
import { IPost } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import styles from "./Post.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { PostApollo } from "@/src/apollo/post.apollo";
import { useState } from "react";
import { IRequestTime } from "@/src/types/request.interface";
import RequestTime from "@/src/components/request-time/RequestTime";

const Post = ({ requestBuildTime }: IRequestTime) => {
	const { query } = useRouter();

	const [requestTime, setRequestTime] = useState(0);

	const { data } = useQuery(PostApollo.GET_BY_SLUG, {
		variables: { id: query.slug },
		onCompleted: (data) => {
			const requestTime = new Date().getTime() - requestStartTime;
			setRequestTime(requestTime);
		},
	});

	const requestStartTime = new Date().getTime();

	const post: IPost = data.post;

	return (
		<Layout title={post.title}>
			<Container>
				<RequestTime
					requestBuildTime={requestBuildTime}
					requestTime={requestTime}
				/>
				<article>
					<Heading>{post.title}</Heading>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</Container>
		</Layout>
	);
};

export default Post;
