import Meta from "./Meta";
import { IMeta } from "../types/meta.interface";
import Header from "./header/Header";
import { Roboto, Manrope } from "next/font/google";
import { PropsWithChildren } from "react";
import Loader from "./loader/Loader";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
});
export const manrope = Manrope({ subsets: ["latin"] });

const Layout = ({
	children,
	title,
	description,
	image,
	withHeader = true,
}: PropsWithChildren<IMeta>) => {
	return (
		<>
			<Meta title={title} description={description} image={image} />
			<div className={roboto.className}>
				{withHeader && <Header />}
				<main>{children}</main>
				<Loader />
			</div>
		</>
	);
};

export default Layout;
