import RemoveFromCart from "@/src/components/remove-from-cart/RemoveFromCart";
import { ICartItem } from "@/src/types/cart.interface";
import {
	Table,
	TableContainer,
	Th,
	Thead,
	Tr,
	Tbody,
	Td,
} from "@chakra-ui/react";
import Image from "next/image";

type Props = {
	items: ICartItem[];
};

const CartTable = ({ items }: Props) => {
	return (
		<TableContainer>
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Изображение</Th>
						<Th>Товар</Th>
						<Th>Цена</Th>
						<Th>Количество</Th>
						<Th>Подытог</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{items.map((item) => (
						<Tr key={item.key}>
							<Td>
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
							</Td>
							<Td>{item.product.node.title}</Td>
							<Td>{item.total / item.quantity} ₽</Td>
							<Td>{item.quantity}</Td>
							<Td>{item.total} ₽</Td>
							<Td>
								<RemoveFromCart cartKey={item.key} />
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default CartTable;
