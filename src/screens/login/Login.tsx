import clsx from "clsx";
import styles from "./Login.module.scss";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./login-form/LoginForm";
import AuthPrivacy from "./auth-privacy/AuthPrivacy";
import Layout, { manrope } from "@/src/components/Layout";

const Login = () => {
	return (
		<Layout title="Войти" withHeader={false}>
			<div className={clsx(styles.root, manrope.className)}>
				<div className={styles.canvas}>
					<h1 className={styles.title}>
						Школа рисунка и компьютерной графики
						<br />
						<b>Smirnov School</b>
					</h1>
				</div>
				<div className={styles.login}>
					<div className={styles.loginBody}>
						<Image
							className={styles.loginLogo}
							src={"/login/img/logo_smirnov-e1640360675284.png"}
							width={145}
							height={32}
							alt="Logo"
						/>
						<div className={styles.loginHeading}>
							<h2>Войти</h2>
							<Link href="#">Создать аккаунт</Link>
						</div>
						<LoginForm />
						<AuthPrivacy />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Login;
