import { Button } from "@mui/material";
import styles from "./Revalidate.module.scss";

type Props = {
	url: string;
};

const Revalidate = ({ url }: Props) => {
	const handleClick = () => {
		fetch(
			`${process.env.WORDPRESS_API_URL}/api/revalidate?path=/${url}&token=L4aoVVfVZ8IZ76tTQGB9yMUT?IRbTUEibYZKKl1`,
		);
	};

	return (
		<Button className={styles.root} variant="contained" onClick={handleClick}>
			Revalidate
		</Button>
	);
};

export default Revalidate;
