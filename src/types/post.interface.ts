export interface IPosts {
	databaseId: number;
	slug: string;
	title: string;
	excertp: string;
	featuredImage: {
		node: {
			sourceUrl: string;
		};
	};
	date: string;
}

export interface IPost extends IPosts {
	content: string;
}

export type PostsType = {
	posts: IPosts[];
};

export type PostType = {
	post: IPost;
};
