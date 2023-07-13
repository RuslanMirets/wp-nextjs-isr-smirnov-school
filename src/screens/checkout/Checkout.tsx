import Layout from "@/src/components/Layout";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import React from "react";
import CheckoutForm from "./checkout-form/CheckoutForm";

const Checkout = () => {
	return (
		<Layout title="Оформление заказа">
			<Container>
				<Heading>Оформление заказа</Heading>
				<CheckoutForm />
			</Container>
		</Layout>
	);
};

export default Checkout;
