import Products from "@/src/screens/products/Products";
import { ProductService } from "@/src/services/product.service";
import { ProductsType } from "@/src/types/product.interface";
import { GetStaticProps } from "next";

const ProductsPage = ({ products }: ProductsType) => {
	return <Products products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
	const data = await ProductService.getAll();

	return {
		props: {
			products: data.data.products.nodes,
		},
	};
};

export default ProductsPage;
