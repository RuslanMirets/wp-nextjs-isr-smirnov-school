import styles from "./RequestTime.module.scss";

type Props = {
	requestTime: number;
	receiveTime?: number;
};

const RequestTime = ({ requestTime, receiveTime }: Props) => {
	return (
		<div className={styles.root}>
			<div>
				Время выполнения запроса {Boolean(receiveTime) && "на этапе сборки"}:{" "}
				{requestTime} мс
			</div>
			{Boolean(receiveTime) && (
				<div>Время получения данных: {receiveTime} мс</div>
			)}
		</div>
	);
};

export default RequestTime;
