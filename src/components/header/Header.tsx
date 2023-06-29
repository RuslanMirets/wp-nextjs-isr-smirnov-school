import Link from "next/link";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import clsx from "clsx";
import Container from "@/src/ui/container/Container";
import { Button } from "@chakra-ui/react";

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

	return (
		<header className={styles.root}>
			<Container>
				<div className={styles.container}>
					<nav>
						<ul className={styles.navList}>
							{menuLinks.map((item) => (
								<li key={item.url}>
									<Link
										className={clsx(pathname === item.url && styles.active)}
										href={item.url}
										target={item.target}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className={styles.auth}>
						<Link href="/login">
							<Button>Войти</Button>
						</Link>
					</div>
				</div>
			</Container>
		</header>
	);
};

export default Header;
