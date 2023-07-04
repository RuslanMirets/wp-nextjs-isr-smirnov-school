import { OrderApollo } from "@/src/apollo/order.apollo";
import Layout from "@/src/components/Layout";
import Container from "@/src/ui/container/Container";
import { useQuery } from "@apollo/client";
import React from "react";

const MyOrders = () => {
	const { data, loading } = useQuery(OrderApollo.GET_BY_USER);

	return (
		<Layout title="TEST">
			<Container>
				{loading ? <div>Loading...</div> : <div>{data.customer.email}</div>}
			</Container>
		</Layout>
	);
};

export default MyOrders;
