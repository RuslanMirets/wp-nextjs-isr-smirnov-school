import { IProduct } from "./product.interface";

export interface IEvents {
	id: number;
	title: string;
	description: string;
	start_date: string;
	slug: string;
}

export interface IEvent {
	title: string;
	startDate: string;
	excerpt: string;
	wooTickets: {
		nodes: [IProduct];
	};
}

export type EventType = {
	event: IEvents;
};
