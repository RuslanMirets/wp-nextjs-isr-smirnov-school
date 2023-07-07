import { EventApollo } from "@/src/apollo/event.apollo";
import Layout from "@/src/components/Layout";
import { IEvent } from "@/src/types/events.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "./Event.module.scss";
import AddToCart from "@/src/components/add-to-cart/AddToCart";

const Event = () => {
	const { query } = useRouter();

	const { data } = useQuery(EventApollo.GET_BY_ID, {
		variables: { id: query.id },
	});

	const event: IEvent = data?.event;

	return (
		<Layout title="Event">
			<Container>
				<Heading>{event.title}</Heading>
				<div className={styles.content}>
					<div>{event.startDate}</div>
					<div>
						<div>
							<b>Описание:</b>
						</div>
						<div dangerouslySetInnerHTML={{ __html: event.excerpt }} />
					</div>
					{Boolean(event.wooTickets.nodes[0]) && (
						<div className={styles.ticket}>
							<div>{event.wooTickets.nodes[0].title}</div>
							<div>{event.wooTickets.nodes[0].databaseId}</div>

							<AddToCart product={event.wooTickets.nodes[0]} />
						</div>
					)}
				</div>
			</Container>
		</Layout>
	);
};

export default Event;
