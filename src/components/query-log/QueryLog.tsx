import styles from "./QueryLog.module.scss";

type Props = {
	queryCount: number;
	totalTime: number;
	graphqlSmartCache: string;
};

const QueryLog = ({ queryCount, totalTime, graphqlSmartCache }: Props) => {
	return (
		<div className={styles.root}>
			<div>
				{graphqlSmartCache ? (
					<div className={styles.cache}>
						Этот ответ не был выполнен во время выполнения, но был возвращен из
						кэша объектов GraphQL
					</div>
				) : (
					<div className={styles.noCache}>
						Этот ответ был выполнен во время выполнения, и не был возвращен из
						кэша объектов GraphQL
					</div>
				)}
			</div>
			<div>Query count: {queryCount}</div>
			<div>Total time: {totalTime}</div>
		</div>
	);
};

export default QueryLog;
