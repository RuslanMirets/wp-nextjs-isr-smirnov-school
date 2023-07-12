import { create } from "zustand";

interface ICartStore {
	cart: any;
	updateCart: (item: any) => void;
}

const getInitialCart = () => {
	let cartData =
		typeof window !== "undefined" && localStorage.getItem("woo-next-cart");
	cartData = cartData !== null ? JSON.parse(cartData as string) : {};
	return cartData;
};

export const useCartStore = create<ICartStore>()((set) => ({
	cart: getInitialCart(),
	updateCart: (item) => set({ cart: item }),
}));
