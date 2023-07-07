import Events from "@/src/screens/events/Events";
import { EventService } from "@/src/services/event.service";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticProps } from "next";

const EventsPage = () => {
	return <Events />;
};

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(["events"], EventService.getAll);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default EventsPage;
