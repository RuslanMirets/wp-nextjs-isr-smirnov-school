import { EventType } from "@/src/types/events.interface";
import styles from "./EventItem.module.scss";
import Link from "next/link";

const EventItem = ({ event }: EventType) => {
	return (
		<div className={styles.root}>
			<div className={styles.date}>{event.start_date}</div>
			<Link className={styles.title} href={`events/${event.id}`}>
				{event.title}
			</Link>
			<div>
				<div>
					<b>Описание:</b>
				</div>
				<div dangerouslySetInnerHTML={{ __html: event.description }} />
			</div>
		</div>
	);
};

export default EventItem;
