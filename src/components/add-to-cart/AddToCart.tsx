import { CartApollo } from "@/src/apollo/cart.apollo";
import { useCartStore } from "@/src/store/cart.store";
import { ProductType } from "@/src/types/product.interface";
import { useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";

const AddToCart = ({ product }: ProductType) => {
	const toast = useToast();

	const updateCart = useCartStore((state) => state.updateCart);

	const [addToCart, { loading: addToCartLoading }] = useMutation(
		CartApollo.ADD_TO_CART,
		{
			variables: { productId: product.databaseId },
			onCompleted: (data) => {
				updateCart(data.addToCart);
			},
			onError: (error) => {
				toast({
					title: error.name,
					description: error.message,
					status: "error",
					duration: 4000,
					position: "bottom-left",
					isClosable: true,
				});
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
