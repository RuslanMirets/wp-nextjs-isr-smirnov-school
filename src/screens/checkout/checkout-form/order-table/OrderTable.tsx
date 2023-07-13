import { ICartItem } from "@/src/types/cart.interface";
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import styles from "./OrderTable.module.scss";

type Props = {
	items: ICartItem[];
};

const OrderTable = ({ items }: Props) => {
	return (
		<TableContainer className={styles.root}>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Продукт</Th>
						<Th>Всего</Th>
					</Tr>
				</Thead>
				<Tbody>
					{items.map((item) => (
						<Tr key={item.key}>
							<Td>
								<div className={styles.productTd}>
									{item.product.node.featuredImage ? (
										<Image
											src={item.product.node.featuredImage.node.sourceUrl}
											width={100}
											height={100}
											alt={item.product.node.title}
										/>
									) : (
										<Image
											src="/img/default.jpg"
											width={100}
											height={100}
											alt={item.product.node.title}
										/>
									)}
									<div>
										<div>{item.product.node.title}</div>
										<div>кол-во: {item.quantity}</div>
									</div>
								</div>
							</Td>
							<Td>{item.total} ₽</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default OrderTable;
