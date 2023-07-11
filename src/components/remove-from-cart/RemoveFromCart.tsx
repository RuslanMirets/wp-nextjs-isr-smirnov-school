import { Button } from "@chakra-ui/react";

type Props = {
	cartKey: string;
};

const RemoveFromCart = ({ cartKey }: Props) => {
	return <Button colorScheme="red">Удалить</Button>;
};

export default RemoveFromCart;
