import { addApolloState, initializeApollo } from "@/src/apollo/apolloClient";
import { EventApollo } from "@/src/apollo/event.apollo";
import Event from "@/src/screens/event/Event";
import { EventService } from "@/src/services/event.service";
import { IEvents } from "@/src/types/events.interface";
import { GetStaticPaths, GetStaticProps } from "next";

const EventPage = () => {
	return <Event />;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await EventService.getAll();

	const events: IEvents[] = response.events;

	const paths = events.map((event) => {
		return {
			params: {
				id: event.id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const id = context.params?.id;

	const apolloClient = initializeApollo();

	await apolloClient.query({
		query: EventApollo.GET_BY_ID,
		variables: { id: id },
	});

	return addApolloState(apolloClient, {
		props: {},
	});
};

export default EventPage;
