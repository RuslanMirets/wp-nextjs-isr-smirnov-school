import { IRequestTime } from "@/src/types/request.interface";
import styles from "./RequestTime.module.scss";

const RequestTime = ({ requestBuildTime, requestTime }: IRequestTime) => {
	return (
		<div className={styles.root}>
			{Boolean(requestBuildTime) && (
				<div>
					Время выполнения запроса на этапе сборки: {requestBuildTime} мс
				</div>
			)}
			<div>Время выполнения запроса: {requestTime} мс</div>
		</div>
	);
};

export default RequestTime;
