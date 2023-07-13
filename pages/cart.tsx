import { withIsClient } from "@/src/hoc/withIsClient";
import Cart from "@/src/screens/cart/Cart";

const CartPage = () => {
	return <Cart />;
};

export default withIsClient(CartPage);
