import {
	AiOutlineEye,
	AiOutlineEyeInvisible,
	AiOutlineUser,
} from "react-icons/ai";
import { BsCheck2, BsKey } from "react-icons/bs";
import styles from "./LoginForm.module.scss";
import { useState } from "react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useAuthTimeStore } from "@/src/store";
import classNames from "classnames";

const LoginForm = () => {
	const setAuthTime = useAuthTimeStore((state: any) => state.setTime);

	const [passwordVisible, setPasswordVisible] = useState(false);

	const togglePasswordVisible = () => {
		setPasswordVisible(!passwordVisible);
	};

	const methods = useForm<FieldValues>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const start = Date.now();

		await signIn("credentials", {
			email: data.email,
			password: data.password,
			redirect: false,
		}).then((callback) => {
			if (callback?.ok) {
				const end = Date.now() - start;
				setAuthTime(end);
			}

			if (callback?.error) {
				console.log(callback.error);
			}
		});
	};

	return (
		<form className={styles.root} onSubmit={methods.handleSubmit(onSubmit)}>
			<div className={styles.fields}>
				<div className={styles.field}>
					<AiOutlineUser className={styles.fieldIcon} />
					<input
						className={styles.fieldInput}
						type="email"
						placeholder="Адрес электронной почты"
						{...methods.register("email")}
					/>
				</div>
				<div className={styles.field}>
					<BsKey className={styles.fieldIcon} />
					<input
						className={styles.fieldInput}
						type={passwordVisible == true ? "text" : "password"}
						placeholder="Пароль"
						{...methods.register("password")}
					/>
					<button
						className={styles.fieldEye}
						onClick={togglePasswordVisible}
						type="button"
					>
						{passwordVisible == true ? (
							<AiOutlineEyeInvisible />
						) : (
							<AiOutlineEye />
						)}
					</button>
				</div>
			</div>
			<div className={styles.remember}>
				<label className={styles.checkbox}>
					<input className={styles.checkboxInput} type="checkbox" />
					<span className={styles.checkboxStyle}>
						<BsCheck2 className={styles.checkboxCheck} />
					</span>
					<span className={styles.checkboxCaption}>Запомнить меня</span>
				</label>
				<Link className={styles.forgetLink} href="#">
					Забыли пароль?
				</Link>
			</div>
			<button
				className={classNames(
					styles.submit,
					methods.formState.isSubmitting && styles.disabled,
				)}
				type="submit"
			>
				{methods.formState.isSubmitting ? "Вход..." : "Войти"}
			</button>
		</form>
	);
};

export default LoginForm;
