import Link from "next/link";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import Container from "@/src/ui/container/Container";
import { Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Cookies from "js-cookie";
import classNames from "classnames";

interface IMenuLinks {
	title: string;
	url: string;
	target?: "_blank" | "_parent" | "_self" | "_top";
}

const menuLinks: IMenuLinks[] = [
	{ title: "Главная", url: "/" },
	{ title: "Блог", url: "/blog" },
	// { title: "Основы CG", url: "/cgb" },
	{ title: "Товары", url: "/products" },
	// { title: "Курсы", url: "/courses" },
	// { title: "Метрики", url: "/metrics", target: "_blank" },
];

const Header = () => {
	const { pathname } = useRouter();
	const { data, status } = useSession();

	const handleLogout = () => {
		Cookies.remove("jwtAuthToken");
		Cookies.remove("jwtRefreshToken");
		signOut();
	};

	return (
		<header className={styles.root}>
			<Container>
				<div className={styles.container}>
					<nav>
						<ul className={styles.navList}>
							{menuLinks.map((item) => (
								<li key={item.url}>
									<Link
										className={classNames(
											pathname === item.url && styles.active,
										)}
										href={item.url}
										target={item.target}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					{status !== "loading" && (
						<div className={styles.auth}>
							{data && (
								<>
									<div className={styles.user}>
										Вы вошли как
										<Link href="/profile">{data?.user?.name}</Link>
									</div>
									<Button onClick={handleLogout}>Выйти</Button>
								</>
							)}
							{!data && (
								<Link href="/login">
									<Button>Войти</Button>
								</Link>
							)}
						</div>
					)}
				</div>
			</Container>
		</header>
	);
};

export default Header;
