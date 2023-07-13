import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/src/screens/cart/Cart"), { ssr: false });

const CartPage = () => {
	return <Cart />;
};

export default CartPage;
