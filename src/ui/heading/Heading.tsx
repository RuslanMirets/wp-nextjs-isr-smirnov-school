import { PropsWithChildren } from "react";
import styles from "./Heading.module.scss";
import classNames from "classnames";

type Props = {
	center?: boolean;
};

const Heading = ({ children, center }: PropsWithChildren<Props>) => {
	return (
		<h1 className={classNames(styles.root, center && styles.center)}>
			{children}
		</h1>
	);
};

export default Heading;
