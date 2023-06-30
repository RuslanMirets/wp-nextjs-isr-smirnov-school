import Layout from "@/src/components/Layout";
import { IProducts } from "@/src/types/product.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import styles from "./Products.module.scss";
import ProductCard from "@/src/components/product-card/ProductCard";
import { useQuery } from "@apollo/client";
import { ProductApollo } from "@/src/apollo/product.apollo";
import { useEffect, useState } from "react";
import { IRequestTime } from "@/src/types/request.interface";
import RequestTime from "@/src/components/request-time/RequestTime";

const Products = ({ requestTime }: IRequestTime) => {
	const start = Date.now();

	const { data } = useQuery(ProductApollo.GET_ALL);

	const end = Date.now() - start;
	const [time, setTime] = useState(0);
	useEffect(() => {
		setTime(end);
	}, []);

	const products: IProducts[] = data?.products.nodes;

	return (
		<Layout title="Товары">
			<Container>
				<Heading>Товары</Heading>
				<RequestTime requestTime={requestTime} receiveTime={time} />
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
