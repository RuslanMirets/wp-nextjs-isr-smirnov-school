import { CartApollo } from "@/src/apollo/cart.apollo";
import Layout from "@/src/components/Layout";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";
import CartTable from "./cart-table/CartTable";
import { ICartItem } from "@/src/types/cart.interface";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import styles from "./Cart.module.scss";

const Cart = () => {
	const { data, loading } = useQuery(CartApollo.GET_CART);
	const cartItems: ICartItem[] = data?.cart.contents.nodes;

	return (
		<Layout title="Корзина">
			<Container>
				<Heading>Корзина</Heading>
				{loading ? (
					<div>Loading...</div>
				) : cartItems.length === 0 ? (
					<div>Корзина пуста</div>
				) : (
					<>
						<CartTable items={cartItems} />
						<div className={styles.checkout}>
							<Link href="/checkout">
								<Button>Оформить заказ</Button>
							</Link>
						</div>
					</>
				)}
			</Container>
		</Layout>
	);
};

export default Cart;
