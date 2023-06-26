import Layout from "@/src/components/Layout";
import { PostType } from "@/src/types/post.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import styles from "./Post.module.scss";

const Post = ({ post }: PostType) => {
	return (
		<Layout title={post.title}>
			<Container>
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
