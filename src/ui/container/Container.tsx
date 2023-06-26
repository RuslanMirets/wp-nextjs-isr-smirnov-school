import { PropsWithChildren } from "react";
import styles from "./Container.module.scss";

const Container = ({ children }: PropsWithChildren) => {
	return <div className={styles.root}>{children}</div>;
};

export default Container;
