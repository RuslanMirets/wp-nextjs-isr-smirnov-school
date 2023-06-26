import Head from "next/head";
import { IMeta } from "../types/meta.interface";

export const titleMerge = (title: string) => `${title} | Smirnov School`;

const Meta = ({ title, description }: IMeta) => {
	return (
		<>
			<Head>
				<title itemProp="headline">{titleMerge(title)}</title>
				<meta
					itemProp="description"
					name="description"
					content={description ? description : "Описание"}
				/>
			</Head>
		</>
	);
};

export default Meta;
