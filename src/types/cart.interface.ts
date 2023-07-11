export interface ICartItem {
	key: string;
	quantity: number;
	total: number;
	product: {
		node: {
			databaseId: number;
			title: string;
			featuredImage: {
				node: {
					sourceUrl: string;
				};
			};
		};
	};
}

export type CartItemType = {
	product: ICartItem;
};
