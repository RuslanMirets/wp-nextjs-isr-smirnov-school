import { fetchData } from "../api/wp-api";

export const PageService = {
	async getCGB() {
		const data = await fetchData(`
		query getCGB {
			page(id: "cgb", idType: URI) {
				title
				rm {
					introTitle
					introDesc
					workList {
						workListName
						workListImg {
							sourceUrl
						}
					}
				}
			}
		}	
  `);
		return data;
	},
};
