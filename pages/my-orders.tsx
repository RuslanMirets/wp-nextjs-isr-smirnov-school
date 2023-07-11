import { OrderApollo } from "@/src/apollo/order.apollo";
import Layout from "@/src/components/Layout";
import Container from "@/src/ui/container/Container";
import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MyOrders = () => {
	const { data, loading, error } = useQuery(OrderApollo.GET_BY_USER);

	const router = useRouter();

	const session = useSession();

	useEffect(() => {
		if (!session.data && session.status !== "loading") {
			router.replace("/login");
		}
	}, [session, router]);

	if (!session.data) return null;

	return (
		<Layout title="TEST">
			<Container>
				{loading ? (
					<div>Loading...</div>
				) : data ? (
					<div>{data.customer.email}</div>
				) : (
					<div>{error?.message}</div>
				)}
			</Container>
		</Layout>
	);
};

export default MyOrders;
