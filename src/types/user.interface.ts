// export interface IUser {
// 	user: {
// 		id: string;
// 		userId?: number;
// 		name: string;
// 		email: string;
// 		avatar: {
// 			url: string;
// 		};
// 		image: string;
// 		requestTime: number;
// 	};
// }

export interface IUser {
	databaseId: number;
	email: string;
	name: string;
}
