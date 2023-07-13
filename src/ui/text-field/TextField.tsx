import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type Props = {
	name: string;
	label: string;
	type?: "text" | "tel" | "email" | "password" | "number";
};

const TextField = ({ name, label, type = "text" }: Props) => {
	const { register, formState } = useFormContext<any>();

	return (
		<FormControl isInvalid={!!formState.errors[name]?.message}>
			<FormLabel>{label}</FormLabel>
			<Input type={type} {...register(name)} />
			<FormErrorMessage>
				{formState.errors[name]?.message?.toString()}
			</FormErrorMessage>
		</FormControl>
	);
};

export default TextField;
