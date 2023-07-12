import { CartApollo } from "@/src/apollo/cart.apollo";
import { useCartStore } from "@/src/store/cart.store";
import { ProductType } from "@/src/types/product.interface";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";

const AddToCart = ({ product }: ProductType) => {
	const updateCart = useCartStore((state) => state.updateCart);

	const { refetch } = useQuery(CartApollo.GET_CART, {
		notifyOnNetworkStatusChange: true,
	});

	const [addToCart, { loading: addToCartLoading }] = useMutation(
		CartApollo.ADD_TO_CART,
		{
			variables: { productId: product.databaseId },
			onCompleted: (data) => {
				updateCart(data.addToCart);
				localStorage.setItem("woo-next-cart", JSON.stringify(data.addToCart));
				refetch();
			},
		},
	);

	const handleAddToCart = async () => {
		await addToCart();
	};

	return (
		<Button onClick={handleAddToCart} isLoading={addToCartLoading}>
			Купить
		</Button>
	);
};

export default AddToCart;
