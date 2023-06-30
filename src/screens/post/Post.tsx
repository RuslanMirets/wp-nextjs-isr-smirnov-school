import Layout from "@/src/components/Layout";
import { IPost } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import styles from "./Post.module.scss";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { PostApollo } from "@/src/apollo/post.apollo";
import { useState, useEffect } from "react";
import { IRequestTime } from "@/src/types/request.interface";
import RequestTime from "@/src/components/request-time/RequestTime";

const Post = ({ requestTime }: IRequestTime) => {
	const { query } = useRouter();

	const start = Date.now();

	const { data } = useQuery(PostApollo.GET_BY_SLUG, {
		variables: { id: query.slug },
	});

	const end = Date.now() - start;
	const [time, setTime] = useState(0);
	useEffect(() => {
		setTime(end);
	}, []);

	const post: IPost = data.post;

	return (
		<Layout title={post.title}>
			<Container>
				<RequestTime requestTime={requestTime} receiveTime={time} />
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
