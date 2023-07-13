import { Button, Radio, RadioGroup, Stack, useToast } from "@chakra-ui/react";
import styles from "./CheckoutForm.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import { CartApollo } from "@/src/apollo/cart.apollo";
import { ICartItem } from "@/src/types/cart.interface";
import { OrderApollo } from "@/src/apollo/order.apollo";
import { IPayments } from "@/src/types/order.interface";
import OrderTable from "./order-table/OrderTable";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@/src/ui/text-field/TextField";
import { CheckoutFormData, CheckoutFormSchema } from "@/src/utils/validations";

const CheckoutForm = () => {
	const toast = useToast();

	const { push } = useRouter();

	const { data: cartData, loading: cartLoading } = useQuery(
		CartApollo.GET_CART,
	);
	const { data: paymentsData, loading: paymentsLoading } = useQuery(
		OrderApollo.GET_PAYMENTS,
	);
	const [checkout, { loading: checkoutLoading }] = useMutation(
		OrderApollo.CHECKOUT,
	);

	const cartItems: ICartItem[] = cartData?.cart.contents.nodes;
	const payments: IPayments[] = paymentsData?.paymentGateways.nodes;

	const methods = useForm<CheckoutFormData>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			payment: "",
		},
		resolver: yupResolver(CheckoutFormSchema),
	});

	const onSubmit: SubmitHandler<CheckoutFormData> = async (dto) => {
		await checkout({
			variables: {
				paymentMethod: dto.payment,
				firstName: dto.firstName,
				lastName: dto.lastName,
				email: dto.email,
				phone: dto.phone,
			},
			onCompleted: (data) => {
				localStorage.removeItem("woo-next-cart");
				push(data.checkout.redirect);
			},
			onError: (error) => {
				localStorage.removeItem("woo-next-cart");
				toast({
					title: error.name,
					description: error.message,
					status: "error",
					duration: 4000,
					position: "bottom-left",
					isClosable: true,
				});
			},
		});
	};

	if (cartLoading) {
		return <div>Loading</div>;
	}

	return (
		<FormProvider {...methods}>
			<form className={styles.root} onSubmit={methods.handleSubmit(onSubmit)}>
				<div className={styles.box}>
					<h3 className={styles.boxTitle}>Детали оплаты</h3>
					<div className={styles.inputs}>
						<div className={styles.inputsGroup}>
							<TextField label="Имя" name="firstName" />
							<TextField label="Фамилия" name="lastName" />
						</div>
						<TextField label="Email" name="email" type="email" />
						<TextField label="Телефон" name="phone" type="tel" />
					</div>
				</div>
				<div className={styles.box}>
					<h3 className={styles.boxTitle}>Ваш заказ</h3>
					<OrderTable items={cartItems} />
					<div className={styles.total}>Всего: {cartData?.cart.total} ₽</div>
					<div className={styles.payments}>
						{paymentsLoading ? (
							<div>Loading...</div>
						) : (
							<RadioGroup defaultValue="wc_cloudpayments_gateway">
								<Stack>
									{payments.map((item) => (
										<Radio
											value={item.id}
											key={item.id}
											{...methods.register("payment")}
										>
											{item.title}
										</Radio>
									))}
								</Stack>
							</RadioGroup>
						)}
					</div>
					<div className={styles.btnWrap}>
						<Button
							colorScheme="blue"
							type="submit"
							isLoading={checkoutLoading}
						>
							Подтвердить заказ
						</Button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default CheckoutForm;
