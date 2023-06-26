import { PropsWithChildren } from "react";
import styles from "./Heading.module.scss";
import clsx from "clsx";

type Props = {
	center?: boolean;
};

const Heading = ({ children, center }: PropsWithChildren<Props>) => {
	return (
		<h1 className={clsx(styles.root, center && styles.center)}>{children}</h1>
	);
};

export default Heading;
