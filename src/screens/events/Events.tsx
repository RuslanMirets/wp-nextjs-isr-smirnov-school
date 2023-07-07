import Layout from "@/src/components/Layout";
import EventItem from "@/src/components/event-item/EventItem";
import { EventService } from "@/src/services/event.service";
import { IEvents } from "@/src/types/events.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@tanstack/react-query";
import styles from "./Events.module.scss";

const Events = () => {
	const { data, isLoading } = useQuery(["events"], EventService.getAll);

	const events: IEvents[] = data?.events;

	return (
		<Layout title="Мероприятия">
			<Container>
				<Heading>Мероприятия</Heading>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<ul className={styles.list}>
						{events.map((event) => (
							<li key={event.id}>
								<EventItem event={event} />
							</li>
						))}
					</ul>
				)}
			</Container>
		</Layout>
	);
};

export default Events;
