import styles from "./AuthTime.module.scss";

type Props = {
	authTime: number;
};

const AuthTime = ({ authTime }: Props) => {
	return <div className={styles.root}>Время авторизации: {authTime} мс</div>;
};

export default AuthTime;
