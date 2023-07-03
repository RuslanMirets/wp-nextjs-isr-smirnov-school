import Link from "next/link";
import styles from "./PostCard.module.scss";
import { IPosts } from "@/src/types/post.interface";
import Image from "next/image";

type Props = {
	post: IPosts;
};

const PostCard = ({ post }: Props) => {
	return (
		<Link className={styles.root} href={`/blog/${post.slug}`}>
			{post.featuredImage ? (
				<Image
					className={styles.image}
					src={post.featuredImage.node.sourceUrl}
					width={300}
					height={300}
					alt={post.title}
				/>
			) : (
				<Image
					className={styles.image}
					src="/img/default.jpg"
					width={300}
					height={300}
					alt={post.title}
				/>
			)}
			<div className={styles.content}>
				<div className={styles.title}>{post.title}</div>
			</div>
		</Link>
	);
};

export default PostCard;
