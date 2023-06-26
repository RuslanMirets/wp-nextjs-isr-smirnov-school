import styles from "./RequestTime.module.scss";

type Props = {
	requestTime: number;
};

const RequestTime = ({ requestTime }: Props) => {
	return (
		<div className={styles.root}>
			Время выполнения запроса: {requestTime} мс
		</div>
	);
};

export default RequestTime;
