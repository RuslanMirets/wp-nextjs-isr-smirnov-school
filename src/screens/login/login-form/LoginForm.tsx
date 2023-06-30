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
import { useMutation } from "@apollo/client";
import { AuthApollo } from "@/src/apollo/auth.apollo";
import Cookies from "js-cookie";

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

	const [loginMutation] = useMutation(AuthApollo.LOGIN);

	const onSubmit: SubmitHandler<FieldValues> = async (dto) => {
		const { data } = await loginMutation({
			variables: {
				username: dto.email,
				password: dto.password,
			},
		});

		Cookies.set("jwtAuthToken", data.login.user.jwtAuthToken);
		Cookies.set("jwtRefreshToken", data.login.user.jwtRefreshToken);
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
