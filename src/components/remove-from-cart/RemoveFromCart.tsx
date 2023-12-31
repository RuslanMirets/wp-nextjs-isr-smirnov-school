import { CartApollo } from "@/src/apollo/cart.apollo";
import { useCartStore } from "@/src/store/cart.store";
import { useMutation } from "@apollo/client";
import { Button } from "@chakra-ui/react";

type Props = {
	cartKey: string;
};

const RemoveFromCart = ({ cartKey }: Props) => {
	const updateCart = useCartStore((state) => state.updateCart);

	const [removeItem, { loading: removeLoading }] = useMutation(
		CartApollo.REMOVE_ITEM_FROM_CART,
		{
			onCompleted: (data) => {
				updateCart(data.removeItemsFromCart);
			},
		},
	);

	const handleRemoveItem = async (key: string) => {
		await removeItem({ variables: { keys: key } });
	};

	return (
		<Button
			colorScheme="red"
			onClick={() => handleRemoveItem(cartKey)}
			isLoading={removeLoading}
		>
			Удалить
		</Button>
	);
};

export default RemoveFromCart;
