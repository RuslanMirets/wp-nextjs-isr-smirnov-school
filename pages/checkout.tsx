import { withIsClient } from "@/src/hoc/withIsClient";
import Checkout from "@/src/screens/checkout/Checkout";

const CheckoutPage = () => {
	return <Checkout />;
};

export default withIsClient(CheckoutPage);
