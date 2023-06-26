import { ProductType } from "@/src/types/product.interface";
import styles from "./ProductCard.module.scss";
import Image from "next/image";

const ProductCard = ({ product }: ProductType) => {
	return (
		<div className={styles.root}>
			{product.featuredImage ? (
				<Image
					className={styles.image}
					src={product.featuredImage.node.sourceUrl}
					width={300}
					height={300}
					alt={product.title}
					priority={true}
				/>
			) : (
				<Image
					className={styles.image}
					src="/img/default.jpg"
					width={300}
					height={300}
					alt={product.title}
					priority={true}
				/>
			)}
			<div className={styles.content}>
				<div className={styles.title}>{product.title}</div>
				{product.price ? (
					<div className={styles.price}>{product.price} ₽</div>
				) : (
					<div>Цена отсутствует</div>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
