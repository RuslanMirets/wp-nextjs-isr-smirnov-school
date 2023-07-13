import Link from "next/link";
import styles from "./CartIcon.module.scss";
import { BsCart2 } from "react-icons/bs";
import { useCartStore } from "@/src/store/cart.store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const excludePathnames = ["/cart", "/checkout", "/login"];

const CartIcon = () => {
	const cart = useCartStore((state) => state.cart);
	const totalQuantity = cart.cart?.contents.nodes.reduce(
		(initQuantity: number, item: any) => initQuantity + item.quantity,
		0,
	);

	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);

	const { pathname } = useRouter();
	const isPathMatched = excludePathnames.some((path) => pathname == path);

	if (!Object.keys(cart).length || totalQuantity == 0 || isPathMatched)
		return null;

	return (
		isClient && (
			<Link className={styles.root} href="/cart">
				<BsCart2 size={30} />
				<span className={styles.quantity}>{totalQuantity}</span>
			</Link>
		)
	);
};

export default CartIcon;
