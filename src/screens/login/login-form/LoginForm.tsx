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
import clsx from "clsx";
import { AuthService } from "@/src/services/auth.service";

const LoginForm = () => {
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
		await AuthService.login(data.email, data.password);
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
				className={clsx(
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
