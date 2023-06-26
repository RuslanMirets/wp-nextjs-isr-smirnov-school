import PostCard from "../post-card/PostCard";
import styles from "./PostsList.module.scss";
import { PostsType } from "@/src/types/post.interface";

const PostsList = ({ posts }: PostsType) => {
	return (
		<ul className={styles.root}>
			{posts.map((post) => (
				<li key={post.databaseId}>
					<PostCard post={post} />
				</li>
			))}
		</ul>
	);
};

export default PostsList;
