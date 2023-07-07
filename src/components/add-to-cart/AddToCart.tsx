import { CartApollo } from "@/src/apollo/cart.apollo";
import { ProductType } from "@/src/types/product.interface";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React from "react";

const AddToCart = ({ product }: ProductType) => {
	const { data: cartData, refetch } = useQuery(CartApollo.GET_CART, {
		notifyOnNetworkStatusChange: true,
		onCompleted: () => {
			// console.log(cartData);
		},
	});

	const [addToCart, { data: addToCartData, loading: addToCartLoading }] =
		useMutation(CartApollo.ADD_TO_CART, {
			variables: { productId: product.databaseId },
			onCompleted: () => {
				refetch();
			},
		});

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
