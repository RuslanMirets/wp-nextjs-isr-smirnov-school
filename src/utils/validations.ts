import * as yup from "yup";

export const CheckoutFormSchema = yup.object().shape({
	firstName: yup
		.string()
		.required("Имя для выставления счета является обязательным полем."),
	lastName: yup
		.string()
		.required("Фамилия для выставления счета является обязательным полем."),
	email: yup
		.string()
		.email("Неверная почта")
		.required("Email для выставления счета является обязательным полем."),
	phone: yup
		.string()
		.required("Телефон для выставления счета является обязательным полем."),
	payment: yup.string().required(),
});
export type CheckoutFormData = yup.InferType<typeof CheckoutFormSchema>;
