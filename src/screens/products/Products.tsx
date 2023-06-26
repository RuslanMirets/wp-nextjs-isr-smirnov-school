import Layout from "@/src/components/Layout";
import { ProductsType } from "@/src/types/product.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import styles from "./Products.module.scss";
import ProductCard from "@/src/components/product-card/ProductCard";

const Products = ({ products }: ProductsType) => {
	return (
		<Layout title="Товары">
			<Container>
				<Heading>Товары</Heading>
				<ul className={styles.list}>
					{products.map((product) => (
						<li key={product.databaseId}>
							<ProductCard product={product} />
						</li>
					))}
				</ul>
			</Container>
		</Layout>
	);
};

export default Products;
