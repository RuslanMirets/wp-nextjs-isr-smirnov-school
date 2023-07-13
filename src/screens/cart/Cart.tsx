import Layout from "@/src/components/Layout";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import CartTable from "./cart-table/CartTable";
import { ICartItem } from "@/src/types/cart.interface";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import styles from "./Cart.module.scss";
import { useCartStore } from "@/src/store/cart.store";

const Cart = () => {
	const cart = useCartStore((state) => state.cart);
	const cartLoading = useCartStore((state) => state.cartLoading);
	const cartItems: ICartItem[] = cart.cart?.contents.nodes;

	return (
		<Layout title="Корзина">
			<Container>
				<Heading>Корзина</Heading>
				{cartLoading ? (
					<div>Loading...</div>
				) : cartItems.length === 0 ? (
					<div>Корзина пуста</div>
				) : (
					<div className={styles.root}>
						<CartTable items={cartItems} />
						<div className={styles.checkout}>
							<Link href="/checkout">
								<Button>Оформить заказ</Button>
							</Link>
						</div>
					</div>
				)}
			</Container>
		</Layout>
	);
};

export default Cart;
