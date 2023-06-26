export interface IProducts {
	databaseId: number;
	title: string;
	featuredImage: {
		node: {
			sourceUrl: string;
		};
	};
	price: string;
}

export interface IProduct extends IProducts {}

export type ProductsType = {
	products: IProducts[];
};

export type ProductType = {
	product: IProduct;
};
