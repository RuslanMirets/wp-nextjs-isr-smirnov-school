import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { ProductApollo } from "@/src/apollo/product.apollo";
import Products from "@/src/screens/products/Products";
import { GetStaticProps } from "next";

const ProductsPage = () => {
	return <Products />;
};

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: ProductApollo.GET_ALL,
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default ProductsPage;
