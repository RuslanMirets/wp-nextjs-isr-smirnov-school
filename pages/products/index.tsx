import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { ProductApollo } from "@/src/apollo/product.apollo";
import Products from "@/src/screens/products/Products";
import { IRequestTime } from "@/src/types/request.interface";
import { GetStaticProps } from "next";

const ProductsPage = ({ requestBuildTime }: IRequestTime) => {
	return <Products requestBuildTime={requestBuildTime} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo();

	const start = Date.now();

	await apolloClient.query({
		query: ProductApollo.GET_ALL,
	});

	const end = Date.now() - start;

	return addApolloState(apolloClient, {
		props: {
			requestBuildTime: end,
		},
	});
};

export default ProductsPage;
